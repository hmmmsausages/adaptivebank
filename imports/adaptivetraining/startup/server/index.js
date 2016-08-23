import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';

// Import collections and make them available for the clients
import {TrainingProgress} from '../../api/training-progress.js';
import {Instructions} from '../../api/instructions.js';
import {TrainingStats} from '../../api/training-stats.js';


Meteor.startup(function () {
    const adminUserName = "trainingAdmin";

    // Load JSON data into collection 'Instructions' if collection is empty.
    if (Instructions.find().count() === 0) {
        console.log("Instructions could not be found!\nImporting private/instructions.json to DB")

        let data = JSON.parse(Assets.getText("instructions.json"));

        _.each(data, function (document) {
            Instructions.insert(document);
        });
    }

    if (!Meteor.users.findOne({username: adminUserName})) {
        console.log("Administrator account for Adaptive Training Add-on \"" + adminUserName + "\" could not be found. New admin is generated...");
        Accounts.createUser({
            username: adminUserName,
            password: adminUserName
        });

        const userId = Meteor.users.findOne({username: adminUserName})._id;
        Roles.addUsersToRoles(userId, ['admin']);
    }
});

