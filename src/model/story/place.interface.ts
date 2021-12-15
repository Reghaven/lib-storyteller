export interface Place {
	name: string;
	locations: Location[];
}

// Locations that can be publicly reached via map
export interface LocationMap {
	locations: Location[];
}

// a location that has snippets
export interface Location {
	name: string;
}
