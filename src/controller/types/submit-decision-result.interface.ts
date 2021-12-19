import { IAssetInstance } from '../../model/asset-entity.type';

export interface SubmitDecisionResult {
	characterGainsAssetInstances: IAssetInstance[];
	characterLoosesAssetInstances: IAssetInstance[];
	characterGoesToLocation: string;
	characterWins: boolean;
	text: string;
}
