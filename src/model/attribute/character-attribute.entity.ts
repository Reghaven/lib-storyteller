import { Attribute } from './attribute.entity';

/** a character has multiple attributes and points in them */
export interface CharacterAttribute {
	/** an attribute of a static lists */
	attribute: Attribute;
	/** used to calculate the level */
	pointsCollected: number;
}
