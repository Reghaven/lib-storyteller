import { Decision, Story } from '../model/story/story.interface';
import { Character } from '../model/character/character.interface';
import { Location } from '../model/story/place.interface';
import { Asset } from '../model/story/asset.interface';

export class SnippetFilter {
	public static allRelevantSnippets(stories: Story[], character: Character) {
		const allRelevantStories = this.storiesByAssets(stories, character);
		const allDecisionsFromAllStories = allRelevantStories
			.map((story) => story.decisions)
			.reduce((prev, current) => prev.concat(current));

		const remainingDecisionsByLocation = this.decisionsByLocation(
			allDecisionsFromAllStories,
			character.currentLocation
		);
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

	private static decisionsByAssets(
		decisions: Decision[],
		character: Character
	): Decision[] {
		return decisions;
	}
}
