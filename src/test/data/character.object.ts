import { Character, CharacterMapEntry } from '../../model/character.interface';
import { Attribute, IAssetInstance } from '../../model/asset.interface';
import { Assets } from './story-cafe.object';
import { attributes } from './attributes.object';

export const CharacterObject: Character = {
	name: 'Johnathan Dough',
	assets: new Map<string, IAssetInstance>([['Money', [Assets['Money'], 3]]]),
	attributes: new Map<string, Attribute>([
		['Strength', attributes['Strength']],
	]),
	equipment: {},
	map: {
		currentLocation: 'Café',
		currentPlace: 'Cologne',
		unlockedLocations: new Map<string, CharacterMapEntry[]>([
			['Cologne', [{ name: 'Café' }]],
		]),
	},
};
