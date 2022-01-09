/** All sorts of assets */
import { Entity } from '../entity.interface';
import { AssetInstance } from './asset-instance.entity';
import { BodyPart } from './body-part.enum';
import { EquipEffect } from './equip-effect.entity';
import { AssetType } from './asset-type.entity';

/** an asset is an entity that serves all purposes of flagging and item */
export interface Asset extends Entity {
	type: AssetType;
}

/** Player can use them to gain effects */
export interface UsableAsset extends Asset {
	type: AssetType.Usable;
	givesCharacterAssets: AssetInstance;
	removesCharacterAssets: AssetInstance;
}

/** an asset that can be put onto a body part */
export interface EquippableAsset extends Asset {
	type: AssetType.Equippable;
	effects: EquipEffect[];
	forBodyPart: BodyPart;
}
