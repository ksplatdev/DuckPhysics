import { PhysicsTypes } from '../..';
import Engine from '../engine';
import Vector2 from '../math/vector2';
import RigidBody from './rigidBody';

export default class Hitbox {
  protected engine: Engine;

  public readonly shape: PhysicsTypes.Core.Hitbox.Shape;
  public body: RigidBody;

  public vertices: Vector2[];
  public edges: Vector2[];

  public w: number;
  public h: number;
  public r: number;

  constructor(
    engine: Engine,
    shape: 'rect',
    body: RigidBody,
    vertices: Vector2[],
    w: number,
    h: number,
    r?: number
  );

  constructor(
    engine: Engine,
    shape: 'capsule',
    body: RigidBody,
    vertices: Vector2[],
    w: number,
    h: number,
    r: number
  );

  constructor(
    engine: Engine,
    shape: 'circle',
    body: RigidBody,
    vertices: Vector2[],
    w: number,
    h: number,
    r: number
  );

  constructor(
    engine: Engine,
    shape: 'polygon',
    body: RigidBody,
    vertices: Vector2[],
    w?: number,
    h?: number,
    r?: number
  );

  constructor(
    engine: Engine,
    shape: PhysicsTypes.Core.Hitbox.Shape,
    body: RigidBody,
    vertices: Vector2[],
    w?: number,
    h?: number,
    r?: number
  ) {
    this.engine = engine;

    this.shape = shape;
    this.body = body;

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
  }

  public async testAgainst(hitboxes: Hitbox[]) {
    const tests: PhysicsTypes.Core.Hitbox.Test[] = [];

    for (const subjectHitbox of hitboxes) {
      //
    }

    return tests;
  }
}
