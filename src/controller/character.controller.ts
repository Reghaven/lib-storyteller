/** provides methods to interact with a character */
import { Character } from '../model/character/character.interface';
import { AssetInstance } from '../model/story/asset.interface';

export class CharacterController {
	/**
	 * checks if the player has this specific amount of assets
	 * @param requiredAssetInstance
	 * @param character
	 */
	public static hasPlayerEnoughAssetInstance(
		requiredAssetInstance: AssetInstance,
		character: Character
	): boolean {
		for (const assetInstance of character.assetInstances) {
			if (
				requiredAssetInstance.asset.name === assetInstance.asset.name &&
				requiredAssetInstance.quantity <= assetInstance.quantity
			)
				return true;
		}

		return false;
	}

	/**
	 * gives player assets
	 * @param newAssetInstance
	 * @param character
	 */
	public static giveAssetInstanceToPlayer(
		newAssetInstance: AssetInstance,
		character: Character
	): void {
		for (const assetInstance of character.assetInstances) {
			// if player has assets, add it
			if (assetInstance.asset.name === newAssetInstance.asset.name) {
				assetInstance.quantity += newAssetInstance.quantity;
				return;
			}
		}
		// if player has not already some, attach it
		character.assetInstances.push(newAssetInstance);
	}

	/**
	 * returns true if item could be removed, false otherwise
	 * @param assetInstanceToRemove
	 * @param character
	 */
	public static removeAssetFromPlayer(
		assetInstanceToRemove: AssetInstance,
		character: Character
	): boolean {
		const hasEnough = this.hasPlayerEnoughAssetInstance(
			assetInstanceToRemove,
			character
		);

		if (!hasEnough) return false;
		for (const characterAssetInstance of character.assetInstances) {
			if (
				characterAssetInstance.asset.name ===
				assetInstanceToRemove.asset.name
			) {
				characterAssetInstance.quantity -=
					assetInstanceToRemove.quantity;
				return true;
			}
		}

		return false;
	}
}
