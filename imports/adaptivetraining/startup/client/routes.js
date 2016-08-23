import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {Roles} from 'meteor/alanning:roles';
import {Tracker} from 'meteor/tracker';


// Import to load these templates
import '../../ui/layout/training-addon-body.js';
import '../../ui/components/instruction-welcome.js';
import '../../ui/components/instruction-display.js';
import '../../ui/components/task-complete.js';
import '../../ui/components/task-overview.js';
import '../../ui/pages/stats-overview.js';

FlowRouter.wait();

// Wait until subscription to Roles is ready before route entry trigger can be checked securely
Tracker.autorun(function () {
    if (Roles.subscription.ready() && !FlowRouter._initialized) {
        FlowRouter.initialize()
    }
});

FlowRouter.route('/stats-overview', {
    triggersEnter: [checkedLoggedInAndAdmin],
    name: 'App.training-stats',
    action() {
        BlazeLayout.render('App_body', {main: 'Stats_overview'});
    }
});


function checkedLoggedInAndAdmin() {
    if (!Roles.userIsInRole(Meteor.userId(), ["admin"])) {
        FlowRouter.go('App.login');
    }
}