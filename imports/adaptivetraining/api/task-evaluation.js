import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';

export let TaskEvaluation = {};

TaskEvaluation.observeTaskGoals = function (taskGoals) {
    check(taskGoals, {
        path: Match.Maybe(String),
        queries: Match.Maybe([String])
    });

    let pathGoalReached = true;
    if (taskGoals.path) {
        pathGoalReached = window.location.pathname === taskGoals.path;
    }

    let queryGoalReached = true;
    if (taskGoals.queries) {
        for (let i = 0; i < taskGoals.queries.length; i++) {
            if (eval(taskGoals.queries[i]).count() <= 0) {
                queryGoalReached = false;
                break;
            }
        }
    }

    return pathGoalReached && queryGoalReached;
};