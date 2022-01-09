import { Entity } from '../entity.interface';
import { AssetInstance } from '../asset/asset-instance.entity';
import { Location } from '../place/location.entity';

export interface AssetCondition extends Entity {
	// only show if player possesses at least these assets, if empty, it is always shown
	characterHasAssets: AssetInstance[];
	// do not show if player has any of these assets
	characterHasNotAssets: AssetInstance[];
	// referential uuid of said asset, if undefined, always show
	characterIsAtLocation?: Location;
}
