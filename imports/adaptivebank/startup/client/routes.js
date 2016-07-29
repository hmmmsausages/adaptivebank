import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';


// Import to load these templates
import '../../ui/layout/app-body.js';
import '../../ui/components/navbar-login.js';
import '../../ui/components/frontpage.js';
import '../../ui/components/account-summary.js';
import '../../ui/components/account-statement.js';
import '../../ui/components/payment.js';
import '../../ui/pages/app-not-found.js';

// Import to override user_accounts templates
import '../../ui/user_accounts/user-accounts-templates.js';

FlowRouter.route('/', {
    name: 'App.frontpage',
    action() {
        if (Meteor.userId()) {
            FlowRouter.go('App.account-summary');
        } else {
            BlazeLayout.render('App_body', {main: 'Frontpage'});
        }
    }
});

FlowRouter.route('/account-summary', {
    triggersEnter: [checkedLoggedIn],
    name: 'App.account-summary',
    action() {
        BlazeLayout.render('App_body', {main: 'Account_summary'});
    }
});

FlowRouter.route('/account-statement', {
    triggersEnter: [checkedLoggedIn],
    name: 'App.account-statement',
    action() {
        BlazeLayout.render('App_body', {main: 'Account_statement'});
    }
});

FlowRouter.route('/payment', {
    triggersEnter: [checkedLoggedIn],
    name: 'App.payment',
    action() {
        BlazeLayout.render('App_body', {main: 'Payment'});
    }
});


FlowRouter.notFound = {
    action(){
        BlazeLayout.render('App_body', {main: 'App_notFound'});
    }
};

FlowRouter.route('/login', {
    name: 'App.login',
    action() {
        BlazeLayout.render('App_body', {main: 'Login'});
    }
});


function checkedLoggedIn() {
    if (!Meteor.userId()) {
        FlowRouter.go('App.login');
    }
}

