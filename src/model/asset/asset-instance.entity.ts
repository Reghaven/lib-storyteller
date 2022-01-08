import { Entity } from '../entity.interface';
import { Asset } from './asset.interface';

export interface AssetInstance extends Entity {
	/** asset character owns */
	asset: Asset;

	/** amount if said asset */
	count: number;
}
