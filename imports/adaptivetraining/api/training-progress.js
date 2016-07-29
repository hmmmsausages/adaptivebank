import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

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

        let trainingProgress = TrainingProgress.findOne({_id: this.userId});
        if (trainingProgress) {
            taskclassId = trainingProgress.taskclassId;
            learningtaskId = trainingProgress.learningtaskId;
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


        TrainingProgress.upsert({_id: this.userId}, {
            taskclassId: taskclassId,
            learningtaskId: learningtaskId
        });

        return true;
    }
});