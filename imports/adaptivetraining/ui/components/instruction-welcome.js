import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import './instruction-welcome.html';


Template.Instruction_welcome.events({
    'click #taskOverviewButton': function () {
        Session.set('currentTrainingView', 'Task_overview');
    },
    'click #continueButton': function () {
        Session.set('currentTrainingView', 'Instruction_display');
    }
});