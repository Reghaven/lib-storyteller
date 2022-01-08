import { Entity } from '../entity.interface';
import { Location } from './location.entity';

export interface Place extends Entity {
	locations: Location[];
}
