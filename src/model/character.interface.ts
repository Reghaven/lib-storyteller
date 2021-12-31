import { Attribute, EquippableAsset, IAssetInstance } from './asset.interface';

export interface Character {
	/** Display Name */
	name: string;

	/** All possessions of a character, dynamic */
	assets: Map<string, IAssetInstance>;
	
	/** All attributes of a character, static */
	attributes: Map<string, Attribute>;

	/** items that are equipped to body */
	equipment: Equipment;

	// determines where the player is and where he can go
	map: {
		currentPlace: string;
		currentLocation: string;
		// store place name as key and a list of locations as values
		unlockedLocations: Map<string, CharacterMapEntry[]>;
	};
}

export interface CharacterMapEntry {
	name: string;
}

export interface Equipment {
	head?: EquippableAsset;
	body?: EquippableAsset;
	wrist?: EquippableAsset;
	necklace?: EquippableAsset;
	shoes?: EquippableAsset;
}
