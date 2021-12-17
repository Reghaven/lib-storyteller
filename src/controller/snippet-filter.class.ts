import { Decision, Story } from '../model/story/story.interface';
import { Character } from '../model/character/character.interface';
import { Location } from '../model/story/place.interface';
import { GameState } from './game.controller';

export class SnippetFilter {
	public static allRelevantSnippets(gameState: GameState) {
		const allRelevantStories = this.storiesByAssets(
			gameState.stories,
			gameState.character
		);
		const allDecisionsFromAllStories = allRelevantStories
			.map((story) => story.decisions)
			.reduce((prev, current) => prev.concat(current));

		const remainingDecisionsByLocation = this.decisionsByLocation(
			allDecisionsFromAllStories,
			gameState.character.currentLocation
		);

		return this.decisionsByAssets(
			remainingDecisionsByLocation,
			gameState.character
		);
	}

	/**
	 * returns true if player possesses all required assets
	 * @param decision
	 * @param character
	 */
	public static characterCanMakeDecision(
		decision: Decision,
		character: Character
	): boolean {
		const assetsCharacterMayNotPossess =
			decision.conditionsToShow.characterHasNotAssets;
		const assetsCharacterMustPossess =
			decision.conditionsToShow.characterHasAssets;

		// if player has ONE of these, do not show decision
		for (const assetCharacterMayNotPossess of assetsCharacterMayNotPossess) {
			const [asset, assetCount] = assetCharacterMayNotPossess;

			const characterAssetInstance = character.assets.get(asset.name);
			if (characterAssetInstance === undefined) continue;

			const [, characterAssetCount] = characterAssetInstance;
			if (characterAssetCount >= assetCount) return false;
		}

		// if player has not all of them, do not show decision
		for (const assetCharacterMustPossess of assetsCharacterMustPossess) {
			const [asset, assetCount] = assetCharacterMustPossess;

			const characterAssetInstance = character.assets.get(asset.name);
			if (characterAssetInstance === undefined) return false;

			const [, characterAssetCount] = characterAssetInstance;
			if (characterAssetCount < assetCount) return false;
		}

		// else, return it
		return true;
	}

	/**
	 * return als stories by assets. They should be filtered by location by the database
	 * @param stories
	 * @param character
	 * @private
	 */
	private static storiesByAssets(
		stories: Story[],
		character: Character
	): Story[] {
		const characterAssets = character.assets;

		return stories.filter((story) => {
			const assetsCharacterMayPossess =
				story.conditionsToShow.characterHasAssets;
			const assetsCharacterMayNotPossess =
				story.conditionsToShow.characterHasNotAssets;

			// if player owns one of these, do not add the story
			for (const assetInstanceCharacterMayNotPossess of assetsCharacterMayNotPossess) {
				const [assetCharacterMayNotPossess, countPlayerMayNotPossess] =
					assetInstanceCharacterMayNotPossess;
				const characterAssetInstance = characterAssets.get(
					assetCharacterMayNotPossess.name
				);
				if (!characterAssetInstance) continue;

				const [, characterAssetCount] = characterAssetInstance;
				if (characterAssetCount >= countPlayerMayNotPossess) {
					return false;
				}
			}

			// if player has all of these, it is added, meaning if one is not found, it is not added
			for (const assetInstanceCharacterMayPossess of assetsCharacterMayPossess) {
				const [assetCharacterMayPossess, countPlayerMustPossess] =
					assetInstanceCharacterMayPossess;
				const characterAssetInstance = characterAssets.get(
					assetCharacterMayPossess.name
				);

				if (characterAssetInstance === undefined) return false;
				const [, characterAssetCount] = characterAssetInstance;

				if (characterAssetCount < countPlayerMustPossess) return false;
			}

			return true;
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
	private static decisionsByAssets(
		decisions: Decision[],
		character: Character
	): Decision[] {
		return decisions.filter((decision) =>
			this.characterCanMakeDecision(decision, character)
		);
	}
}
