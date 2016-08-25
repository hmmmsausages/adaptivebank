import {Meteor} from 'meteor/meteor';

Meteor.methods({
    'addTransaction': function (newTransaction) {
        let newBalance = (Meteor.user().profile.account.balance - newTransaction.out).toFixed(2);
        if ((newBalance + Meteor.user().profile.account.overdraft) < 0) {
            throw new Error('Not enough funds available');
        } else {
            newTransaction.balance = newBalance;
            Meteor.users.update({_id: Meteor.userId()}, {
                $push: {
                    'profile.transactions': {
                        $each: [newTransaction],
                        $position: 0
                    }
                }
            });
            Meteor.users.update({_id: Meteor.userId()}, {
                $set: {
                    'profile.account.balance': newBalance,
                    'profile.account.available': newBalance
                }
            });
        }
    }
});