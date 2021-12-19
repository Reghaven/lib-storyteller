import { Story } from '../../model/story/story.interface';
import { Place } from '../../model/story/place.interface';
import { Asset, AssetType } from '../../model/story/asset.interface';

const places: { [key: string]: Place } = {
	Cologne: {
		name: 'Cologne',
		locations: [
			{
				name: 'Café',
				isVisibleOnMap: true,
				isUnlockedFromBeginning: true,
			},
			{
				name: 'Backalley',
				isVisibleOnMap: false,
				isUnlockedFromBeginning: false,
			},
		],
	},
};

export const Assets: { [key: string]: Asset } = {
	Money: {
		name: 'Money',
		type: AssetType.Normal,
	},
	Coffee: {
		name: 'Coffee',
		type: AssetType.Normal,
	},
};

export const StoryCafeObject: Story = {
	title: 'Cologne Café',
	text: 'Best stories are written in an café, you know?',
	conditionsToShow: {
		characterIsAtPlace: places['Cologne'],
		characterHasAssets: [],
		characterHasNotAssets: [],
	},
	decisions: [
		{
			title: 'Drink some coffee',
			text: "It's the best",
			attribute: undefined,
			conditionsToShow: {
				characterIsAtLocation: 'Café',
				characterHasAssets: [],
				characterHasNotAssets: [],
			},
			conditionsToUse: {
				characterHasAssets: [[Assets['Money'], 2]],
				characterHasNotAssets: [],
			},
			onWin: {
				text: 'Ah, refreshing as always.',
				winDissolvesAssets: [[Assets['Money'], 2]],
				winResolveAssets: [[Assets['Coffee'], 1]],
			},
			onFail: {
				text: 'Oh no',
				failDissolvesAssets: [[Assets['Money'], 2]],
				failResolveAssets: [],
			},
		},
	],
};
