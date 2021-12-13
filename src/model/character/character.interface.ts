import { Location } from '../story/area.interface';
import { AssetInstance, EquippableAsset } from '../story/asset.interface';

export interface Character {
	name: string;
	currentLocation: Location;
	assetInstances: AssetInstance[];

	equipment: Equipment;
}

export interface Equipment {
	head: EquippableAsset;
	body: EquippableAsset;
	wrist: EquippableAsset;
	necklace: EquippableAsset;
	shoes: EquippableAsset;
}
