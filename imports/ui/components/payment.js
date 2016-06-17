import './payment.html';

import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
import {Semantic} from 'meteor/semantic:ui-css';

Template.Payment.onRendered(function () {
    Meteor.defer(function () {
        $("#funds-info").popup();
        $('select.dropdown').dropdown();
        $('.ui.radio.checkbox').checkbox();
    });
});