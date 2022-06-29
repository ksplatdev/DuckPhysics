import { PhysicsTypes } from '../..';
import uniqueID from '../../utils/uniqueID';
import Engine from '../engine';
import clamp from '../math/clamp';
import Vector2 from '../math/vector2';
import Hitbox from './hitbox';

export default class RigidBody {
  protected engine: Engine;

  public readonly id: string;

  public enabled: boolean;
  public physicsLayer: number;

  public x: number;
  public y: number;
  public w: number;
  public h: number;
  public r: number;

  public vertices: Vector2[];

  public position: Vector2;
  public rotation: Vector2;

  public velocity: Vector2;
  public angularVelocity: Vector2;

  public bounds: PhysicsTypes.Math.Bounds;

  public hitboxes: Hitbox[];

  constructor(
    engine: Engine,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number = w / 2,
    physicsLayer = 1
  ) {
    this.engine = engine;

    this.id = uniqueID();

    this.enabled = true;
    this.physicsLayer = physicsLayer;

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r || w / 2;

    this.vertices = [];

    this.position = new Vector2(this.x, this.y);
    this.rotation = Vector2.ZERO;

    this.velocity = Vector2.ZERO;
    this.angularVelocity = Vector2.ZERO;

    this.bounds = {
      x: -Infinity,
      y: -Infinity,
      w: Infinity,
      h: Infinity,
    };

    this.hitboxes = [];
  }

  public async _update(dt: number) {
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;

    // clamp to bounds
    this.position.x = clamp(this.position.x, this.bounds.x, this.bounds.w);
    this.position.y = clamp(this.position.y, this.bounds.y, this.bounds.h);
  }

  public addHitbox(hitboxVertices?: Vector2[]): Hitbox {
    const h = new Hitbox(this.engine, this, hitboxVertices || this.vertices);
    this.hitboxes.push(h);
    return h;
  }
}
