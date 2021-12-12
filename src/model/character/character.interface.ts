import { Location } from '../story/area.interface';
import { Asset, EquippableAsset } from '../story/asset.interface';

export interface Character {
	name: string;
	currentLocation: Location;
	assets: Asset[];

	equipment: Equipment;
}

export interface Equipment {
	head: EquippableAsset;
	body: EquippableAsset;
	wrist: EquippableAsset;
	necklace: EquippableAsset;
	shoes: EquippableAsset;
}
