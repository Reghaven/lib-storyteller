import { Entity } from '../entity.interface';
import { Decision } from './decision.entity';
import { AssetInstance } from '../asset/asset-instance.entity';

export interface Story extends Entity {
	// text to be displayed
	text: string;
	// order is determined by assets
	decisions: Decision[];
	// story is only displayed in this place, if undefined, it is showed everywhere
	characterIsAtPlace?: string;
	// only show if player possesses at least these assets, if empty, it is always shown
	characterHasAssets: AssetInstance[];
	// do not show if player has any of these assets
	characterHasNotAssets: AssetInstance[];
}
