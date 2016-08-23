import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {ReactiveVar} from 'meteor/reactive-var';
import {$} from 'meteor/jquery';
import {Session} from 'meteor/session';
import {FlowRouter} from 'meteor/kadira:flow-router';

import {TrainingProgress} from '../../api/training-progress.js'
import {Instructions} from '../../api/instructions.js';


import './instruction-display.html';

import {AdaptiveComplexity} from '../../api/adaptive-complexity.js';
import {AdaptiveAdvice} from '../../api/adaptive-advice.js';
import {TaskEvaluation} from '../../api/task-evaluation.js';

let id = new ReactiveDict();
let handleTP = null;
let handleI = null;

let prerequisitesSet = new ReactiveVar(false);


Template.Instruction_display.onCreated(function () {
    AdaptiveAdvice.resetParameter();
    prerequisitesSet.set(false);

    this.autorun(function () {
        handleTP = Meteor.subscribe('trainingProgress');
        if (handleTP.ready()) {
            let trainingProgress = TrainingProgress.findOne();

            id.set('taskclassId', 1);
            id.set('learningtaskId', 1);

            if (trainingProgress) {
                id.set('taskclassId', trainingProgress.currentTask.taskclassId);
                id.set('learningtaskId', trainingProgress.currentTask.learningtaskId);
            }

            handleI = Meteor.subscribe('instruction', id.get('taskclassId'), id.get('learningtaskId'));
            if (handleI.ready()) {
                // Get document of current learning task
                let mongoDocument = Instructions.findOne();
                let deactivatedElements = mongoDocument['learningtasks'][0]['deactivatedElements'].join(', ');
                let activatedElements = mongoDocument['learningtasks'][0]['activatedElements'].join(', ');
                let taskPrerequisites = mongoDocument['learningtasks'][0]['taskPrerequisites'];
                let timeLimit = mongoDocument['learningtasks'][0]['maxTimeForTaskInMS'];
                let taskGoals = mongoDocument['learningtasks'][0]['taskGoals'];
                let idealPath = mongoDocument['learningtasks'][0]['idealPath'];
                let limitOfAllowedPathAlterations = mongoDocument['learningtasks'][0]['limitOfAllowedPathAlterations'];


                // Apply task prerequisites
                if (!prerequisitesSet.get()) {
                    if (taskPrerequisites.path) {
                        if (window.location.pathname !== taskPrerequisites.path) {
                            FlowRouter.go(taskPrerequisites.path);
                        }
                    }
                    if (taskPrerequisites.queries) {
                        for (let i = 0; i < taskPrerequisites.queries.length; i++) {
                            eval(taskPrerequisites.queries[i]);
                        }
                    }
                    prerequisitesSet.set(true);
                }



                //======
                // Apply AdaptiveComplexity and AdaptiveAdvice components respectively
                AdaptiveComplexity.apply({
                    deactivatedElements: deactivatedElements,
                    activatedElements: activatedElements
                });
                AdaptiveAdvice.apply(idealPath, limitOfAllowedPathAlterations, timeLimit);

                if (TaskEvaluation.observeTaskGoals(taskGoals)) {
                    Session.set('currentTrainingView', 'Task_complete');
                }
                //=====

                //disconnect previous MutationObserver instance if existent
                if (Template.Instruction_display.observer) {
                    Template.Instruction_display.observer.disconnect();
                }
                // MutationObserver for Subtree changes
                Template.Instruction_display.observer = new MutationObserver(function () {
                    // Apply AdaptiveComplexity and AdaptiveAdvice components respectively
                    AdaptiveComplexity.apply({
                        deactivatedElements: deactivatedElements,
                        activatedElements: activatedElements
                    });
                    AdaptiveAdvice.apply(idealPath, limitOfAllowedPathAlterations, timeLimit);
                    if (TaskEvaluation.observeTaskGoals(taskGoals)) {
                        Session.set('currentTrainingView', 'Task_complete');
                    }
                });

                // Start observer
                Template.Instruction_display.observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
        }
    });
});

Template.Instruction_display.onDestroyed(function () {
    //unsubscribe from subscription
    if (handleTP) {
        handleTP.stop();
    }
    if (handleI) {
        handleI.stop();
    }
    //disconnect remaining MutationObserver instance if existent
    if (Template.Instruction_display.observer) {
        Template.Instruction_display.observer.disconnect();
    }

    //stop adaptive components
    AdaptiveAdvice.stop();
    AdaptiveComplexity.reset();
});


Template.Instruction_display.helpers({
    instructions() {
        return Instructions.find();
    }
});

Template.Instruction_display.events({
    'click #task-overview': function () {
        Session.set('currentTrainingView', 'Task_overview');
    },
    'click #restart-task': function () {
        //Reset adaptive advice parameters and apply task prerequisites again
        AdaptiveAdvice.resetParameter();
        prerequisitesSet.set(false);
    }
});