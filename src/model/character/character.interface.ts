import { Location } from '../story/area.interface';
import { Asset, EquippableAsset } from '../story/asset.interface';
import { DataStore } from '../../data-store.class';

export interface Character {
	name: string;
	currentLocation: Location;

	assets: DataStore<Asset>;

	equipment: Equipment;
}

export interface Equipment {
	head: EquippableAsset;
	body: EquippableAsset;
	wrist: EquippableAsset;
	necklace: EquippableAsset;
	shoes: EquippableAsset;
}
