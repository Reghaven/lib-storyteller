export interface Place {
	name: string;
	locations: Location[];
}

// a location that has snippets
export interface Location {
	name: string;
	isVisibleOnMap: boolean;
	isUnlockedFromBeginning: boolean;
	characterCanLeaveAnytime: boolean;
}
