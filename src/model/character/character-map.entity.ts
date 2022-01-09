import { Location } from '../place/location.entity';

export interface CharacterMap {
	currentLocation: Location;
	unlockedLocations: Location[];
}
