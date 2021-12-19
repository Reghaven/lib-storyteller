import {
	Attribute,
	EquippableAsset,
	IAssetInstance,
} from '../story/asset.interface';

export interface Character {
	name: string;

	assets: Map<string, IAssetInstance>;
	attributes: Map<string, Attribute>;

	equipment: Equipment;

	// determines where the player is and where he can go
	map: {
		currentPlace: string;
		currentLocation: string;
		// store place name as key and a list of locations as values
		unlockedLocations: Map<string, CharacterMapEntry[]>;
	};
}

interface CharacterMapEntry {
	name: string;
}

export interface Equipment {
	head: EquippableAsset;
	body: EquippableAsset;
	wrist: EquippableAsset;
	necklace: EquippableAsset;
	shoes: EquippableAsset;
}
