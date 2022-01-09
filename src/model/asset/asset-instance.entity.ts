import { Asset } from './asset.entity';

export interface AssetInstance {
	/** asset character owns */
	asset: Asset;

	/** amount if said asset */
	count: number;
}
