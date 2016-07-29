import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
import {Template} from 'meteor/templating';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';

import './training-addon-body.html';

import '../components/instruction-welcome.js';


Template.Training_addon_body.onCreated(function () {
    Session.set('currentTrainingView', 'Instruction_welcome');


    Tracker.autorun(function () {
        if (!Meteor.userId()) {
            Session.set('currentTrainingView', 'Instruction_welcome');
        } else {
            Session.set('currentTrainingView', 'Instruction_display');
        }
    });
});

Template.Training_addon_body.onRendered(function () {
    //TODO: Resolve sidebar issues and JS errors with pusher class
    Meteor.defer(function () {
        $('.ui.sidebar').sidebar({
            transition: 'overlay',
            closable: false,
            dimPage: false,
        }).sidebar('show');

        $('#toggle-sidebar').click(function () {
            $('#training-content').toggle(200);
            $('#toggle-symbol').toggleClass("up down");
        });

        $('#training-content').toggle();
    });
});

Template.Training_addon_body.helpers({
    'trainingView': function () {
        return Session.get('currentTrainingView');
    }
});

