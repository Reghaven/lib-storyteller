import { Entity } from '../entity.interface';
import { Location } from '../place/location.entity';

export interface CharacterMap extends Entity {
	currentLocation: Location;
	unlockedLocations: Location[];
}
