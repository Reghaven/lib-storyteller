import { Character } from '../../model/character/character.interface';
import { Location } from '../../model/place/location.entity';
import { Asset } from '../../model/asset/asset.entity';
import { AssetType } from '../../model/asset/asset-type.entity';
import { Story } from '../../model/story/story.entity';
import { Place } from '../../model/place/place.entity';
import { Attributes } from './attributes.object';

const Locations: Location[] = [
	{
		uuid: '7bf9e0da-a671-4bc2-875d-fc95a3fb8adb',
		name: 'Café',
		isUnlockedFromBeginning: true,
		characterCanLeaveAnytime: true,
		isVisibleOnMap: true,
	},
];

const Places: Place[] = [
	{
		uuid: '93fe689e-bcb4-4b91-93a9-c6499a6e122b',
		locations: Locations,
	},
];

const Assets: Asset[] = [
	{
		uuid: '2b1793f7-6349-4bfc-b12e-ad25eba5a485',
		name: 'Money',
		type: AssetType.Normal,
	},
	{
		uuid: 'abcd213b-2691-45ae-8d51-9a1d0f0ab805',
		name: 'Coffee',
		type: AssetType.Normal,
	},
	{
		uuid: 'eaca665a-cb7a-491b-b14d-b279754bebf0',
		name: 'Job: Café',
		type: AssetType.Normal,
	},
];

export const CharacterObject: Character = {
	uuid: 'fdef8e74-2104-4497-b88c-0a3063d0b21f',
	name: 'Johnathan Dough',
	assetInstances: [
		{
			asset: Assets[0],
			count: 3,
		},
	],
	attributes: [Attributes[0]],
	equipment: {},
	map: {
		currentLocation: Locations[0],
		unlockedLocations: Locations,
	},
};

export const StoryCafeObject: Story = {
	uuid: '1fce68f3-d790-47ac-8561-eaa68cc95046',
	name: 'Cologne Café',
	text: 'Best stories are written in an café, you know?',
	characterIsAtPlace: Places[0],
	characterHasAssets: [],
	characterHasNotAssets: [],
	decisions: [
		{
			uuid: 'aa61445f-9a3d-4376-ab5c-98ab6e6458e5',
			name: 'Drink some coffee',
			text: "It's the best",
			conditionsToShow: {
				uuid: '530ec299-1545-4fea-bdd7-fc4b568f42a5',
				characterIsAtLocation: Locations[0],
				characterHasAssets: [],
				characterHasNotAssets: [],
			},
			conditionsToUse: {
				uuid: '653eb694-6103-48b8-bee3-3a267373e841',
				characterHasAssets: [
					{
						asset: Assets[0],
						count: 2,
					},
				],
				characterHasNotAssets: [],
			},
			onWin: {
				text: 'Ah, refreshing as always.',
				characterLoosesAssetInstances: [
					{
						asset: Assets[0],
						count: 2,
					},
				],
				characterGainsAssetInstances: [
					{
						asset: Assets[1],
						count: 1,
					},
				],
				providesAttributePoints: 0,
				characterWins: true,
			},
			onFail: {
				text: 'Oh no',
				characterLoosesAssetInstances: [
					{
						asset: Assets[0],
						count: 2,
					},
				],
				characterGainsAssetInstances: [],
				providesAttributePoints: 0,
				characterWins: false,
			},
		},
		{
			uuid: '8e10cf1d-fae6-4753-88be-46dc5532bec0',
			name: 'Work: Wash dishes',
			text: "It's a hard but honest work, just don't look at the water",
			attributeCondition: {
				attributeToActivate: Attributes[0],
				attributeLevelFor100Percent: 1,
			},
			conditionsToShow: {
				uuid: 'a3c69fc1-41bc-403c-a474-fad4b1d4a0ae',
				characterIsAtLocation: Locations[0],
				characterHasAssets: [],
				characterHasNotAssets: [],
			},
			conditionsToUse: {
				uuid: '818e90fb-370f-4eb9-bd03-a0a62bf4d07b',
				characterHasAssets: [],
				characterHasNotAssets: [],
			},
			onWin: {
				text: 'Your chef is satisfied. Dishes are shiny and clean.',
				characterLoosesAssetInstances: [],
				characterGainsAssetInstances: [
					{
						asset: Assets[2],
						count: 1,
					},
					{
						asset: Assets[0],
						count: 3,
					},
				],
				providesAttributePoints: 2,
				characterWins: true,
			},
			onFail: {
				text: 'You broke too many plates. Salary goes down',
				characterLoosesAssetInstances: [],
				characterGainsAssetInstances: [
					{
						asset: Assets[0],
						count: 1,
					},
				],
				providesAttributePoints: 0,
				characterWins: false,
				characterGoesToLocation: undefined,
			},
		},
	],
};
