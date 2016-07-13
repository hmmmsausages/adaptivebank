import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {Instructions} from '../../api/instructions.js';

import './instruction-display.html';

let taskclassID = new ReactiveVar(1);
let learningtaskID = new ReactiveVar(1);

Template.Instruction_display.onCreated(function trainingAddonBodyOnCreated() {
    this.autorun(function () {
        Meteor.subscribe('instructions', taskclassID.get(), learningtaskID.get());
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
    }
});