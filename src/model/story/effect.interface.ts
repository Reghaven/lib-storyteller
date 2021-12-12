import { Attribute } from './asset.interface';

export enum EffectType {
	Increase = 'Increase',
	Decrease = 'Decrease',
}

export interface Effect {
	attribute: Attribute;
	type: EffectType;
}
