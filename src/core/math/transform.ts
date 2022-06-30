import Vector2 from './vector2';

export default class Transform {
  public x: number;
  public y: number;
  public sin: number;
  public cos: number;

  constructor(position: Vector2, angle: number) {
    this.x = position.x;
    this.y = position.y;
    this.sin = Math.sin(angle);
    this.cos = Math.cos(angle);
  }

  public static ZERO() {
    return new Transform(Vector2.ZERO, 0);
  }
}
