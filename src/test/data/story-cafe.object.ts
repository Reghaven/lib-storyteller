import { Story } from '../../model/story.interface';
import { Asset, AssetType } from '../../model/asset.interface';
import { Place } from '../../model/place.interface';

const places: { [key: string]: Place } = {
	Cologne: {
		name: 'Cologne',
		locations: [
			{
				name: 'Café',
				isVisibleOnMap: true,
				isUnlockedFromBeginning: true,
				characterCanLeaveAnytime: true,
			},
			{
				name: 'Backalley',
				isVisibleOnMap: false,
				isUnlockedFromBeginning: false,
				characterCanLeaveAnytime: true,
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
	['Worked at Café']: {
		name: 'Job: Café',
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
				dissolvesAssets: [[Assets['Money'], 2]],
				resolvesAssets: [[Assets['Coffee'], 1]],
				grantedAttributePoints: 0,
			},
			onFail: {
				text: 'Oh no',
				dissolvesAssets: [[Assets['Money'], 2]],
				resolvesAssets: [],
				grantedAttributePoints: 0,
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
				dissolvesAssets: [],
				resolvesAssets: [
					[Assets['Money'], 3],
					[Assets['Worked at Café'], 1],
				],
				grantedAttributePoints: 2,
			},
			onFail: {
				text: 'You broke too many plates. Salary goes down',
				dissolvesAssets: [],
				resolvesAssets: [[Assets['Money'], 1]],
				grantedAttributePoints: 0,
			},
		},
	],
};
