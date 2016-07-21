import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {$} from 'meteor/jquery';
import {Tracker} from 'meteor/tracker';

import {Instructions} from '../../api/instructions.js';

import './instruction-display.html';

import {AdaptiveComplexity} from '../../api/adaptive-complexity.js';
import {AdaptiveAdvice} from '../../api/adaptive-advice.js';

let taskclassID = new ReactiveVar(1);
let learningtaskID = new ReactiveVar(1);
let deactivatedElements = "";
let activatedElements = "";

Template.Instruction_display.onCreated(function () {
    Tracker.autorun(function () {
        Meteor.subscribe('instructions', taskclassID.get(), learningtaskID.get());

        // Get document of current learning task
        let mongoDocument = Instructions.find().fetch()[0];
        if (mongoDocument) {
            deactivatedElements = mongoDocument['learningtasks'][0]['deactivatedElements'].join(', ');
            activatedElements = mongoDocument['learningtasks'][0]['activatedElements'].join(', ');
        }

        // MutationObserver for Subtree changes
        let observer = new MutationObserver(function () {
            // Reset complexity of previous learning task
            AdaptiveComplexity.reset();
            AdaptiveAdvice.reset();


            // Apply AdaptiveComplexity and AdaptiveAdvice components respectively
            AdaptiveComplexity.apply({
                deactivatedElements: deactivatedElements,
                activatedElements: activatedElements
            });
            AdaptiveAdvice.apply();
        });

        // Start observer
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
});


Template.Instruction_display.helpers({
    instructions() {
        return Instructions.find();
    }
});

Template.Instruction_display.events({
    'click #next-lesson': function (e) {
        learningtaskID.set(learningtaskID.get() + 1);
    },
    'click #previous-lesson': function (e) {
        learningtaskID.set(learningtaskID.get() - 1);
    }
});