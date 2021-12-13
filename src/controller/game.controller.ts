import {Character} from "../model/character/character.interface";
import {Decision, Story} from "../model/story/story.interface";

export class GameController {
	
	public constructor(
		private character: Character,
		private readonly stories: Story[],
	) {}

	/**
	 * swaps an existing character with a new character
	 * @param newCharacter
	 */
	public overwriteCharacter(newCharacter: Character): void {
		this.character = newCharacter;
	}

	/**
	 * retrieves information about current state of the game
	 */
	public retrieveGameState() {
		return {
			decisions: this.retrieveDecisions(),
		}
	}

	/**
	 * should return all decisions a player can make based on his location and abilities
	 */
	private retrieveDecisions(): Decision[] {
		return [];
	}

	/**
	 * submits a decision the player made
	 * @param decision
	 * @private
	 */
	public submitDecision(decision: Decision): boolean {
		// validate
		if (!this.canPlayerMakeDecision(decision)) { return false; }
		
		// handle decision
		
		return true;
	}

	/**
	 * checks if player has all requirements fulfilled to make a decision
	 * @param decision
	 * @private
	 */
	private canPlayerMakeDecision(decision: Decision): boolean {
		return false;
	}
}

export interface DecisionCharacterView {
	decision: Decision;
	playerCanSelect: boolean;
}
