import {Meteor} from 'meteor/meteor';
import {chai} from 'meteor/practicalmeteor:chai';
import {TrainingStats} from './training-stats.js';

if (Meteor.isServer) {
    describe('TrainingStats', function () {
        beforeEach(function () {
            TrainingStats.insert({
                taskclassId: 1,
                learningtaskId: 1,
                performedWell: true,
                timeUntilGoal: 100
            });
            TrainingStats.insert({
                taskclassId: 1,
                learningtaskId: 2,
                performedWell: false,
                timeUntilGoal: 200
            });
            TrainingStats.insert({
                taskclassId: 1,
                learningtaskId: 1,
                performedWell: true,
                timeUntilGoal: 100
            });
            TrainingStats.insert({
                taskclassId: 1,
                learningtaskId: 3,
                performedWell: true,
                timeUntilGoal: 200
            });
        });

        afterEach(function () {
            TrainingStats.remove({});
        });

        it('detects worst performed task', function () {
            Meteor.call('worstPerformedTask', function (err, res) {
                chai.assert.equal(res[0]._id.taskclassId, 1);
                chai.assert.equal(res[0]._id.learningtaskId, 2);
            });
        });

        it('detects best performed task', function () {
            Meteor.call('bestPerformedTask', function (err, res) {
                chai.assert.equal(res[0]._id.taskclassId, 1);
                chai.assert.equal(res[0]._id.learningtaskId, 1);
            });
        });

        it('detects most performed task', function () {
            Meteor.call('mostPerformedTask', function (err, res) {
                chai.assert.equal(res[0]._id.taskclassId, 1);
                chai.assert.equal(res[0]._id.learningtaskId, 1);
            });
        });

        it('detects average time per task', function () {
            Meteor.call('avgTimePerTask', function (err, res) {
                chai.assert.equal(res[0].avgTimePerTask, 150);
            });
        });
    });
}

