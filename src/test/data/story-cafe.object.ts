import { Story } from '../../model/story.interface';
import { Asset, AssetType } from '../../model/asset.interface';
import { Place } from '../../model/place.interface';

export const Assets: { [key: string]: Asset } = {
	Money: {
		name: 'Money',
		type: AssetType.Normal,
	},
	Coffee: {
		name: 'Coffee',
		type: AssetType.Normal,
	},
	['Worked at Café']: {
		name: 'Job: Café',
		type: AssetType.Normal,
	},
};

export const StoryCafeObject: Story = {
	title: 'Cologne Café',
	text: 'Best stories are written in an café, you know?',
	conditionsToShow: {
		characterIsAtPlace: 'Cologne',
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
				characterLoosesAssetInstances: [[Assets['Money'], 2]],
				characterGainsAssetInstances: [[Assets['Coffee'], 1]],
				providesAttributePoints: 0,
				characterWins: true,
			},
			onFail: {
				text: 'Oh no',
				characterLoosesAssetInstances: [[Assets['Money'], 2]],
				characterGainsAssetInstances: [],
				providesAttributePoints: 0,
				characterWins: false,
			},
		},
		{
			title: 'Work: Wash dishes',
			text: "It's a hard but honest work, just don't look at the water",
			attribute: {
				attributeToActivate: 'Strength',
				attributeLevelFor100Percent: 1,
			},
			conditionsToShow: {
				characterIsAtLocation: 'Café',
				characterHasAssets: [],
				characterHasNotAssets: [],
			},
			conditionsToUse: {
				characterHasAssets: [],
				characterHasNotAssets: [],
			},
			onWin: {
				text: 'Your chef is satisfied. Dishes are shiny and clean.',
				characterLoosesAssetInstances: [],
				characterGainsAssetInstances: [
					[Assets['Money'], 3],
					[Assets['Worked at Café'], 1],
				],
				providesAttributePoints: 2,
				characterWins: true,
			},
			onFail: {
				text: 'You broke too many plates. Salary goes down',
				characterLoosesAssetInstances: [],
				characterGainsAssetInstances: [[Assets['Money'], 1]],
				providesAttributePoints: 0,
				characterWins: false,
				characterGoesToLocation: undefined,
			},
		},
	],
};
