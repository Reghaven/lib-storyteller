import {Asset, Attribute} from './asset.interface';
import {IAssetInstance} from "../asset-entity.type";
import {Location} from "./place.interface";

export interface Story {
	title: string;
	text: string;
	firstStorySnippet: StorySnippet;
}

/** a story is shown if player has all required assets */
export interface StorySnippet {
	title: string;
	text: string;
	
	conditionsToShow: {
		// only show if player is at this place
		location: Location;
		// only show if player possesses at least these assets
		assetsRequiredToDisplay: IAssetInstance[];
		// do not show if player has any of these assets
		assetsProhibitingDisplay: IAssetInstance[];
	}
	
	// interactions the player can make with this story snippet
	decisions: Decision[];
}

export interface Decision {
	leadsToSnippet: StorySnippet;

	requiredAssets: IAssetInstance[];
	winResolveAssets: IAssetInstance[];
	winDissolvesAssets: IAssetInstance[];
	failResolveAssets: IAssetInstance[];
	failDissolvesAssets: IAssetInstance[];

	attributeToActivate: Attribute;
	levelForGuaranteedSuccess: number;
}
