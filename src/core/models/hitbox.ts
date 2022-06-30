import { PhysicsTypes } from '../..';
import Engine from '../engine';
import degToRadians from '../math/functions/degToRadians';
import Transform from '../math/transform';
import Vector2 from '../math/vector2';
import RigidBody from './rigidBody';

export default class Hitbox {
  protected engine: Engine;

  public readonly shape: PhysicsTypes.Core.Hitbox.Shape;
  public body: RigidBody;

  public position: Vector2;
  public readonly positionBodyOffset: Vector2;

  public rotation: number;
  public readonly rotationBodyOffset: number;

  public vertices: Vector2[];
  protected transformedVertices: Vector2[] | null;

  public transformUpdateRequired: boolean;

  public w: number;
  public h: number;
  public r: number;

  constructor(
    engine: Engine,
    shape: 'rect',
    body: RigidBody,
    positionBodyOffset: Vector2,
    rotationBodyOffset: number,
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
    rotationBodyOffset: number,
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
    rotationBodyOffset: number,
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
    rotationBodyOffset: number,
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
    rotationBodyOffset: number,
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

    this.rotation = this.body.rotation;
    this.rotationBodyOffset = rotationBodyOffset;

    this.vertices = vertices;
    this.transformedVertices = [];

    this.transformUpdateRequired = true;

    this.w = w || 0;
    this.h = h || 0;
    this.r = r || 0;

    // set transformedVertices
    if (this.shape === 'rect' || this.shape === 'polygon') {
      this.transformedVertices = [];
    } else {
      this.transformedVertices = null;
    }
  }

  public async _update() {
    // update position
    this.position = this.body.position;
    this.position.add(this.positionBodyOffset);

    // update rotation
    this.rotation = this.body.rotation + this.rotationBodyOffset;
  }

  public correct(amount: Vector2) {
    this.body.position.add(amount);
    this.transformUpdateRequired = true;
  }

  public rotate(degrees: number) {
    this.rotation += degToRadians(degrees);
    this.transformUpdateRequired = true;
  }

  public async collideAgainst(hitboxes: Hitbox[]) {
    const collisions: PhysicsTypes.Core.Hitbox.Collision[] = [];

    // test collisions first
    for await (const subjectHitbox of hitboxes) {
      // prevent hitboxes from colliding with own other hitboxes
      if (this.body.hitboxes.includes(subjectHitbox)) {
        continue;
      }
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

  public getTransformedVertices() {
    if (this.transformUpdateRequired && this.transformedVertices) {
      const transform = new Transform(this.position, this.rotation);

      for (let i = 0; i < this.vertices.length; i++) {
        const v = this.vertices[i];
        this.transformedVertices[i] = Vector2.transformVector(v, transform);
      }
    }

    return this.transformedVertices;
  }
}
