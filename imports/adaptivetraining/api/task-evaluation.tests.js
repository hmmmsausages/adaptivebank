import {Meteor} from 'meteor/meteor';
import {chai} from 'meteor/practicalmeteor:chai';
import {TaskEvaluation} from './task-evaluation.js';

if (Meteor.isClient) {
    describe('TaskEvaluation', function () {
        it('recognises no goal', function () {
            chai.assert.equal(TaskEvaluation.observeTaskGoals({}), true);
        });

        it('recognises path goal', function () {
            chai.assert.equal(TaskEvaluation.observeTaskGoals({path: ""}), true);
            chai.assert.equal(TaskEvaluation.observeTaskGoals({path: "/test"}), false);
        });
    });
}

if (Meteor.isServer) {
    describe('TaskEvaluation', function () {
        afterEach(function () {
            Meteor.users.remove({});
        });

        it('recognises no goal', function () {
            chai.assert.equal(TaskEvaluation.observeTaskGoals({}), true);
        });

        it('recognises query goal', function () {
            Meteor.users.insert({_id: "test"});
            chai.assert.equal(TaskEvaluation.observeTaskGoals({queries: ["Meteor.users.find()"]}), true);
        });
    });
}

