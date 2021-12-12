import { AssetInstance, Attribute } from './asset.interface';

export interface Story {
	title: string;
	firstStorySnippet: StorySnippet;
}

export interface StorySnippet {
	title: string;
	text: string;
	decisions: Decision[];
}

export interface Decision {
	leadsToSnippet: StorySnippet;

	requiredAssets: AssetInstance[];
	winResolveAssets: AssetInstance[];
	winDissolvesAssets: AssetInstance[];
	failResolveAssets: AssetInstance[];
	failDissolvesAssets: AssetInstance[];

	attributeToActivate: Attribute;
	levelForGuaranteedSuccess: number;
}
