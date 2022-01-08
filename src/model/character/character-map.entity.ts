import { Entity } from '../entity.interface';

export interface CharacterMap extends Entity {
	currentLocation: Location;
	unlockedLocations: Location[];
}
