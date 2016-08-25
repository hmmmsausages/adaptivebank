import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {$} from 'meteor/jquery';
import {ReactiveVar} from 'meteor/reactive-var';

import './payment.html';
import './account-info-block.js';

//Import profile methods
import '../../api/profile.js';

let notEnoughFunds = new ReactiveVar(false);
let transactionExecuted = new ReactiveVar(false);

Template.Payment.onRendered(function () {

    Meteor.defer(function () {
        $('select.dropdown').dropdown();
        $('.ui.radio.checkbox').checkbox();
        $('.ui.form').form({
            fields: {
                recipient: {
                    identifier: 'recipient',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Please choose a recipient'
                        }
                    ]
                },
                amount: {
                    identifier: 'amount',
                    rules: [
                        {
                            type: 'regExp[/^[1-9]\\d*(\\.[0-9]{0,2})?$/]',
                            prompt: 'Please enter a valid amount'
                        }
                    ]
                }
            }
        });
    });
});

Template.Payment.events({
    "submit .ui.form"(e){
        e.preventDefault();
        let recipient = e.target.recipient.value.split("/");
        let newTransaction = {
            date: new Date().toString(),
            out: parseFloat(e.target.amount.value).toFixed(2),
            type: "TRANS",
            description: e.target.reference.value,
            recipientNumber: recipient[0],
            recipient: recipient[1]
        };


        Meteor.call('addTransaction', newTransaction, function (err, res) {
            if (err) {
                notEnoughFunds.set(true);
            } else {
                transactionExecuted.set(true);
            }
        });
    }
});

Template.Payment.helpers({
    'recipients'(){
        return Meteor.user().profile.recipients;
    },
    'notEnoughFunds'(){
        return notEnoughFunds.get();
    },
    'transactionExecuted'(){
        return transactionExecuted.get();
    }
});

Template.Payment.onDestroyed(function () {
    notEnoughFunds.set(false);
    transactionExecuted.set(false);
});