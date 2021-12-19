/** provides methods to interact with a character */
import { Character } from '../model/character/character.interface';
import { Place, Location } from '../model/story/place.interface';
import { IAssetInstance } from '../model/story/asset.interface';

export class CharacterController {
	/**
	 * checks if the player has this specific amount of assets
	 * @param requiredAssetInstance
	 * @param character
	 */
	public static hasPlayerEnoughAssetInstance(
		requiredAssetInstance: IAssetInstance,
		character: Character
	): boolean {
		const [asset, requiredAmount] = requiredAssetInstance;
		const fetchedInstance = character.assets.get(asset.name);
		if (!fetchedInstance) return false;

		const [, availableAmount] = fetchedInstance;
		return requiredAmount >= availableAmount;
	}

	/**
	 * returns true if player has at least one of the provided instances
	 * @param assetInstances
	 * @param character
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
	 * @param assetInstances
	 * @param character
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
	 * gives player assets
	 * @param newAssetInstance
	 * @param character
	 */
	public static giveAssetInstanceToPlayer(
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
	 * @param assetInstanceToRemove
	 * @param character
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
	 * @param attribute
	 * @param levelForGrantedSuccess
	 * @param character
	 */
	public static attributeCheck(
		attribute: string,
		levelForGrantedSuccess: number,
		character: Character
	): boolean {
		const characterAttribute = character.attributes.get(attribute);
		if (!characterAttribute) return false;

		const characterAttributeLevel = calculatePropertyLevel(
			characterAttribute.pointsCollected
		);

		if (characterAttributeLevel >= levelForGrantedSuccess) return true;
		if (characterAttributeLevel <= 0) return false;
		const probabilityForWin =
			characterAttributeLevel / levelForGrantedSuccess;
		const num = Math.random();
		return num <= probabilityForWin;
	}

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

	public static addLocationToCharacterMap(
		placeOfNewLocation: string,
		newLocation: Location,
		character: Character
	) {
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
	 * sets player to a specific place and location
	 * @param place
	 * @param location
	 * @param character
	 */
	public static moveToLocation(
		place: string,
		location: string,
		character: Character
	) {
		character.map.currentPlace = place;
		character.map.currentLocation = location;
	}
}

export function calculatePropertyLevel(points: number) {
	return Math.floor(Math.log(points) / Math.log(1.2));
}
