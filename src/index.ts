import Engine from './core/engine';
import Vector2 from './core/math/vector2';
import Hitbox from './core/models/hitbox';
import RigidBody from './core/models/rigidBody';

export namespace PhysicsTypes {
  export namespace Math {
    export interface Vector2Like {
      x: number;
      y: number;
    }

    export interface Bounds extends Vector2Like {
      w: number;
      h: number;
    }
  }

  export namespace Core {
    export namespace Hitbox {
      export type Shape = 'circle' | 'capsule' | 'polygon' | 'rect';

      export interface Test {
        body: RigidBody;
        subjectBody: RigidBody;
        hitbox: Hitbox;
        subjectHitbox: Hitbox;
        hitboxIntersectingVertices: Vector2[];
        subjectHitboxIntersectingVertices: Vector2[];
      }
    }

    export namespace RigidBody {
      export type Shape = 'circle' | 'rect' | 'polygon';
    }
  }
}

const DuckPhysics = {
  Engine,
  Core: {
    Models: {
      RigidBody,
    },
    Math: {
      Vector2,
    },
  },
};

export default DuckPhysics;
