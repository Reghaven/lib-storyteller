﻿import { CharacterObject } from './data/character.object';
import { StoryCafeObject } from './data/story-cafe.object';
import { GameController } from '../controller/game.controller';

describe('game simulation', () => {
	it('should simulate a small game correctly', () => {
		const character = CharacterObject;
		const stories = [StoryCafeObject];

		// first, let's determine what decisions the character can make
		const decisions = GameController.retrievePossibleDecisions({
			character,
			stories,
		});
		expect(decisions.length).toBe(1);
		expect(decisions[0].title).toBe('Drink some coffee');

		// They want coffee? They'll get coffee, let them drink that stuff
		const result = GameController.submitDecision({
			decision: decisions[0],
			character: character,
			stories: stories,
		});
		expect(result.characterWins).toBeTruthy();
		expect(result.text).toBe('Ah, refreshing as always.');
		// the character should be updated accordingly
		const money = character.assets.get('Money');
		expect(money).toStrictEqual([{ name: 'Money', type: 'Normal' }, 1]);
	});
});
