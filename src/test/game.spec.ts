import { CharacterObject } from './data/character.object';
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
		expect(decisions.length).toBe(2);
		expect(decisions[0].title).toBe('Drink some coffee');
		expect(decisions[1].title).toBe('Work: Wash dishes');

		// They want coffee? They'll get coffee, let them drink that stuff
		const result = GameController.submitDecision({
			decision: decisions[0],
			character: character,
			stories: stories,
		});
		expect(result.characterWins).toBeTruthy();
		expect(result.text).toBe('Ah, refreshing as always.');
		// the character should be updated accordingly
		const coffee = character.assets.get('Coffee');
		expect(coffee).toStrictEqual([{ name: 'Coffee', type: 'Normal' }, 1]);
		const money = character.assets.get('Money');
		expect(money).toStrictEqual([{ name: 'Money', type: 'Normal' }, 1]);

		// Another coffee? This should throw due to the lack of money
		const sd1 = () =>
			GameController.submitDecision({
				decision: decisions[0],
				character: character,
				stories: stories,
			});
		expect(sd1).toThrow('INVALID_DECISION');

		// seems like you should work for your coffee
	});
});
