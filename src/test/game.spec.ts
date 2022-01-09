import { CharacterObject, StoryCafeObject } from './data/story-cafe.object';
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
		expect(decisions[0].name).toBe('Drink some coffee');
		expect(decisions[1].name).toBe('Work: Wash dishes');

		// They want coffee? They'll get coffee, let them drink that stuff
		const result = GameController.submitDecision({
			decision: decisions[0],
			character: character,
			stories: stories,
		});
		expect(result.characterWins).toBeTruthy();
		expect(result.text).toBe('Ah, refreshing as always.');
		// the character should be updated accordingly
		const coffee = character.assetInstances.find(
			(i) => i.asset.uuid === 'abcd213b-2691-45ae-8d51-9a1d0f0ab805'
		);
		expect(coffee).toStrictEqual([{ name: 'Coffee', type: 'Normal' }, 1]);
		const money = character.assetInstances.find(
			(i) => i.asset.uuid === '2b1793f7-6349-4bfc-b12e-ad25eba5a485'
		);
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
		const result2 = GameController.submitDecision({
			decision: decisions[1],
			character: character,
			stories: stories,
		});
		expect(result2.characterWins).toBeTruthy();
		expect(character.assetInstances).toStrictEqual({
			Money: [{ name: 'Money', type: 'Normal' }, 4],
			Coffee: [{ name: 'Coffee', type: 'Normal' }, 1],
			'Job: Café': [{ name: 'Job: Café', type: 'Normal' }, 1],
		});
	});
});
