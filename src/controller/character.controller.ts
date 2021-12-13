/** provides methods to interact with a character */
import { Character } from '../model/character/character.interface';
import { IEntity, IEntityRequest } from '../data-store.class';
import { Asset } from '../model/story/asset.interface';

export class CharacterController {
	/**
	 * checks if the player has this specific amount of assets
	 * @param requiredAssetInstance
	 * @param character
	 */
	public static hasPlayerEnoughAssetInstance(
		requiredAssetInstance: IEntityRequest,
		character: Character
	): boolean {
		const [requiredName, requiredAmount] = requiredAssetInstance;
		const fetchedInstance = character.assets.fetch(requiredName);
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
		newAssetInstance: IEntity<Asset>,
		character: Character
	): void {
		const [asset, amount] = newAssetInstance;
		const existingAssetEntity = character.assets.fetch(asset.name);

		// if entity is new, just add it
		if (!existingAssetEntity)
			return character.assets.store(asset.name, newAssetInstance);

		// if entity exists, add the amount
		const [existingAsset, existingAmount] = existingAssetEntity;
		const newAmount = existingAmount + amount;

		return character.assets.store(existingAsset.name, [
			existingAsset,
			newAmount,
		]);
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

	public async fetchPlayerAttributeByName(attributeName: string) {}
}
