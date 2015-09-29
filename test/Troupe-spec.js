'use strict';

import chai from 'chai';
import Troupe from '../src/Troupe';
import EventEmmiter from 'events';

const should = chai.should();

describe('Troupe', ()=> {
  it('Should throw error when trying to instantiate a new Troupe', ()=> {
    should.Throw(()=>new Troupe(), 'Troupe is a singleton, use the Troupe.instance!');
  });
  it('Should extends EventEmmiter', ()=> {
    Troupe.prototype.should.be.an.instanceof(EventEmmiter);
  });
  describe('#instance', ()=> {
    it('Should return a instance of Troupe', ()=> {
      Troupe.instance.should.be.an.instanceof(Troupe);
    });
  });
});
