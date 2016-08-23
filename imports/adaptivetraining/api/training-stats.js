import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Roles} from 'meteor/alanning:roles';
import {check, Match} from 'meteor/check';


export const TrainingStats = new Mongo.Collection("trainingStats");


if (Meteor.isServer) {
    Meteor.publish('trainingStats', function () {
        if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
            return TrainingStats.find();
        }
        return this.ready();
    });
    Meteor.methods({
        worstPerformedTask: function () {
            let result = TrainingStats.aggregate([{$match: {performedWell: false}}, {
                $group: {
                    _id: {
                        taskclassId: "$taskclassId",
                        learningtaskId: "$learningtaskId"
                    }, numPerformedWell: {$sum: 1}
                }
            }, {$sort: {numPerformedWell: -1}}, {$limit: 1}]);
            return result;
        },
        bestPerformedTask: function () {
            let result = TrainingStats.aggregate([{$match: {performedWell: true}}, {
                $group: {
                    _id: {
                        taskclassId: "$taskclassId",
                        learningtaskId: "$learningtaskId"
                    }, numPerformedWell: {$sum: 1}
                }
            }, {$sort: {numPerformedWell: -1}}, {$limit: 1}]);
            return result;
        },
        avgTimePerTask: function () {
            let result = TrainingStats.aggregate([{$group: {_id: null, avgTimePerTask: {$avg: "$timeUntilGoal"}}}]);
            return result;
        },
        mostPerformedTask: function () {
            let result = TrainingStats.aggregate([{
                $group: {
                    _id: {
                        taskclassId: "$taskclassId",
                        learningtaskId: "$learningtaskId"
                    }, num: {$sum: 1}
                }
            }, {$sort: {_id: 1, num: -1}}, {$limit: 1}]);
            return result;
        },
    });
}

Meteor.methods({
    insertTrainingStats: function (newStats) {
        TrainingStats.insert(newStats);
    }
});