export type IEntity<T> = [T, number];
export type IEntityRequest = [string, number];

/** handles storage of entities as object */
export class DataStore<T> {
	private data: { [key: string]: IEntity<T> } = {};

	public fetch(name: string): IEntity<T> | undefined {
		return this.data[name];
	}

	public store(name: string, entity: IEntity<T>) {
		this.data[name] = entity;
	}
}
