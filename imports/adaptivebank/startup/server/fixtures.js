import {Clients} from '../../api/clients/clients.js'
import {Meteor} from 'meteor/meteor';

Meteor.startup(() => {
    // add test user
    if (!Accounts.findUserByUsername("123456789")) {
        console.log("Standard user '123456789' / 'testtest' can't be found. New standard users is created!");
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
                    available: 123.45,
                },
                recipients: [
                    {
                        name: "Peter York",
                        number: "4536483648",
                        sortcode: "60-60-04"
                    },
                    {
                        name: "Robert Hope",
                        number: "6379272829",
                        sortcode: "56-36-78"
                    }
                ],
                transactions: [
                    {
                        date: new Date(2016, 3, 24, 12, 45, 23, 3).toString(),
                        out: 12.00,
                        type: "TRANS",
                        description: "Cheese",
                        balance: 123.45,
                        recipientNumber: "54729429273",
                        recipient: "Peter York"
                    },
                    {
                        date: new Date(2016, 3, 22, 11, 4, 3, 1).toString(),
                        out: 25.00,
                        type: "DEB",
                        description: "Sainsburys",
                        balance: 135.45,
                        recipientNumber: "56478976",
                        recipient: "Sainsburys"
                    }
                ]
            }
        });
    }
});