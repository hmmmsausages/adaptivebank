import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {$} from 'meteor/jquery';
import {Session} from 'meteor/session';

import {TrainingProgress} from '../../api/training-progress.js'
import {Instructions} from '../../api/instructions.js';


import './instruction-display.html';

import {AdaptiveComplexity} from '../../api/adaptive-complexity.js';
import {AdaptiveAdvice} from '../../api/adaptive-advice.js';
import {TaskEvaluation} from '../../api/task-evaluation.js';


Template.Instruction_display.onCreated(function () {
    AdaptiveAdvice.resetParameter();

    this.autorun(function () {

        if (Meteor.subscribe('trainingProgress').ready()) {
            let trainingProgress = TrainingProgress.findOne();

            let taskclassId = 1;
            let learningtaskId = 1;

            if (trainingProgress) {
                taskclassId = trainingProgress.taskclassId;
                learningtaskId = trainingProgress.learningtaskId;
            }

            if (Meteor.subscribe('instruction', taskclassId, learningtaskId).ready()) {
                // Get document of current learning task
                let mongoDocument = Instructions.findOne();
                let deactivatedElements = mongoDocument['learningtasks'][0]['deactivatedElements'].join(', ');
                let activatedElements = mongoDocument['learningtasks'][0]['activatedElements'].join(', ');
                let taskGoals = mongoDocument['learningtasks'][0]['taskGoals'];
                let idealPath = mongoDocument['learningtasks'][0]['idealPath'];
                let limitOfAllowedPathAlterations = mongoDocument['learningtasks'][0]['limitOfAllowedPathAlterations'];

                console.log(deactivatedElements, activatedElements, taskGoals, idealPath, limitOfAllowedPathAlterations);

                //======
                // Apply AdaptiveComplexity and AdaptiveAdvice components respectively
                AdaptiveComplexity.apply({
                    deactivatedElements: deactivatedElements,
                    activatedElements: activatedElements
                });
                AdaptiveAdvice.apply(idealPath, limitOfAllowedPathAlterations);

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
                    AdaptiveAdvice.apply(idealPath, limitOfAllowedPathAlterations);
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
    //disconnect remaining MutationObserver instance if existent
    if (Template.Instruction_display.observer) {
        Template.Instruction_display.observer.disconnect();
    }

    //reset adaptive components
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
    }
});