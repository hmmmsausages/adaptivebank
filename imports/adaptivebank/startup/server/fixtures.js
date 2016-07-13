import {Clients} from '../../api/clients/clients.js'
import {Meteor} from 'meteor/meteor';

Meteor.startup(() => {
    // add test user
    if (!Accounts.findUserByUsername("123456789")) {
        Accounts.createUser({
            username: "123456789",
            email: "test@andremueller.me",
            password: "testtest",
            profile: {
                name: 'Peter Smith',
                title: 'Mr',
                dob: '1980-01-01',
                lastlogin: new Date().toString(),
                address: '1 Flat Tyre Road, London, SE1 APF, United Kingdom',
                telephone: '079123456',
                account: {
                    name: 'Current Account',
                    number: '123456789',
                    sortcode: '12-34-56',
                    type: 'current',
                    irate: 0.01,
                    overdraft: 0,
                    balance: 123.45,
                    available: 120.45,
                }
            }
        });
    }
});