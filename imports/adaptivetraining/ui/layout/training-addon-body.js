import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
import {Template} from 'meteor/templating';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {Session} from 'meteor/session';

import './training-addon-body.html';

import '../components/instruction-welcome.js';


Template.Training_addon_body.onCreated(function () {
    Session.set('currentTrainingView', 'Instruction_welcome');
});

Template.Training_addon_body.onRendered(function () {
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
        if (Session.get('currentTrainingView') === 'Task_complete') {
            $('#training-content').show(200);
        }
        return Session.get('currentTrainingView');
    }
});

