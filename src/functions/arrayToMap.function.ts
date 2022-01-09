import { Entity } from '../model/entity.interface';

export function entityArrayToMap(entityArray: Entity[]): Map<string, Entity> {
	const map = new Map<string, Entity>();
	for (const entity of entityArray) {
		map.set(entity.uuid, entity);
	}
	return map;
}

export function entityMapToArray<T>(entityMap: Map<string, T>): T[] {
	const result: T[] = [];
	for (const e of entityMap.entries()) {
		result.push(e[1]);
	}
	return result;
}
