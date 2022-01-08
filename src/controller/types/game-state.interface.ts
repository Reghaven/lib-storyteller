/** sums up character and all stories and therefore provides all relevant data in a game */
import { Character } from '../../model/character/character.interface';
import { Story } from '../../model/story/story.entity';
import { Decision } from '../../model/story/decision.entity';

export interface GameState {
	character: Character;
	stories: Story[];
}

/** adds a GameState and a decision the character made */
export type GameDecision = GameState & { decision: Decision };
