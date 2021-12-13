import { Effect } from './effect.interface';
import { IAssetInstance } from '../asset-entity.type';

export interface Asset {
	name: string;
	type: string;
}

/** Attributes */

export interface Attribute extends Asset {
	pointsCollected: number; // start at 0
	pointsForNextLevel: number; // should double each level
}

/** Player can use them to gain effects */
export interface UsableAsset extends Asset {
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
	effects: Effect[];
	forBodyPart: BodyPart;
}
