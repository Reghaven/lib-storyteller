import { IAssetInstance } from '../../model/story/asset.interface';

/** metadata on how a decision ended, used to determine how a character should be updated */
export interface SubmitDecisionResult {
	characterGainsAssetInstances: IAssetInstance[];
	characterLoosesAssetInstances: IAssetInstance[];
	characterGoesToLocation: string;
	characterGoesToPlace: string;
	characterWins: boolean;
	text: string;
}
