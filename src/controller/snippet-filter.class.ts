import { Story, StorySnippet } from '../model/story/story.interface';
import { Character } from '../model/character/character.interface';
import { IAssetInstance } from '../model/asset-entity.type';

export class SnippetFilter {
	public static allRelevantSnippets(stories: Story[]) {
		const allSnippetsFromAllStories = stories
			.map((story) => story.storySnippets)
			.reduce((prev, current) => prev.concat(current));
	}

	/**
	 * returns all stories a player can interact with
	 * @param stories
	 * @param character
	 * @private
	 */
	private static allRelevantStories(
		stories: Story[],
		character: Character
	): Story[] {
		const allStoriesByAssets = this.storiesByAssets(stories, character);

		return allStoriesByAssets;
	}

	public static storiesByAssets(
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
}
