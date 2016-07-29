import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {AdaptiveAdvice} from '../../api/adaptive-advice.js';
import {AdaptiveComplexity} from '../../api/adaptive-complexity.js';

import './instruction-welcome.html';

//This route needs to point to the corresponding login page of the App, in this case 'App.login'
Template.Instruction_welcome.login_route = 'App.login';

Template.Instruction_welcome.events({
    'click #startNewButton': function () {
        Session.set('currentTrainingView', 'Instruction_display');
    },
    'click #continueButton': function () {
        FlowRouter.go(Template.Instruction_welcome.login_route);
    }
});