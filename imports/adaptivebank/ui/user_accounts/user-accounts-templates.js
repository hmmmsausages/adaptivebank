import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {$} from 'meteor/jquery';
import './user-accounts-templates.html';


Template.Login.events({
    'submit form': function (event) {
        event.preventDefault();

        const userIdVar = event.target.userId.value;
        const passwordVar = event.target.password.value;

        if (userIdVar && passwordVar) {
            Meteor.loginWithPassword(userIdVar, passwordVar, function (err) {
                if (err) {
                    $("#failed-login-msg-js").toggleClass('hidden');
                } else {
                    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
                        FlowRouter.go('App.training-stats');
                    } else {
                        FlowRouter.go('App.account-summary');
                    }
                }
            });
        }
    }
});