import { Entity } from '../entity.interface';
import { Attribute } from '../attribute/attribute.entity';
import { EquipEffectType } from './equip-effect.enum';

export interface EquipEffect extends Entity {
	attribute: Attribute;
	type: EquipEffectType;
}
