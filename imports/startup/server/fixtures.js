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
                // profile details
            }
        });
    }
    if (Clients.find().count() === 0) {
        const data = [
            {
                name: 'John Doe',
                title: 'Mr',
                dob: '1980-01-01',
                address: '1 Flat Tyre Road, London, SE1 APF, United Kingdom',
                telephone: '0749123456',
                accounts: [
                    {
                        name: 'Current Account',
                        number: '123456789',
                        sortcode: '12-34-56',
                        type: 'current',
                        irate: 0.01,
                        overdraft: 0,
                        balance: 123.45,
                        available: 120.45,
                    },
                    {
                        name: 'Savings Account',
                        number: '987654321',
                        sortcode: '12-34-56',
                        type: 'savings',
                        irate: 0.01,
                        overdraft: 0,
                        balance: 123.45,
                        available: 120.45,
                    },
                ],
            }

        ];

        data.forEach((client) => {
            Clients.insert({
                name: client.name,
                title: client.title,
                dob: client.dob,
                address: client.address,
                telephone: client.telephone,
                accounts: client.accounts,
            });
        });
    }
});