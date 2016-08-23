import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
import {Semantic} from 'meteor/semantic:ui-css';
import {FlowRouter} from 'meteor/kadira:flow-router';

import './account-statement.html';
import './account-info-block.js'


Template.Account_statement.helpers({
    'transactions': function () {
        return Meteor.user().profile.transactions;
    }
});