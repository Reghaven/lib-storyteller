/** provides methods to interact with a character */
import { AssetInstance } from '../model/asset/asset-instance.entity';
import { Character } from '../model/character/character.interface';
import { AssetType } from '../model/asset/asset-type.entity';
import { UsableAsset } from '../model/asset/asset.entity';
import { Location } from '../model/place/location.entity';

export class CharacterController {
	/**
	 * checks if the player has this specific amount of assets
	 * @param requiredAssetInstance an asset and a count
	 * @param character to apply changes to
	 * @returns true if given asset and count is available
	 */
	public static hasPlayerEnoughAssetInstance(
		requiredAssetInstance: AssetInstance,
		character: Character
	): boolean {
		const { asset, count: requiredCount } = requiredAssetInstance;
		const fetchedInstance = character.assetInstances.find(
			(e) => e.asset.uuid === asset.uuid
		);
		if (!fetchedInstance) return false;

		const { count: fetchedCount } = fetchedInstance;
		return fetchedCount <= requiredCount;
	}

	/**
	 * returns true if player has at least one of the provided instances
	 * @param assetInstances at least one of them must be available
	 * @param character character to apply changes to
	 */
	public static characterHasAnyOfAssetInstances(
		assetInstances: AssetInstance[],
		character: Character
	): boolean {
		for (const assetInstance of assetInstances) {
			const { asset, count } = assetInstance;

			// if instance does not exist, continue
			const characterAssetInstance = character.assetInstances.find(
				(e) => (e.asset.uuid = asset.uuid)
			);
			if (characterAssetInstance === undefined) continue;

			// if instance exists, count must be higher then required
			const { count: characterAssetCount } = characterAssetInstance;
			if (characterAssetCount >= count) return true;
		}
		return false;
	}

	/**
	 * returns true if player has ALL instances requested
	 * @param assetInstances must all be available
	 * @param character character to apply the changes to
	 */
	public static characterHasAllOfAssetInstances(
		assetInstances: AssetInstance[],
		character: Character
	): boolean {
		for (const assetInstance of assetInstances) {
			const { asset, count } = assetInstance;

			// if instance does not exist, continue
			const characterAssetInstance = character.assetInstances.find(
				(e) => e.asset.uuid === asset.uuid
			);
			if (characterAssetInstance === undefined) return false;

			// if instance exists, count must be higher then required
			const { count: characterAssetCount } = characterAssetInstance;
			if (characterAssetCount < count) return false;
		}
		return true;
	}

	/**
	 * gives player assets by count
	 * @param newAssetInstance asset and count that should be added
	 * @param character the character to apply the changes to
	 */
	public static giveAssetInstanceToCharacter(
		newAssetInstance: AssetInstance,
		character: Character
	): void {
		const { asset, count } = newAssetInstance;
		const existingAssetEntity = character.assetInstances.find(
			(e) => e.asset.uuid === asset.uuid
		);

		// if entity is new, just add it
		if (!existingAssetEntity) {
			character.assetInstances.push(newAssetInstance);
			return;
		}

		// if entity exists, add the amount
		const { count: existingAssetCount } = existingAssetEntity;
		const newAmount = existingAssetCount + count;

		for (const instance of character.assetInstances) {
			if (instance.asset.uuid === newAssetInstance.asset.uuid) {
				instance.count = newAmount;
			}
		}
	}

	/**
	 * returns true if item could be removed, false otherwise
	 * @param assetInstance
	 * @param character the character to apply the changes to
	 * @returns if the asset was found and removed
	 */
	public static removeAssetFromPlayer(
		assetInstance: AssetInstance,
		character: Character
	): boolean {
		const hasEnough = this.hasPlayerEnoughAssetInstance(
			assetInstance,
			character
		);
		if (!hasEnough) return false;

		// check if exists
		const { asset: assetToRemove, count: toRemoveAmount } = assetInstance;
		const existingAssetInstance = character.assetInstances.find(
			(e) => e.asset.uuid === assetToRemove.uuid
		);
		if (!existingAssetInstance) {
			return false;
		}

		// update amount or delete if amount set to 0
		const { asset: existingAsset, count: existingAmount } =
			existingAssetInstance;
		const newAmount = existingAmount - toRemoveAmount;
		if (newAmount <= 0) {
			character.assetInstances.filter(
				(characterAssetInstance) =>
					characterAssetInstance.asset.uuid !== assetToRemove.uuid
			);
			return true;
		}

		for (const instance of character.assetInstances) {
			if (instance.asset.uuid === existingAsset.uuid) {
				instance.count = newAmount;
			}
		}

		return true;
	}

	/**
	 * checks if player succeeds in an action
	 * @param attributeUuid
	 * @param levelForGrantedSuccess at this level, a stat check succeeds with guarantee
	 * @param character character to check stats for
	 * @returns if the check succeeded or not
	 */
	public static attributeCheck(
		attributeUuid: string,
		levelForGrantedSuccess: number,
		character: Character
	): boolean {
		// if character has no such attribute, any stat check fails automatically
		const characterAttribute = character.attributes.find(
			(e) => e.uuid === attributeUuid
		);
		if (!characterAttribute) return false;

		// calculate level from character points
		const characterAttributeLevel =
			CharacterController.calculateAttributeLevel(
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
	 * @param attributeUuid
	 * @param points amount of points to add
	 * @param character the character to be used
	 */
	public static addAttributePoints(
		attributeUuid: string,
		points: number,
		character: Character
	): void {
		for (const characterAttribute of character.attributes) {
			if (characterAttribute.uuid === attributeUuid) {
				characterAttribute.pointsCollected += points;
				return;
			}
		}
	}

	/**
	 * using an item means removing it and activating it's effects
	 * @param itemAssetUuid
	 * @param character the character to apply the changes to
	 */
	public static useItem(itemAssetUuid: string, character: Character): void {
		// retrieve item
		const itemInstance = character.assetInstances.find(
			(e) => e.asset.uuid === itemAssetUuid
		);
		if (itemInstance === undefined) return;
		const { asset, count } = itemInstance;
		// needs to be usable and available
		if (asset.type !== AssetType.Usable || count <= 0) return;

		// apply effect
		CharacterController.giveAssetInstanceToCharacter(
			(asset as UsableAsset).givesCharacterAssets,
			character
		);
		CharacterController.removeAssetFromPlayer(
			(asset as UsableAsset).removesCharacterAssets,
			character
		);

		const oneItem: AssetInstance = { asset, count: 1 };
		// remove one instance of said item
		CharacterController.removeAssetFromPlayer(oneItem, character);
	}

	/**
	 * the map determines where the player can go by himself
	 * @param newLocation the new location the player can walk to
	 * @param character the character to apply the changes to
	 */
	public static addLocationToCharacterMap(
		newLocation: Location,
		character: Character
	): void {
		// fetch place, add entry to list and store place again
		character.map.unlockedLocations.find(
			(location) => location.uuid === newLocation.uuid
		);
		if (location) return;
		character.map.unlockedLocations.push(newLocation);
	}

	/**
	 * sets character to a specific place and location
	 * @param place the place the location is placed in
	 * @param location the location the character goes to
	 * @param character the character to apply movement to
	 */
	public static moveToLocation(
		place: string,
		location: Location,
		character: Character
	) {
		character.map.currentLocation = location;
	}

	/**
	 * calculates a level based on how many points a characters attribute has
	 * @param points attribute points
	 * @private
	 * @returns the level of said attribute used for stat checks
	 */
	public static calculateAttributeLevel(points: number): number {
		return Math.floor(Math.log(points + 1) / Math.log(1.4));
	}
}
