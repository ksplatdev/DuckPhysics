import { PhysicsTypes } from '../..';
import Engine from '../engine';
import Vector2 from '../math/vector2';
import RigidBody from './rigidBody';

export default class Hitbox {
  protected engine: Engine;
  public body: RigidBody;
  public vertices: Vector2[];

  constructor(engine: Engine, body: RigidBody, vertices: Vector2[]) {
    this.engine = engine;
    this.body = body;
    this.vertices = vertices || [];
  }

  public async testAgainst(hitboxes: Hitbox[]) {
    const tests: PhysicsTypes.Core.HitboxTest[] = [];

    for await (const hitbox of hitboxes) {
    }

    return tests;
  }
}
