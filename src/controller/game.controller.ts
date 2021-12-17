import { Character } from '../model/character/character.interface';
import { Decision, Story } from '../model/story/story.interface';
import { SnippetFilter } from './snippet-filter.class';
import { Location } from '../model/story/place.interface';
import { IAssetInstance } from '../model/asset-entity.type';

export interface GameState {
	character: Character;
	stories: Story[];
}

export type GameDecision = GameState & { decision: Decision };

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
	public static submitDecision(
		gameDecision: GameDecision
	): SubmitDecisionResult {
		// validate
		if (!this.canPlayerMakeDecision(gameDecision)) {
			throw new Error('INVALID_DECISION');
		}

		// stat roll for said decision

		// on win: provide/remove assets, change location

		// on loose: provide/remove assets, change location
	}

	/**
	 * checks if player has all requirements fulfilled to make a decision
	 * @private
	 * @param gameDecision
	 */
	private static canPlayerMakeDecision(gameDecision: GameDecision): boolean {
		return SnippetFilter.characterCanMakeDecision(
			gameDecision.decision,
			gameDecision.character
		);
	}
}

interface SubmitDecisionResult {
	characterGainsAssetInstances: IAssetInstance[];
	characterLoosesAssetInstances: IAssetInstance[];
	characterGoesToLocation: Location;
}
