import Engine from '../engine';
import RigidBody from './rigidBody';

export default class PhysicsList {
  protected engine: Engine;

  public array: RigidBody[];

  constructor(engine: Engine, array?: RigidBody[]) {
    this.engine = engine;

    this.array = array || [];
  }

  public add(item: RigidBody) {
    this.array.push(item);
  }

  public remove(item: RigidBody) {
    const f = this.array.find((t) => t.id === item.id);

    if (f) {
      this.array.splice(
        this.array.findIndex((t) => t.id === item.id),
        1
      );
    } else {
      this.engine.logger.error('Cannot remove body from PhysicsList');
    }
  }

  public each<t = void>(cb: (item: RigidBody, index: number) => t) {
    this.array.forEach(cb.bind(this));
  }

  public enabledFilter(filter = true) {
    const filtered = this.array.filter((t) => t.enabled === filter);

    return filtered;
  }

  public splice(index: number, amount?: number) {
    this.array.splice(index, amount);
  }

  public get length() {
    return this.array.length;
  }
}
