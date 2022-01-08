import { Entity } from '../entity.interface';

export interface Location extends Entity {
	isVisibleOnMap: boolean;
	isUnlockedFromBeginning: boolean;
	characterCanLeaveAnytime: boolean;
}
