import { PhysicsTypes } from '../..';
import Engine from '../engine';
import Vector2 from '../math/vector2';
import RigidBody from './rigidBody';

export default class Hitbox {
  protected engine: Engine;

  public readonly shape: PhysicsTypes.Core.Hitbox.Shape;
  public body: RigidBody;

  public position: Vector2;
  public readonly positionBodyOffset: Vector2;

  public vertices: Vector2[];
  public edges: Vector2[];

  public w: number;
  public h: number;
  public r: number;

  constructor(
    engine: Engine,
    shape: 'rect',
    body: RigidBody,
    positionBodyOffset: Vector2,
    vertices: Vector2[],
    w: number,
    h: number,
    r?: number
  );

  constructor(
    engine: Engine,
    shape: 'capsule',
    body: RigidBody,
    positionBodyOffset: Vector2,
    vertices: Vector2[],
    w: number,
    h: number,
    r: number
  );

  constructor(
    engine: Engine,
    shape: 'circle',
    body: RigidBody,
    positionBodyOffset: Vector2,
    vertices: Vector2[],
    w: number,
    h: number,
    r: number
  );

  constructor(
    engine: Engine,
    shape: 'polygon',
    body: RigidBody,
    positionBodyOffset: Vector2,
    vertices: Vector2[],
    w?: number,
    h?: number,
    r?: number
  );

  constructor(
    engine: Engine,
    shape: PhysicsTypes.Core.Hitbox.Shape,
    body: RigidBody,
    positionBodyOffset: Vector2,
    vertices: Vector2[],
    w?: number,
    h?: number,
    r?: number
  ) {
    this.engine = engine;

    this.shape = shape;
    this.body = body;

    this.position = this.body.position;
    this.positionBodyOffset = positionBodyOffset;

    this.vertices = vertices;
    this.edges = [];

    this.w = w || 0;
    this.h = h || 0;
    this.r = r || 0;

    // build edges

    if (this.vertices.length < 3) {
      this.engine.logger.error('There must be more than 2 vertices');
    }
    for (let i = 0; i < this.vertices.length; i++) {
      const a = this.vertices[i];
      let b = this.vertices[0];
      if (i + 1 < this.vertices.length) {
        b = this.vertices[i + 1];
      }
      this.edges.push(new Vector2(b.x - a.x, b.y - a.y));
    }

    // calc position
    this.position.add(this.positionBodyOffset);
  }

  public async _update() {
    // update position
    this.position = this.body.position;
    this.position.add(this.positionBodyOffset);
  }

  public correct(amount: Vector2) {
    this.body.position.add(amount);
  }

  public async collideAgainst(hitboxes: Hitbox[]) {
    const collisions: PhysicsTypes.Core.Hitbox.Collision[] = [];

    // test collisions first
    for await (const subjectHitbox of hitboxes) {
      if (this.shape === 'circle' && subjectHitbox.shape === 'circle') {
        const collision = await this.testCircleCircle(subjectHitbox);
        if (collision) {
          collisions.push(collision);
        }
      }
    }

    // don't solve collisions, return array for CollisionManager to handle
    return collisions;
  }

  private async testCircleCircle(
    subjectHitbox: Hitbox
  ): Promise<false | PhysicsTypes.Core.Hitbox.Collision> {
    if (this.shape === 'circle' && subjectHitbox.shape === 'circle') {
      const centerA = this.position;
      const radiusA = this.r;

      const centerB = subjectHitbox.position;
      const radiusB = subjectHitbox.r;

      const normal = Vector2.ZERO;
      let depth = 0;

      const distance = Vector2.distanceBetween(centerA, centerB);
      const radii = radiusA + radiusB;

      if (distance >= radii) {
        // no collision
        return false;
      }

      // collision

      normal.x = centerB.x - centerA.x;
      normal.y = centerB.y - centerA.y;
      normal.normalize();

      depth = radii - distance;

      return {
        hitbox: this,
        subjectHitbox,
        normal,
        depth,
      };
    } else {
      this.engine.logger.error(
        'Cannot run Hitbox.testCircleCircle if both hitboxes are not circles.'
      );
      return false;
    }
  }
}
