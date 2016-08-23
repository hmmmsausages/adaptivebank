import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check, Match} from 'meteor/check';

import {AdaptiveAdvice} from './adaptive-advice.js';
import {Instructions} from './instructions.js';

export const TrainingProgress = new Mongo.Collection("trainingProgress");


if (Meteor.isServer) {
    Meteor.publish('trainingProgress', function () {
        if (!this.userId) {
            return this.ready();
        }
        return TrainingProgress.find({_id: this.userId});
    });
}

Meteor.methods({
    nextTask: function () {
        let taskclassId = 1;
        let learningtaskId = 1;

        let trainingProgress = TrainingProgress.findOne({_id: this.userId, currentTask: {$exists: true}});
        if (trainingProgress) {
            taskclassId = trainingProgress.currentTask.taskclassId;
            learningtaskId = trainingProgress.currentTask.learningtaskId;
        }


        let instructions = Instructions.find().fetch();
        let instructionsDim = {};
        for (let i = 0; i < instructions.length; i++) {
            instructionsDim[i + 1] = instructions[i]['learningtasks'].length;
        }

        if (learningtaskId < instructionsDim[taskclassId]) {
            learningtaskId++;
        }
        else if (instructionsDim[taskclassId + 1]) {
            taskclassId++;
            learningtaskId = 1;
        }


        Meteor.call('updateTask', taskclassId, learningtaskId);

        return true;
    },
    updateTask: function (taskclassId, learningtaskId) {
        check(taskclassId, Match.Integer);
        check(learningtaskId, Match.Integer);

        if (this.userId) {
            if (TrainingProgress.findOne({_id: this.userId})) {
                TrainingProgress.update({_id: this.userId}, {
                    $set: {
                        currentTask: {
                            taskclassId: taskclassId,
                            learningtaskId: learningtaskId
                        }
                    }
                });
            } else {
                TrainingProgress.upsert({
                        _id: this.userId
                    }, {
                        $set: {
                            currentTask: {
                                taskclassId: taskclassId,
                                learningtaskId: learningtaskId
                            }
                        }
                    }
                );
            }
            return true;
        }
    },
    updateStats: function (taskclassId, learningtaskId, newStats) {
        check(taskclassId, Match.Integer);
        check(learningtaskId, Match.Integer);

        if (this.userId) {
            let trainingProgress = TrainingProgress.findOne({_id: this.userId});

            if (trainingProgress && trainingProgress.stats) {
                let stats = trainingProgress.stats;
                let pos = -1;

                //find existing stats of learning task
                for (let i = 0; i < stats.length; i++) {
                    if (stats[i].taskclassId === taskclassId && stats[i].learningtaskId === learningtaskId) {
                        pos = i;
                        break;
                    }
                }

                //update existing stats of learning task if found otherwise push new ones
                if (pos !== -1) {
                    stats[pos] = newStats;
                } else {
                    stats.push(newStats);
                }

                TrainingProgress.update({_id: this.userId}, {$set: {stats: stats}});
            } else {
                TrainingProgress.upsert({
                    _id: this.userId
                }, {
                    $set: {
                        stats: [newStats]
                    }
                });
            }
        }
    }
});