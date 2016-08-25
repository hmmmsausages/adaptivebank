import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {ReactiveVar} from 'meteor/reactive-var';


import {TrainingStats} from '../../api/training-stats.js';

import './stats-overview.html';

let worstPerformedTaskVar = new ReactiveDict();
let bestPerformedTaskVar = new ReactiveDict();
let mostPerformedTaskVar = new ReactiveDict();
let avgTimePerTask = new ReactiveVar();

Template.Stats_overview.onCreated(function () {
    Meteor.subscribe('trainingStats');
    worstPerformedTaskVar.set('taskclassId', 0);
    worstPerformedTaskVar.set('learningtaskId', 0);
    bestPerformedTaskVar.set('taskclassId', 0);
    bestPerformedTaskVar.set('learningtaskId', 0);
    mostPerformedTaskVar.set('taskclassId', 0);
    mostPerformedTaskVar.set('learningtaskId', 0);
    avgTimePerTask.set(0);
});

Template.Stats_overview.helpers({
    'countOfCompletedTasks': function () {
        return TrainingStats.find().count();
    },
    'countOfWellPerformedTasks': function () {
        return TrainingStats.find({performedWell: true}).count();
    },
    'worstPerformedTask': function () {
        Meteor.call('worstPerformedTask', function (err, res) {
            if (res.length > 0) {
                worstPerformedTaskVar.set('taskclassId', res[0]._id.taskclassId);
                worstPerformedTaskVar.set('learningtaskId', res[0]._id.learningtaskId);
            }
        });
        return {
            taskclassId: worstPerformedTaskVar.get('taskclassId'),
            learningtaskId: worstPerformedTaskVar.get('learningtaskId')
        };
    },
    'bestPerformedTask': function () {
        Meteor.call('bestPerformedTask', function (err, res) {
            if (res.length > 0) {
                bestPerformedTaskVar.set('taskclassId', res[0]._id.taskclassId);
                bestPerformedTaskVar.set('learningtaskId', res[0]._id.learningtaskId);
            }
        });
        return {
            taskclassId: bestPerformedTaskVar.get('taskclassId'),
            learningtaskId: bestPerformedTaskVar.get('learningtaskId')
        };
    },
    'avgTimePerTask': function () {
        Meteor.call('avgTimePerTask', function (err, res) {
            if (res.length > 0) {
                avgTimePerTask.set(res[0].avgTimePerTask);
            }
        });
        return avgTimePerTask.get();
    },
    'mostPerformedTask': function () {
        Meteor.call('mostPerformedTask', function (err, res) {
            if (res.length > 0) {
                mostPerformedTaskVar.set('taskclassId', res[0]._id.taskclassId);
                mostPerformedTaskVar.set('learningtaskId', res[0]._id.learningtaskId);
            }
        });
        return {
            taskclassId: mostPerformedTaskVar.get('taskclassId'),
            learningtaskId: mostPerformedTaskVar.get('learningtaskId')
        };
    },
    'trainingStats': function () {
        return TrainingStats.find({}, {sort: {taskclassId: 1, learningtaskId: 1, lastExecutionDate: -1}});
    },
    'formatTime': function (sec) {
        return Math.round((sec / 1000 + 0.00001) * 100) / 100;
    }
});