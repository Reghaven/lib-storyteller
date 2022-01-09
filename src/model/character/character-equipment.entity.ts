import { EquippableAsset } from '../asset/asset.entity';

export interface CharacterEquipment {
	head?: EquippableAsset;
	body?: EquippableAsset;
	wrist?: EquippableAsset;
	necklace?: EquippableAsset;
	shoes?: EquippableAsset;
}
