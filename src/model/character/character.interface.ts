import { Entity } from '../entity.interface';
import { AssetInstance } from '../asset/asset-instance.entity';
import { Attribute } from '../attribute/attribute.entity';
import { CharacterEquipment } from './character-equipment.entity';
import { CharacterMap } from './character-map.entity';

export interface Character extends Entity {
	/** All possessions of a character, dynamic */
	assetInstances: AssetInstance[];

	/** All attributes of a character, static */
	attributes: Attribute[];

	/** items that are equipped to body */
	equipment: CharacterEquipment;

	// determines where the player is and where he can go
	map: CharacterMap;
}
