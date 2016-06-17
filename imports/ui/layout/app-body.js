import './app-body.html';

import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';


Template.App_body.events({
    'click .logout-link': function (event) {
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('App.frontpage');
    }
});