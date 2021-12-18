export interface Place {
	name: string;
	locations: Map<string, Location>;
}

// a location that has snippets
export interface Location {
	name: string;
}
