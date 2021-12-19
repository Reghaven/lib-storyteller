import { Effect } from './effect.interface';

enum AssetType {
	Normal = 'Normal',
	Attribute = 'Attribute',
	Usable = 'Usable',
	Equippable = 'Equippable',
}

export interface Asset {
	name: string;
	type: AssetType;
}

export type IAssetInstance = [Asset, number];

/** Attributes */

export interface Attribute extends Asset {
	type: AssetType.Attribute;
	pointsCollected: number; // start at 0
	pointsForNextLevel: number; // should double each level
}

/** Player can use them to gain effects */
export interface UsableAsset extends Asset {
	type: AssetType.Usable;
	givesCharacterAssets: IAssetInstance;
	removesCharacterAssets: IAssetInstance;
}

/** Equippable */

export enum BodyPart {
	Head = 'Head',
	Body = 'Body',
	Wrist = 'Wrist',
	Necklace = 'Necklace',
	Shoes = 'Shoes',
}

export interface EquippableAsset extends Asset {
	type: AssetType.Equippable;
	effects: Effect[];
	forBodyPart: BodyPart;
}
