export default class Logger {
  public stack: string[] = [];

  public log(...args: unknown[]) {
    const msg = args.join(' ');

    console.log(`DuckPhysics: ${msg}`);

    this.stack.push(msg);
  }
  public warn(...args: unknown[]) {
    const msg = args.join(' ');

    console.warn(`DuckPhysics: ${msg}`);

    this.stack.push(msg);
  }
  public error(...args: unknown[]) {
    const msg = args.join(' ');

    console.error(`DuckPhysics: ${msg}`);

    this.stack.push(msg);
  }
}
