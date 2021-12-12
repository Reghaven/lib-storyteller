import { Location } from '../story/area.interface';
import {Asset, AssetInstance, EquippableAsset} from '../story/asset.interface';

export interface Character {
	name: string;
	currentLocation: Location;
	assets: AssetInstance[];

	equipment: Equipment;
}

export interface Equipment {
	head: EquippableAsset;
	body: EquippableAsset;
	wrist: EquippableAsset;
	necklace: EquippableAsset;
	shoes: EquippableAsset;
}
