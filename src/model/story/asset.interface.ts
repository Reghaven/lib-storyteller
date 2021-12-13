import { Effect } from './effect.interface';
import { IEntity } from '../../data-store.class';

export interface Asset {
	name: string;
	type: string;
}

/** Attributes */

export interface Attribute extends Asset {
	type: 'Attribute';
	pointsCollected: number; // start at 0
	pointsForNextLevel: number; // should double each level
}

/** Player can use them to gain effects */
export interface UsableAsset extends Asset {
	type: 'Usable';
	givesCharacterAssets: IEntity<Asset>[];
	removesCharacterAssets: IEntity<Asset>[];
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
	type: 'Equippable';
	effects: Effect[];
	forBodyPart: BodyPart;
}
