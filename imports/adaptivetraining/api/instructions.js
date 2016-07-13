import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const Instructions = new Mongo.Collection('instructions');

if (Meteor.isServer) {
    Meteor.publish('instructions', function instructionsPublication(taskclassID, learningtaskID) {
        // check(taskclassID,Integer);
        // check(learningtaskID,Integer);
        // Returns only document with learningtasks.id==1 from task class with id==1
        //todo make return statement dependent on learners progress
        return Instructions.find({"id": taskclassID, "learningtasks.id": learningtaskID}, {
            fields: {
                topic: 1,
                learningtasks: {$elemMatch: {id: learningtaskID}}
            }
        });
    });
}
