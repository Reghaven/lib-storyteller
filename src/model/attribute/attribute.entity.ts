import { Entity } from '../entity.interface';

export interface Attribute extends Entity {
	pointsCollected: number; // start at 0
}
