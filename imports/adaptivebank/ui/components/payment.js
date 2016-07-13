import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
import {Semantic} from 'meteor/semantic:ui-css';

import './payment.html';
import './account-info-block.js';

Template.Payment.onRendered(function () {
    Meteor.defer(function () {
        $('select.dropdown').dropdown();
        $('.ui.radio.checkbox').checkbox();
    });
});