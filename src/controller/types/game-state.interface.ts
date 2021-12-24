import { Character } from '../../model/character.interface';
import { Decision, Story } from '../../model/story.interface';

/** sums up character and all stories and therefore provides all relevant data in a game */
export interface GameState {
	character: Character;
	stories: Story[];
}

/** adds a GameState and a decision the character made */
export type GameDecision = GameState & { decision: Decision };
