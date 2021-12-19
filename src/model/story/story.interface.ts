import { Attribute } from './asset.interface';
import { IAssetInstance } from '../asset-entity.type';
import { Location, Place } from './place.interface';

export interface Story {
	title: string;
	text: string;
	// order is determined by assets
	decisions: Decision[];

	conditionsToShow: {
		// story is only displayed in this place, if undefined, it is showed everywhere
		characterIsAtPlace?: Place;
		// only show if player possesses at least these assets, if empty, it is always shown
		characterHasAssets: IAssetInstance[];
		// do not show if player has any of these assets
		characterHasNotAssets: IAssetInstance[];
	};
}

// a selection the player can make, acts as story snippet
export interface Decision {
	// conditions to see this decision
	conditionsToShow: {
		// only show if player is at this place, if undefined, it will be shown everywhere
		characterIsAtLocation?: string;
		// only show if player possesses at least these assets, if empty, it is always shown
		characterHasAssets: IAssetInstance[];
		// do not show if player has any of these assets
		characterHasNotAssets: IAssetInstance[];
	};

	// conditions to use this decision
	conditionsToUse: {
		// only show if player possesses at least these assets, if empty, it is always shown
		characterHasAssets: IAssetInstance[];
		// do not show if player has any of these assets
		characterHasNotAssets: IAssetInstance[];
	};

	// if undefined, it will always be shown
	attribute?: {
		attributeToActivate: Attribute;
		attributeLevelFor100Percent: number;
	};

	// everything that happens when you win
	onWin: {
		text: string;
		winResolveAssets: IAssetInstance[];
		winDissolvesAssets: IAssetInstance[];
		grantedAttributePoints: number; // based on the attribute to activate
		leadsToLocation?: Location;
	};

	// everything that happens when you loose
	onFail: {
		text: string;
		failResolveAssets: IAssetInstance[];
		failDissolvesAssets: IAssetInstance[];
		leadsToLocation?: Location;
	};
}
