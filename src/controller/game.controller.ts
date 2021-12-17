﻿import { Character } from '../model/character/character.interface';
import { Decision, Story } from '../model/story/story.interface';
import { SnippetFilter } from './snippet-filter.class';

export interface GameState {
	character: Character;
	stories: Story[];
}

export type GameDecision = GameState & { decision: Decision };

export interface DecisionCharacterView {
	decision: Decision;
	playerCanSelect: boolean;
}

/** provides methods to interact with stories and submit decisions */
export class GameController {
	/**
	 * should return all decisions a player can make based on his location and abilities
	 */
	public static retrievePossibleDecisions(gameState: GameState): Decision[] {
		return SnippetFilter.allRelevantSnippets(gameState);
	}

	/**
	 * submits a decision the player made
	 * @private
	 * @param gameDecision
	 */
	public static submitDecision(gameDecision: GameDecision): Character {
		// validate
		if (!this.canPlayerMakeDecision(gameDecision)) {
			throw new Error('INVALID_DECISION');
		}

		// handle decision

		return gameDecision.character;
	}

	/**
	 * checks if player has all requirements fulfilled to make a decision
	 * @private
	 * @param gameDecision
	 */
	private static canPlayerMakeDecision(gameDecision: GameDecision): boolean {
		return false;
	}
}
