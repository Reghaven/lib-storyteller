import { Effect } from './effect.interface';

/** All sorts of assets */
export enum AssetType {
	Normal = 'Normal',
	Attribute = 'Attribute',
	Usable = 'Usable',
	Equippable = 'Equippable',
}

/** an asset is an entity that serves all purposes of flagging and item */
export interface Asset {
	name: string;
	type: AssetType;
}

/** an instance consists of */
export type IAssetInstance = [Asset, number];

/** an attribute is an asset that can be leveled up */
export interface Attribute extends Asset {
	type: AssetType.Attribute;
	pointsCollected: number; // start at 0
}

/** Player can use them to gain effects */
export interface UsableAsset extends Asset {
	type: AssetType.Usable;
	givesCharacterAssets: IAssetInstance;
	removesCharacterAssets: IAssetInstance;
}

/** all body parts that can have equipment */
export enum BodyPart {
	Head = 'Head',
	Body = 'Body',
	Wrist = 'Wrist',
	Necklace = 'Necklace',
	Shoes = 'Shoes',
}

/** an asset that can be put onto a body part */
export interface EquippableAsset extends Asset {
	type: AssetType.Equippable;
	effects: Effect[];
	forBodyPart: BodyPart;
}
