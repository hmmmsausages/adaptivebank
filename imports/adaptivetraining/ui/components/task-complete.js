import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {AdaptiveAdvice} from '../../api/adaptive-advice.js';

import {TrainingProgress} from '../../api/training-progress.js';
import {Instructions} from '../../api/instructions.js';

import './task-complete.html';

let handleTP = null;
let handleI = null;

Template.Task_complete.onCreated(function () {
    this.autorun(function () {
        handleTP = Meteor.subscribe('trainingProgress');
        handleI = Meteor.subscribe('instructions');
    });
});

Template.Task_complete.onRendered(function () {
    let trainingProgress = TrainingProgress.findOne();
    let taskclassId = 1;
    let learningtaskId = 1;

    if (trainingProgress) {
        taskclassId = trainingProgress.currentTask.taskclassId;
        learningtaskId = trainingProgress.currentTask.learningtaskId;
    }


    Meteor.call('updateStats', taskclassId, learningtaskId, {
        taskclassId: taskclassId,
        learningtaskId: learningtaskId,
        path: AdaptiveAdvice.path,
        timeUntilGoal: AdaptiveAdvice.timer,
        lastExecutionDate: new Date()
    });

    Meteor.call('insertTrainingStats', {
        taskclassId: taskclassId,
        learningtaskId: learningtaskId,
        idealPath: AdaptiveAdvice.idealPath,
        path: AdaptiveAdvice.path,
        limitOfAllowedPathAlterations: AdaptiveAdvice.limitOfAllowedPathAlterations,
        performedWell: AdaptiveAdvice.performedWell(),
        timeUntilGoal: AdaptiveAdvice.timer,
        timeLimit: AdaptiveAdvice.timeLimit,
        lastExecutionDate: new Date()
    });
});

Template.Task_complete.helpers({
    'notPerformedWell': function () {
        return !AdaptiveAdvice.performedWell();
    }
});

Template.Task_complete.events({
    'click #nextTask': function (e) {
        Meteor.call('nextTask', function (err, result) {
            if (result) {
                Session.set('currentTrainingView', 'Instruction_display');
            }
        });
    },
    'click #repeatTask': function (e) {
        Session.set('currentTrainingView', 'Instruction_display');
    }
});

Template.Task_complete.onDestroyed(function () {
    if (handleTP) {
        handleTP.stop();
    }
    if (handleI) {
        handleI.stop();
    }
});