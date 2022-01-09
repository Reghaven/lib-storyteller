import { Entity } from '../entity.interface';
import { SubmitDecisionResult } from '../../controller/types/submit-decision-result.interface';
import { AssetCondition } from './asset-condition.entity';
import { AttributeCondition } from './attribute-condition.entity';

export interface Decision extends Entity {
	//
	text: string;
	// conditions to see this decision
	conditionsToShow: AssetCondition;
	// conditions to use this decision
	conditionsToUse: AssetCondition;
	// if undefined, it will always be shown
	attributeCondition?: AttributeCondition;
	// everything that happens when you win
	onWin: SubmitDecisionResult;
	// everything that happens when you loose
	onFail: SubmitDecisionResult;
}
