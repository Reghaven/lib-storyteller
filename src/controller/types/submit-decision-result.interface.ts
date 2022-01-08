/** metadata on how a decision ended, used to determine how a character should be updated */
import { AssetInstance } from '../../model/asset/asset-instance.entity';

export interface SubmitDecisionResult {
	/** assets a character should gain */
	characterGainsAssetInstances: AssetInstance[];
	/** assets a character looses after an outcome */
	characterLoosesAssetInstances: AssetInstance[];
	/** a location that the character should move to */
	characterGoesToLocation?: string;
	/** the place of the location a character goes to */
	characterGoesToPlace?: string;
	/** attribute points granted for an win, not available on fail */
	providesAttributePoints: number;
	/** attribute to increase */
	attributeToIncrease?: string;
	/** determines if a character won or lost a stat check */
	characterWins: boolean;
	/** the text that should be shown once the stat check is resolved */
	text: string;
}
