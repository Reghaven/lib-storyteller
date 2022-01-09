import { Attribute } from '../attribute/attribute.entity';

export interface AttributeCondition {
	attributeToActivate: Attribute;
	attributeLevelFor100Percent: number;
}
