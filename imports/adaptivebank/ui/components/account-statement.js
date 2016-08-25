import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

import './account-statement.html';
import './account-info-block.js'


Template.Account_statement.helpers({
    'transactions': function () {
        return Meteor.user().profile.transactions;
    }
});