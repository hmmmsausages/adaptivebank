import './app-body.html';

import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';


Template.App_body.events({
    'click .logout-link': function (e) {
        e.preventDefault();
        Meteor.users.update(Meteor.userId(), {$set: {"profile.lastlogin": new Date().toString()}});
        Meteor.logout(function () {
            FlowRouter.go('App.frontpage');
        });
    }
});