import { Story } from '../../model/story/story.interface';
import { Place } from '../../model/story/place.interface';
import { Asset, AssetType } from '../../model/story/asset.interface';
import { attributes } from './attributes.object';

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
				winDissolvesAssets: [[Assets['Money'], 2]],
				winResolveAssets: [[Assets['Coffee'], 1]],
				grantedAttributePoints: 0,
			},
			onFail: {
				text: 'Oh no',
				failDissolvesAssets: [[Assets['Money'], 2]],
				failResolveAssets: [],
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
				winDissolvesAssets: [],
				winResolveAssets: [
					[Assets['Money'], 3],
					[Assets['Worked at Café'], 1],
				],
				grantedAttributePoints: 2,
			},
			onFail: {
				text: 'You broke too many plates. Salary goes down',
				failDissolvesAssets: [],
				failResolveAssets: [[Assets['Money'], 1]],
			},
		},
	],
};
