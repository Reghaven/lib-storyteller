import { Attribute, EquippableAsset } from '../story/asset.interface';
import { IAssetInstance } from '../asset-entity.type';
import { Place, Location } from '../story/place.interface';

export interface Character {
	name: string;
	currentPlace: Place;
	currentLocation: Location;

	assets: Map<string, IAssetInstance>;
	attributes: Map<string, Attribute>;

	equipment: Equipment;
	unlockedLocations: Map<string, Location>;
}

export interface Equipment {
	head: EquippableAsset;
	body: EquippableAsset;
	wrist: EquippableAsset;
	necklace: EquippableAsset;
	shoes: EquippableAsset;
}
