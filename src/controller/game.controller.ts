import { Character } from '../model/character/character.interface';
import { Decision, Story } from '../model/story/story.interface';
import { SnippetFilter } from './snippet-filter.class';
import { Location } from '../model/story/place.interface';
import { IAssetInstance } from '../model/asset-entity.type';
import { CharacterController } from './character.controller';

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
		return SnippetFilter.allSnippetsCharacterCanSee(gameState);
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
		const attributeName =
			gameDecision.decision.attribute?.attributeToActivate.name;
		const level =
			gameDecision.decision.attribute?.attributeLevelFor100Percent;
		// if no attribute is provided, the action should automatically succeed
		if (!attributeName || !level) {
			return {
				characterGainsAssetInstances:
					gameDecision.decision.onWin.winResolveAssets,
				characterGoesToLocation:
					gameDecision.decision.onWin.leadsToLocation ||
					gameDecision.character.map.currentLocation,
				characterLoosesAssetInstances:
					gameDecision.decision.onWin.winDissolvesAssets,
				characterWins: true,
				text: gameDecision.decision.onWin.text,
			};
		}
		const hasPlayerWonDecision = CharacterController.attributeCheck(
			attributeName,
			level,
			gameDecision.character
		);

		// on win: provide/remove assets, change location
		if (hasPlayerWonDecision) {
			return {
				characterGainsAssetInstances:
					gameDecision.decision.onWin.winResolveAssets,
				characterGoesToLocation:
					gameDecision.decision.onWin.leadsToLocation ||
					gameDecision.character.map.currentLocation,
				characterLoosesAssetInstances:
					gameDecision.decision.onWin.winDissolvesAssets,
				characterWins: true,
				text: gameDecision.decision.onWin.text,
			};
		}

		// on loose: provide/remove assets, change location
		return {
			characterGainsAssetInstances:
				gameDecision.decision.onFail.failResolveAssets,
			characterGoesToLocation:
				gameDecision.decision.onFail.leadsToLocation ||
				gameDecision.character.map.currentLocation,
			characterLoosesAssetInstances:
				gameDecision.decision.onFail.failDissolvesAssets,
			characterWins: false,
			text: gameDecision.decision.onFail.text,
		};
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

export interface SubmitDecisionResult {
	characterGainsAssetInstances: IAssetInstance[];
	characterLoosesAssetInstances: IAssetInstance[];
	characterGoesToLocation: Location;
	characterWins: boolean;
	text: string;
}
