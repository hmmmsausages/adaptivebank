import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor';

import './user-accounts-templates.html';

Template.Login.events({
    'submit form': function (event) {
        event.preventDefault();

        const userIdVar = event.target.userId.value;
        const passwordVar = event.target.password.value;

        if (userIdVar && passwordVar) {
            Meteor.loginWithPassword(userIdVar, passwordVar, function (err) {
                if (err) {
                    console.log("login failed");
                } else {
                    FlowRouter.go('App.account-summary');
                }
            });
        }
    }
});