import { IAssetInstance } from '../../model/story/asset.interface';

export interface SubmitDecisionResult {
	characterGainsAssetInstances: IAssetInstance[];
	characterLoosesAssetInstances: IAssetInstance[];
	characterGoesToLocation: string;
	characterGoesToPlace: string;
	characterWins: boolean;
	text: string;
}
