import {Meteor} from 'meteor/meteor';
import {chai} from 'meteor/practicalmeteor:chai';

import {Instructions} from './instructions.js';

if (Meteor.isServer) {
    describe('Instructions', function () {
        describe('methods', function () {
            afterEach(function () {
                Instructions.remove({});
            });

            it('sends correct dimensions of Instructions collection', function () {
                Instructions.insert({"id": 1, "learningtasks": [{"id": 1}, {"id": 2}]});
                Instructions.insert({"id": 2, "learningtasks": [{"id": 1}]});
                Meteor.call('instructions.size', function (err, res) {
                    chai.assert.equal(Object.keys(res).length, 2);
                    chai.assert.equal(res[1], 2);
                    chai.assert.equal(res[2], 1);
                });
            });
        });
    });
}
