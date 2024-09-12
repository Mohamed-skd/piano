export class Base {
  /**
   * Display catched error
   * @param {Error} err The catched error
   * @returns
   */
  error(err) {
    console.warn("\n❌ Oups ! An error occured 😔.\n");
    console.error(err);
    console.log("\n");
    return false;
  }
}
