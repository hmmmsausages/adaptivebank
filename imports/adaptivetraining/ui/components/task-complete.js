import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {AdaptiveAdvice} from '../../api/adaptive-advice.js';

import {TrainingProgress} from '../../api/training-progress.js';
import {Instructions} from '../../api/instructions.js';

import './task-complete.html';

Template.Task_complete.onCreated(function () {
    this.autorun(function () {
        Meteor.subscribe('trainingProgress');
        Meteor.subscribe('instructions');
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
                console.log("back to instructions display");
                Session.set('currentTrainingView', 'Instruction_display');
            }
        });
    },
    'click #repeatTask': function (e) {
        Session.set('currentTrainingView', 'Instruction_display');
    }
});