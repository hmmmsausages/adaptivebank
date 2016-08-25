import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {$} from 'meteor/jquery';

import './account-info-block.html';

Template.Account_info_block.onRendered(function () {
    Meteor.defer(function () {
        $("#funds-info").popup();
    });
});