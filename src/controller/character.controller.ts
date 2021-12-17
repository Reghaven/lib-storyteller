/** provides methods to interact with a character */
import { Character } from '../model/character/character.interface';
import {
	IAssetInstance,
	IAssetInstanceRequest,
} from '../model/asset-entity.type';

export class CharacterController {
	/**
	 * checks if the player has this specific amount of assets
	 * @param requiredAssetInstance
	 * @param character
	 */
	public static hasPlayerEnoughAssetInstance(
		requiredAssetInstance: IAssetInstanceRequest,
		character: Character
	): boolean {
		const [requiredName, requiredAmount] = requiredAssetInstance;
		const fetchedInstance = character.assets.get(requiredName);
		if (!fetchedInstance) return false;

		const [, availableAmount] = fetchedInstance;
		return requiredAmount >= availableAmount;
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
		assetInstanceToRemove: IAssetInstanceRequest,
		character: Character
	): boolean {
		const hasEnough = this.hasPlayerEnoughAssetInstance(
			assetInstanceToRemove,
			character
		);
		if (!hasEnough) return false;

		// check if exists
		const [toRemoveName, toRemoveAmount] = assetInstanceToRemove;
		const existingAssetInstance = character.assets.get(toRemoveName);
		if (!existingAssetInstance) {
			return false;
		}

		// update amount or delete if amount set to 0
		const [existingAsset, existingAmount] = existingAssetInstance;
		const newAmount = existingAmount - toRemoveAmount;
		if (newAmount <= 0) {
			character.assets.delete(toRemoveName);
			return true;
		}

		character.assets.set(existingAsset.name, [existingAsset, newAmount]);
		return true;
	}

	/**
	 *
	 * @param attributeName
	 * @param character
	 */
	public static fetchPlayerAttributeByName(
		attributeName: string,
		character: Character
	) {
		return character.attributes.get(attributeName);
	}

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
}

export function calculatePropertyLevel(points: number) {
	return Math.floor(Math.log(points) / Math.log(1.2));
}
