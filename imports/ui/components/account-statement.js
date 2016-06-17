import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
import {Semantic} from 'meteor/semantic:ui-css';

import './account-statement.html';

Template.Account_statement.onRendered(function () {
    Meteor.defer(function () {
        $("#funds-info").popup();
    });
});