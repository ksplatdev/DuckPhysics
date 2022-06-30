import { PhysicsTypes } from '../..';
import Engine from '../engine';
import RigidBody from '../models/rigidBody';

export default class CollisionManager {
  protected engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  public async testAgainst(body: RigidBody, bodies: RigidBody[]) {
    const collisions: PhysicsTypes.Core.Hitbox.Collision[] = [];

    for await (const hitbox of body.hitboxes) {
      for await (const subject of bodies) {
        if (subject.id === hitbox.body.id) {
          continue;
        }
        const test = await hitbox.collideAgainst(subject.hitboxes);
        for await (const result of test) {
          collisions.push(result);
        }
      }
    }
  }

  public async solveCollision(collision: PhysicsTypes.Core.Hitbox.Collision) {
    if (
      collision.hitbox.shape === 'circle' &&
      collision.subjectHitbox.shape === 'circle'
    ) {
      // circle to circle resolution
      this.solveCircleToCircle(collision);
    }
  }

  protected solveCircleToCircle(collision: PhysicsTypes.Core.Hitbox.Collision) {
    if (collision.subjectHitbox.body.isStatic) {
      // only move hitbox and not other/subject hitbox
      collision.hitbox.correct(
        collision.normal
          .clone()
          .negate()
          .multiplyNumber(collision.depth / 2)
      );
    } else {
      // move both
      collision.hitbox.correct(
        collision.normal
          .clone()
          .negate()
          .multiplyNumber(collision.depth / 2)
      );
      collision.subjectHitbox.correct(
        collision.normal.clone().multiplyNumber(collision.depth / 2)
      );
    }
  }
}
