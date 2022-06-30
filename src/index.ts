import CollisionManager from './core/base/collisionManager';
import Engine from './core/engine';
import PhysicsList from './core/helper/physicsList';
import Vector2 from './core/math/vector2';
import Logger from './core/misc/logger';
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
      export interface Collision {
        hitbox: Hitbox;
        subjectHitbox: Hitbox;
        normal: Vector2;
        depth: number;
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
      Hitbox,
    },
    Math: {
      Vector2,
    },
    Helper: {
      PhysicsList,
    },
    Base: {
      CollisionManager,
    },
    Misc: {
      Logger,
    },
  },
};

export default DuckPhysics;
