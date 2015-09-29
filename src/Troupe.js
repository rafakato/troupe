'use strict';

import EventEmmiter from 'events';

const SingletonEnforcer = Symbol();
const Instance = Symbol();

export default class Troupe extends EventEmmiter {
  constructor(singletonEnforcer) {
    super();

    if (singletonEnforcer !== SingletonEnforcer) {
      throw new Error('Troupe is a singleton, use the Troupe.instance!');
    }
  }

  static get instance() {
    if (this[Instance] === undefined) {
      this[Instance] = new Troupe(SingletonEnforcer);
    }

    return this[Instance];
  }
}
