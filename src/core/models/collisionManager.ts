import Engine from '../engine';
import RigidBody from './rigidBody';

export default class CollisionManager {
  protected engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  public async testAgainst(body: RigidBody, bodies: RigidBody[]) {
    for (let i = 0; i < body.hitboxes.length; i++) {
      const hitbox = body.hitboxes[i];
      for (let x = 0; x < bodies.length; x++) {
        const subject = bodies[x];
        const tests = await hitbox.testAgainst(subject.hitboxes);
      }
    }
  }
}
