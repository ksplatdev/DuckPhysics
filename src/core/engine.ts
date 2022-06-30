import Logger from './misc/logger';
import RigidBody from './models/rigidBody';
import PhysicsList from './helper/physicsList';

export default class Engine {
  public bodies: PhysicsList;

  public logger: Logger;

  constructor(bodies?: RigidBody[]) {
    this.bodies = new PhysicsList(this, bodies);

    this.logger = new Logger();

    this.logger.log('Engine Initialized');
  }

  public async tick(dt: number) {
    for await (const body of this.bodies.enabledFilter(true)) {
      // positional logic
      await body._update(dt);

      // hitbox updates
      for await (const hitbox of body.hitboxes) {
        await hitbox._update();
      }

      // collision detection

      // collision resolution
    }
  }
}
