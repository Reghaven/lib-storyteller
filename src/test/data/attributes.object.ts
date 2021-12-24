import { AssetType, Attribute } from '../../model/asset.interface';

export const attributes: { [key: string]: Attribute } = {
	Strength: {
		name: 'Strength',
		type: AssetType.Attribute,
		pointsCollected: 1,
	},
};
