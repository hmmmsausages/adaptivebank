import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';

export let TaskEvaluation = {};

TaskEvaluation.observeTaskGoals = function (taskGoals) {
    check(taskGoals, {
        loggedIn: Match.Maybe(Boolean),
        path: Match.Maybe(String),
        query: Match.Maybe(String)
    });

    let loggedInGoalReached = true;
    if (taskGoals.loggedIn) {
        loggedInGoalReached = (Meteor.user() !== null) === taskGoals.loggedIn;
    }

    let pathGoalReached = true;
    if (taskGoals.path) {
        pathGoalReached = window.location.pathname === taskGoals.path;
    }

    let queryGoalReached = true;
    if (taskGoals.query) {
        queryGoalReached = eval(taskGoals.query).count() > 0;
    }

    return loggedInGoalReached && pathGoalReached && queryGoalReached;
};