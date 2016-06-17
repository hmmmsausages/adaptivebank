import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
import {Semantic} from 'meteor/semantic:ui-css';

import './account-summary.html';

Template.Account_summary.onRendered(function () {
    Meteor.defer(function () {
        $("#funds-info").popup();
    });
});