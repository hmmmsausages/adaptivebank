import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
import {Template} from 'meteor/templating';

import './training-addon-body.html';

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
    });
});