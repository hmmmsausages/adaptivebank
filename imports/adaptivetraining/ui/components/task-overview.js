import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {$} from 'meteor/jquery';

import {Instructions} from '../../api/instructions.js';
import {TrainingProgress} from '../../api/training-progress.js';

import './task-overview.html';

let handleI = null;
let handleTP = null;

Template.Task_overview.onCreated(function () {
    this.autorun(function () {
        handleI = Meteor.subscribe('instructions');
        handleTP = Meteor.subscribe('trainingProgress');
    });
});


Template.Task_overview.helpers({
    'instructions': function () {
        return Instructions.find({}, {sort: {id: 1}});
    },
    'isCurrentTask': function (taskclassId, learningtaskId) {
        let documentTP = TrainingProgress.findOne();
        if (documentTP) {
            if (documentTP.currentTask.taskclassId == taskclassId && documentTP.currentTask.learningtaskId == learningtaskId) {
                return true;
            }
        }
        return false;
    }
});

Template.Task_overview.events({
    'click .item.learningtask-js': function (e) {
        let idArr = $(e.target).attr("data-id").split("-");
        let taskclassId = parseInt(idArr[0]);
        let learningtaskId = parseInt(idArr[1]);

        Meteor.call('updateTask', taskclassId, learningtaskId, function (err, result) {
            if (result) {
                Session.set('currentTrainingView', 'Instruction_display');
            }
        });
    },
    'click #back-to-instruction-js': function () {
        Session.set('currentTrainingView', 'Instruction_display');
    }
});


Template.Task_overview.onDestroyed(function () {
    if (handleI) {
        handleI.stop();
    }
    if (handleTP) {
        handleTP.stop();
    }
});