import { Attribute } from './asset.interface';
import { IAssetInstance } from '../asset-entity.type';
import { Location, Place } from './place.interface';

export interface Story {
	title: string;
	text: string;
	// order is determined by assets
	storySnippets: StorySnippet[];

	conditionsToShow: {
		// story is only displayed in this place, if undefined, it is showed everywhere
		characterIsAtPlace?: Place;
		// only show if player possesses at least these assets, if empty, it is always shown
		characterHasAssets: IAssetInstance[];
		// do not show if player has any of these assets
		characterHasNotAssets: IAssetInstance[];
	};
}

/** a story is shown if player has all required assets */
export interface StorySnippet {
	title: string;
	text: string;

	conditionsToShow: {
		// only show if player is at this place, if undefined, it will be shown everywhere
		characterIsAtLocation?: Location;
		// only show if player possesses at least these assets, if empty, it is always shown
		characterHasAssets: IAssetInstance[];
		// do not show if player has any of these assets
		characterHasNotAssets: IAssetInstance[];
	};

	// interactions the player can make with this story snippet
	decisions: Decision[];
}

// a selection the player can make
export interface Decision {
	// if undefined, the story is over
	leadsToSnippet?: StorySnippet;

	// conditions to see this decision
	conditionsToShow: {
		requiredAssets: IAssetInstance[];
		attributeToActivate: Attribute;
		attributeLevelFor100Percent: number;
	};

	// everything that happens when you win
	onWin: {
		winResolveAssets: IAssetInstance[];
		winDissolvesAssets: IAssetInstance[];
		grantedAttributePoints: number; // based on the attribute to activate
	};

	// everything that happens when you loose
	onFail: {
		failResolveAssets: IAssetInstance[];
		failDissolvesAssets: IAssetInstance[];
	};
}
