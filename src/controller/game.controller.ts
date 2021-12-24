import { Character } from '../model/character.interface';
import { Decision } from '../model/story.interface';
import { SnippetFilter } from './snippet-filter.class';
import { CharacterController } from './character.controller';
import { SubmitDecisionResult } from './types/submit-decision-result.interface';
import { GameDecision, GameState } from './types/game-state.interface';

/** provides methods to interact with stories and submit decisions */
export class GameController {
	/**
	 * should return all decisions a player can make based on his location and abilities
	 * @param gameState character and all stories
	 * @returns a list of all decisions a player can make
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
		if (!this.canCharacterMakeDecision(gameDecision)) {
			throw new Error('INVALID_DECISION');
		}

		// stat roll for said decision
		const attributeName =
			gameDecision.decision.attribute?.attributeToActivate;
		const level =
			gameDecision.decision.attribute?.attributeLevelFor100Percent;

		const onWinResult: SubmitDecisionResult = {
			characterGainsAssetInstances:
				gameDecision.decision.onWin.winResolveAssets,
			characterGoesToLocation:
				gameDecision.decision.onWin.leadsToLocation?.name ||
				gameDecision.character.map.currentLocation,
			characterGoesToPlace:
				gameDecision.decision.onWin.leadsToPlace?.name ||
				gameDecision.character.map.currentPlace,
			characterLoosesAssetInstances:
				gameDecision.decision.onWin.winDissolvesAssets,
			winProvidesAttributePoints:
				gameDecision.decision.onWin.grantedAttributePoints,
			attributeToIncrease:
				gameDecision.decision.attribute?.attributeToActivate,
			characterWins: true,
			text: gameDecision.decision.onWin.text,
		};
		const onLooseResult: SubmitDecisionResult = {
			characterGainsAssetInstances:
				gameDecision.decision.onFail.failResolveAssets,
			characterGoesToLocation:
				gameDecision.decision.onFail.leadsToLocation?.name ||
				gameDecision.character.map.currentLocation,
			characterGoesToPlace:
				gameDecision.decision.onFail.leadsToPlace?.name ||
				gameDecision.character.map.currentPlace,
			characterLoosesAssetInstances:
				gameDecision.decision.onFail.failDissolvesAssets,
			characterWins: false,
			text: gameDecision.decision.onFail.text,
		};

		// if no attribute is provided, the action should automatically succeed
		if (!attributeName || !level) {
			this.mutateCharacterWithDecision(
				onWinResult,
				gameDecision.character
			);
			return onWinResult;
		}

		// attribute check
		const hasPlayerWonDecision = CharacterController.attributeCheck(
			attributeName,
			level,
			gameDecision.character
		);

		// on win: provide/remove assets, change location
		if (hasPlayerWonDecision) {
			this.mutateCharacterWithDecision(
				onWinResult,
				gameDecision.character
			);
			return onWinResult;
		}

		// on loose: provide/remove assets, change location
		this.mutateCharacterWithDecision(onLooseResult, gameDecision.character);
		return onLooseResult;
	}

	/**
	 * changes properties in a character to match a decision
	 * @param decisionResult all metadata required to mutate a character
	 * @param character the character to apply the mutation to
	 * @private
	 */
	private static mutateCharacterWithDecision(
		decisionResult: SubmitDecisionResult,
		character: Character
	): void {
		// add attribute points
		if (
			decisionResult.winProvidesAttributePoints &&
			decisionResult.attributeToIncrease
		) {
			CharacterController.addAttributePoints(
				decisionResult.attributeToIncrease,
				decisionResult.winProvidesAttributePoints,
				character
			);
		}

		// add and remove asset instances
		for (const assetInstances of decisionResult.characterGainsAssetInstances)
			CharacterController.giveAssetInstanceToCharacter(
				assetInstances,
				character
			);
		for (const assetInstance of decisionResult.characterLoosesAssetInstances)
			CharacterController.removeAssetFromPlayer(assetInstance, character);

		// change location
		CharacterController.moveToLocation(
			decisionResult.characterGoesToPlace,
			decisionResult.characterGoesToLocation,
			character
		);
	}

	/**
	 * checks if character has all requirements fulfilled to make a decision
	 * @private
	 * @param gameDecision a decision character wants to make
	 * @returns true, if the character can make that decision
	 */
	private static canCharacterMakeDecision(
		gameDecision: GameDecision
	): boolean {
		return SnippetFilter.characterCanMakeDecision(
			gameDecision.decision,
			gameDecision.character
		);
	}
}
