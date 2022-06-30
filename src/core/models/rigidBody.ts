import { PhysicsTypes } from '../..';
import uniqueID from '../../utils/uniqueID';
import Engine from '../engine';
import calcPolygonArea from '../math/functions/calcPolygonArea';
import clamp from '../math/functions/clamp';
import Vector2 from '../math/vector2';
import Hitbox from './hitbox';

export default class RigidBody {
  protected engine: Engine;

  public readonly id: string;
  public readonly shape: PhysicsTypes.Core.RigidBody.Shape;

  public enabled: boolean;
  public physicsLayers: number[];

  public x: number;
  public y: number;
  public w: number;
  public h: number;
  public r: number;

  public isStatic: boolean;

  public vertices: Vector2[];

  public position: Vector2;
  public linearVelocity: Vector2;

  public angularVelocity: number;
  public rotation: number;

  public area: number;
  public density: number;
  public restitution: number;
  public mass: number;

  public bounds: PhysicsTypes.Math.Bounds;

  public hitboxes: Hitbox[];

  constructor(
    engine: Engine,
    shape: PhysicsTypes.Core.RigidBody.Shape,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number = w / 2,
    vertices: Vector2[] | undefined = undefined,
    isStatic = true,
    physicsLayers = [1],
    density = 1,
    restitution = 0,
    mass?: number
  ) {
    this.engine = engine;

    this.id = uniqueID();
    this.shape = shape;

    this.enabled = true;
    this.physicsLayers = physicsLayers;

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r || w / 2;

    this.isStatic = isStatic;

    this.vertices = vertices || [];

    this.position = new Vector2(this.x, this.y);
    this.linearVelocity = Vector2.ZERO;

    this.angularVelocity = 0;
    this.rotation = 0;

    this.density = density;
    this.restitution = restitution;
    this.mass = mass || 0; // calc mass later in constructor

    this.area = 0; // calc area later in constructor

    this.bounds = {
      x: -Infinity,
      y: -Infinity,
      w: Infinity,
      h: Infinity,
    };

    this.hitboxes = [];

    // create vertices
    if (this.shape === 'rect') {
      const top_left = new Vector2(this.position.x, this.position.y);
      const top_right = new Vector2(this.position.x + this.w, this.position.y);
      const bottom_left = new Vector2(
        this.position.x,
        this.position.y + this.h
      );
      const bottom_right = new Vector2(
        this.position.x + this.w,
        this.position.y + this.h
      );

      this.vertices = [top_left, top_right, bottom_left, bottom_right];
    }
    if (this.shape === 'circle') {
      this.vertices = [];
    }
    if (this.shape === 'polygon' && this.vertices.length === 0) {
      // throw error, polygons must be provided with vertices
      this.engine.logger.error(
        'RigidBody type polygon was not provided any vertices.'
      );
    }

    // calc area
    if (this.shape === 'circle') {
      this.area = this.r * this.r * Math.PI;
    }
    if (this.shape === 'rect') {
      this.area = this.w * this.h;
    }
    if (this.shape === 'polygon') {
      this.area = calcPolygonArea(this.vertices);
    }

    // calc mass
    this.mass = this.area * this.density;
  }

  public async _update(dt: number) {
    if (this.isStatic) {
      return;
    }

    // position
    this.position.x += this.linearVelocity.x * dt;
    this.position.y += this.linearVelocity.y * dt;

    // rotation
    this.rotation += this.angularVelocity * dt;

    // clamp to bounds
    this.position.x = clamp(this.position.x, this.bounds.x, this.bounds.w);
    this.position.y = clamp(this.position.y, this.bounds.y, this.bounds.h);
  }

  public addHitbox(
    shape: PhysicsTypes.Core.Hitbox.Shape,
    positionBodyOffset?: Vector2,
    hitboxVertices?: Vector2[],
    w?: number,
    h?: number,
    r?: number
  ): Hitbox {
    const hitbox = new Hitbox(
      this.engine,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      shape as any,
      this,
      positionBodyOffset || Vector2.ZERO,
      hitboxVertices || this.vertices,
      w,
      h,
      r
    );
    this.hitboxes.push(hitbox);
    return hitbox;
  }
}
