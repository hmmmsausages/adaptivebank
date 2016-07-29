import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

import {Instructions} from '../../api/instructions.js';

import './task-overview.html';

Template.Task_overview.onCreated(function () {
    Meteor.subscribe('instructions');
});


Template.Task_overview.helpers({
    'instructions': function () {
        return Instructions.find();
    }
});

Template.Task_overview.events({
    'click .item': function () {
        //todo insert functionality
    }
});
