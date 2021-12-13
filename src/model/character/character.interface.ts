import { Location } from '../story/area.interface';
import { Attribute, EquippableAsset } from '../story/asset.interface';
import { IAssetInstance } from '../asset-entity.type';

export interface Character {
	name: string;
	currentLocation: Location;

	assets: Map<string, IAssetInstance>;
	attributes: Map<string, Attribute>;

	equipment: Equipment;
}

export interface Equipment {
	head: EquippableAsset;
	body: EquippableAsset;
	wrist: EquippableAsset;
	necklace: EquippableAsset;
	shoes: EquippableAsset;
}
