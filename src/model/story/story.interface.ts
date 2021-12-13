import {Asset, Attribute} from './asset.interface';
import {IEntity} from "../../data-store.class";

export interface Story {
	title: string;
	text: string;
	firstStorySnippet: StorySnippet;
}

export interface StorySnippet {
	title: string;
	text: string;
	decisions: Decision[];
}

export interface Decision {
	leadsToSnippet: StorySnippet;

	requiredAssets: IEntity<Asset>[];
	winResolveAssets: IEntity<Asset>[];
	winDissolvesAssets: IEntity<Asset>[];
	failResolveAssets: IEntity<Asset>[];
	failDissolvesAssets: IEntity<Asset>[];

	attributeToActivate: Attribute;
	levelForGuaranteedSuccess: number;
}
