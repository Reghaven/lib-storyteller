import {
	Character,
	CharacterMapEntry,
} from '../../model/character/character.interface';
import {
	AssetType,
	Attribute,
	IAssetInstance,
} from '../../model/story/asset.interface';
import { Assets } from './story-cafe.object';

const attributes: Map<string, Attribute> = new Map([
	[
		'Strength',
		{
			name: 'Strength',
			type: AssetType.Attribute,
			pointsCollected: 1,
			pointsForNextLevel: 2,
		},
	],
]);

export const CharacterObject: Character = {
	name: 'Johnathan Dough',
	assets: new Map<string, IAssetInstance>([['Money', [Assets['Money'], 3]]]),
	attributes: attributes,
	equipment: {},
	map: {
		currentLocation: 'Café',
		currentPlace: 'Cologne',
		unlockedLocations: new Map<string, CharacterMapEntry[]>([
			['Cologne', [{ name: 'Café' }]],
		]),
	},
};
