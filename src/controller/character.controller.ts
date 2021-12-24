/** provides methods to interact with a character */
import { Character } from '../model/character/character.interface';
import { Location, Place } from '../model/story/place.interface';
import {
	AssetType,
	IAssetInstance,
	UsableAsset,
} from '../model/story/asset.interface';

export class CharacterController {
	/**
	 * checks if the player has this specific amount of assets
	 * @param requiredAssetInstance an asset and a count
	 * @param character to apply changes to
	 * @returns true if given asset and count is available
	 */
	public static hasPlayerEnoughAssetInstance(
		requiredAssetInstance: IAssetInstance,
		character: Character
	): boolean {
		const [asset, requiredAmount] = requiredAssetInstance;
		const fetchedInstance = character.assets.get(asset.name);
		if (!fetchedInstance) return false;

		const [, availableAmount] = fetchedInstance;
		return requiredAmount <= availableAmount;
	}

	/**
	 * returns true if player has at least one of the provided instances
	 * @param assetInstances at least one of them must be available
	 * @param character character to apply changes to
	 */
	public static characterHasAnyOfAssetInstances(
		assetInstances: IAssetInstance[],
		character: Character
	): boolean {
		for (const assetInstance of assetInstances) {
			const [asset, assetCount] = assetInstance;

			// if instance does not exist, continue
			const characterAssetInstance = character.assets.get(asset.name);
			if (characterAssetInstance === undefined) continue;

			// if instance exists, count must be higher then required
			const [, characterAssetCount] = characterAssetInstance;
			if (characterAssetCount >= assetCount) return true;
		}
		return false;
	}

	/**
	 * returns true if player has ALL instances requested
	 * @param assetInstances must all be available
	 * @param character character to apply the changes to
	 */
	public static characterHasAllOfAssetInstances(
		assetInstances: IAssetInstance[],
		character: Character
	): boolean {
		for (const assetInstance of assetInstances) {
			const [asset, assetCount] = assetInstance;

			// if instance does not exist, continue
			const characterAssetInstance = character.assets.get(asset.name);
			if (characterAssetInstance === undefined) return false;

			// if instance exists, count must be higher then required
			const [, characterAssetCount] = characterAssetInstance;
			if (characterAssetCount < assetCount) return false;
		}
		return true;
	}

	/**
	 * gives player assets by count
	 * @param newAssetInstance asset and count that should be added
	 * @param character the character to apply the changes to
	 */
	public static giveAssetInstanceToCharacter(
		newAssetInstance: IAssetInstance,
		character: Character
	): void {
		const [asset, amount] = newAssetInstance;
		const existingAssetEntity = character.assets.get(asset.name);

		// if entity is new, just add it
		if (!existingAssetEntity) {
			character.assets.set(asset.name, newAssetInstance);
			return;
		}

		// if entity exists, add the amount
		const [existingAsset, existingAmount] = existingAssetEntity;
		const newAmount = existingAmount + amount;
		const newInstance: IAssetInstance = [existingAsset, newAmount];

		character.assets.set(existingAsset.name, newInstance);
	}

	/**
	 * returns true if item could be removed, false otherwise
	 * @param assetInstanceToRemove asset and count of the item that gets removed
	 * @param character the character to apply the changes to
	 * @returns if the asset was found and removed
	 */
	public static removeAssetFromPlayer(
		assetInstanceToRemove: IAssetInstance,
		character: Character
	): boolean {
		const hasEnough = this.hasPlayerEnoughAssetInstance(
			assetInstanceToRemove,
			character
		);
		if (!hasEnough) return false;

		// check if exists
		const [assetToRemove, toRemoveAmount] = assetInstanceToRemove;
		const existingAssetInstance = character.assets.get(assetToRemove.name);
		if (!existingAssetInstance) {
			return false;
		}

		// update amount or delete if amount set to 0
		const [existingAsset, existingAmount] = existingAssetInstance;
		const newAmount = existingAmount - toRemoveAmount;
		if (newAmount <= 0) {
			character.assets.delete(assetToRemove.name);
			return true;
		}

		character.assets.set(existingAsset.name, [existingAsset, newAmount]);
		return true;
	}

	/**
	 * checks if player succeeds in an action
	 * @param attribute the attribute that should be checked
	 * @param levelForGrantedSuccess at this level, a stat check succeeds with guarantee
	 * @param character character to check stats for
	 * @returns if the check succeeded or not
	 */
	public static attributeCheck(
		attribute: string,
		levelForGrantedSuccess: number,
		character: Character
	): boolean {
		// if character has no such attribute, any stat check fails automatically
		const characterAttribute = character.attributes.get(attribute);
		if (!characterAttribute) return false;

		// calculate level from character points
		const characterAttributeLevel =
			CharacterController.calculatePropertyLevel(
				characterAttribute.pointsCollected
			);

		// stat check succeeds if player level is over level for granted success
		if (characterAttributeLevel >= levelForGrantedSuccess) return true;
		// stat check fails when attribute level is wrongly set
		if (characterAttributeLevel <= 0) return false;
		// probability determined by percentage of level for granted success
		const probabilityForWin =
			characterAttributeLevel / levelForGrantedSuccess;
		// random number between 0 and 1, win if number is below the probability count
		const num = Math.random();
		return num <= probabilityForWin;
	}

	/**
	 * adds points to a selected attribute
	 * @param attribute the attribute to increase
	 * @param points amount of points to add
	 * @param character the character to be used
	 */
	public static addAttributePoints(
		attribute: string,
		points: number,
		character: Character
	): void {
		const existingAttribute = character.attributes.get(attribute);
		if (existingAttribute === undefined) return;

		existingAttribute.pointsCollected += points;
		character.attributes.set(attribute, existingAttribute);
	}

	/**
	 * using an item means removing it and activating it's effects
	 * @param itemToUse an item string to use
	 * @param character the character to apply the changes to
	 */
	public static useItem(itemToUse: string, character: Character): void {
		// retrieve item
		const itemInstance = character.assets.get(itemToUse);
		if (itemInstance === undefined) return;
		const [item, count] = itemInstance;
		// needs to be usable and available
		if (item.type !== AssetType.Usable || count <= 0) return;

		// apply effect
		CharacterController.giveAssetInstanceToCharacter(
			(item as UsableAsset).givesCharacterAssets,
			character
		);
		CharacterController.removeAssetFromPlayer(
			(item as UsableAsset).removesCharacterAssets,
			character
		);

		// remove one instance of said item
		CharacterController.removeAssetFromPlayer([item, 1], character);
	}

	/**
	 * adds a place with all unlocked locations to a character.
	 * this is usually applied once a new story is fetched.
	 * @param place the new place with all locations
	 * @param character to which is the new place applied
	 */
	public static addPlaceToCharacterMap(
		place: Place,
		character: Character
	): void {
		const locations = place.locations.filter(
			(location) =>
				location.isUnlockedFromBeginning && location.isVisibleOnMap
		);
		character.map.unlockedLocations.set(place.name, locations);
	}

	/**
	 * the map determines where the player can go by himself
	 * @param placeOfNewLocation parent place of the new location
	 * @param newLocation the new location the player can walk to
	 * @param character the character to apply the changes to
	 */
	public static addLocationToCharacterMap(
		placeOfNewLocation: string,
		newLocation: Location,
		character: Character
	): void {
		// fetch place, add entry to list and store place again
		const existingPlace =
			character.map.unlockedLocations.get(placeOfNewLocation);
		const updatedLocations = existingPlace || []; // init if undefined
		updatedLocations.push({
			name: newLocation.name,
		});
		character.map.unlockedLocations.set(
			placeOfNewLocation,
			updatedLocations
		);
	}

	/**
	 * sets character to a specific place and location
	 * @param place the place the location is placed in
	 * @param location the location the character goes to
	 * @param character the character to apply movement to
	 */
	public static moveToLocation(
		place: string,
		location: string,
		character: Character
	) {
		character.map.currentPlace = place;
		character.map.currentLocation = location;
	}

	/**
	 * calculates a level based on how many points a characters attribute has
	 * @param points attribute points
	 * @private
	 * @returns the level of said attribute used for stat checks
	 */
	private static calculatePropertyLevel(points: number): number {
		return Math.floor(Math.log(points + 1) / Math.log(1.4));
	}
}
