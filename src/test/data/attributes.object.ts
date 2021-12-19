import { AssetType, Attribute } from '../../model/story/asset.interface';

export const attributes: { [key: string]: Attribute } = {
	Strength: {
		name: 'Strength',
		type: AssetType.Attribute,
		pointsCollected: 1,
		pointsForNextLevel: 2,
	},
};
