import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const Instructions = new Mongo.Collection('instructions');

if (Meteor.isServer) {
    Meteor.publish('instruction', function (taskclassId, learningtaskId) {
        return Instructions.find({"id": taskclassId, "learningtasks.id": learningtaskId}, {
            fields: {
                topic: 1,
                learningtasks: {$elemMatch: {id: learningtaskId}}
            }
        });
    });
    Meteor.publish('instructions', function () {
        return Instructions.find({}, {sort: {id: 1}});
    });

    Meteor.methods({
        'instructions.size': function () {
            let result = {};
            let mongoDocument = Instructions.find().fetch();
            for (let i = 0; i < mongoDocument.length; i++) {
                result[i + 1] = mongoDocument[i]['learningtasks'].length;
            }
            return result;
        }
    });
}


