import { Decision, Story } from '../model/story/story.interface';
import { Character } from '../model/character/character.interface';
import { Location } from '../model/story/place.interface';
import { GameState } from './game.controller';
import { IAssetInstance } from '../model/asset-entity.type';

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

		// here, filter by show is required
		return this.decisionsByAssets(
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
			this.characterHasAllOfAssetInstances(
				assetsCharacterMustPossess,
				character
			) &&
			!this.characterHasAnyOfAssetInstances(
				assetsCharacterMayNotPossess,
				character
			)
		);
	}

	private static characterHasAnyOfAssetInstances(
		assetInstances: IAssetInstance[],
		character: Character
	): boolean {
		for (const assetInstance of assetInstances) {
			const [asset, assetCount] = assetInstance;

			// if instance does not exist, continue
			const characterAssetInstance = character.assets.get(asset.name);
			if (characterAssetInstance === undefined) continue;

			// if instance exists, count must be higher then required
			const [, characterAssetCount] = characterAssetInstance;
			if (characterAssetCount >= assetCount) return true;
		}
		return false;
	}

	private static characterHasAllOfAssetInstances(
		assetInstances: IAssetInstance[],
		character: Character
	): boolean {
		for (const assetInstance of assetInstances) {
			const [asset, assetCount] = assetInstance;

			// if instance does not exist, continue
			const characterAssetInstance = character.assets.get(asset.name);
			if (characterAssetInstance === undefined) return false;

			// if instance exists, count must be higher then required
			const [, characterAssetCount] = characterAssetInstance;
			if (characterAssetCount < assetCount) return false;
		}
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
		return stories.filter((story) => {
			const assetsCharacterMayPossess =
				story.conditionsToShow.characterHasAssets;
			const assetsCharacterMayNotPossess =
				story.conditionsToShow.characterHasNotAssets;

			// if player owns one of these, do not add the story

			const characterOwnsOneOfThese =
				this.characterHasAnyOfAssetInstances(
					assetsCharacterMayNotPossess,
					character
				);
			if (characterOwnsOneOfThese) return false;

			// if player has all of these, it is added, meaning if one is not found, it is not added
			return this.characterHasAllOfAssetInstances(
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
	 * TODO should be based on show, not use
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
