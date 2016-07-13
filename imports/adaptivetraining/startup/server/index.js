import {Meteor} from 'meteor/meteor';
import {Instructions} from '../../api/instructions.js';


Meteor.startup(() => {
    // Load JSON data into collection 'Instructions' if collection is empty.
    if (Instructions.find().count() === 0) {
        console.log("Instructions could not be found!\nImporting private/instructions.json to DB")

        let data = JSON.parse(Assets.getText("instructions.json"));

        _.each(data, function (document) {
            Instructions.insert(document);
        });
    }
});
