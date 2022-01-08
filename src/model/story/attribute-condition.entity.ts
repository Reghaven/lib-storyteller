import { Entity } from '../entity.interface';
import { Attribute } from '../attribute/attribute.entity';

export interface AttributeCondition extends Entity {
	attributeToActivate: Attribute;
	attributeLevelFor100Percent: number;
}
