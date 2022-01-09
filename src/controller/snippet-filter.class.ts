import { CharacterController } from './character.controller';
import { GameState } from './types/game-state.interface';
import { Location } from '../model/place/location.entity';
import { Decision } from '../model/story/decision.entity';
import { Character } from '../model/character/character.interface';
import { Story } from '../model/story/story.entity';

export class SnippetFilter {
	public static allSnippetsCharacterCanSee(gameState: GameState) {
		const allRelevantStories = this.storiesByAssetsToShow(
			gameState.stories,
			gameState.character
		);
		const allDecisionsFromAllStories = allRelevantStories
			.map((story) => story.decisions)
			.reduce((prev, current) => prev.concat(current));

		const remainingDecisionsByLocation = this.decisionsByLocation(
			allDecisionsFromAllStories,
			gameState.character.map.currentLocation
		);

		// here, filter by show is required
		return this.decisionsByAssetsToShow(
			remainingDecisionsByLocation,
			gameState.character
		);
	}

	/**
	 * returns true if player possesses all required assets
	 * player can make decision when he fulfils all conditions to use it
	 * @param decision
	 * @param character
	 */
	public static characterCanMakeDecision(
		decision: Decision,
		character: Character
	): boolean {
		const assetsCharacterMayNotPossess =
			decision.conditionsToUse.characterHasNotAssets;
		const assetsCharacterMustPossess =
			decision.conditionsToUse.characterHasAssets;

		// player needs all of required and none of forbidden assets
		return (
			CharacterController.characterHasAllOfAssetInstances(
				assetsCharacterMustPossess,
				character
			) &&
			!CharacterController.characterHasAnyOfAssetInstances(
				assetsCharacterMayNotPossess,
				character
			)
		);
	}

	/**
	 * return als stories by assets. They should be filtered by location by the database
	 * @param stories
	 * @param character
	 * @private
	 */
	private static storiesByAssetsToShow(
		stories: Story[],
		character: Character
	): Story[] {
		return stories.filter((story: Story) => {
			const assetsCharacterMayPossess = story.characterHasAssets;
			const assetsCharacterMayNotPossess = story.characterHasNotAssets;

			// if player owns one of these, do not add the story

			const characterOwnsOneOfThese =
				CharacterController.characterHasAnyOfAssetInstances(
					assetsCharacterMayNotPossess,
					character
				);
			if (characterOwnsOneOfThese) return false;

			// if player has all of these, it is added, meaning if one is not found, it is not added
			return CharacterController.characterHasAllOfAssetInstances(
				assetsCharacterMayPossess,
				character
			);
		});
	}

	/***
	 * only returns snippets mit matching location
	 * @param decisions
	 * @param location
	 * @private
	 */
	private static decisionsByLocation(
		decisions: Decision[],
		location: Location
	): Decision[] {
		return decisions.filter(
			(decisions) =>
				decisions.conditionsToShow.characterIsAtLocation ===
					undefined ||
				decisions.conditionsToShow.characterIsAtLocation === location
		);
	}

	/**
	 * filters decisions by assets
	 * @param decisions
	 * @param character
	 * @private
	 */
	private static decisionsByAssetsToShow(
		decisions: Decision[],
		character: Character
	): Decision[] {
		return decisions.filter((decision) => {
			const characterHasForbiddenAssets =
				CharacterController.characterHasAnyOfAssetInstances(
					decision.conditionsToShow.characterHasNotAssets,
					character
				);
			if (characterHasForbiddenAssets) return false;

			return CharacterController.characterHasAllOfAssetInstances(
				decision.conditionsToShow.characterHasAssets,
				character
			);
		});
	}
}
