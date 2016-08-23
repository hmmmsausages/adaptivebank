import {$} from 'meteor/jquery';
import {check, Match} from 'meteor/check';

export let AdaptiveAdvice = {};

function linkClicked(e) {
    AdaptiveAdvice.path.push($.trim($(this).attr('id') ? $(this).attr('id') : $(this).text()));
}

AdaptiveAdvice.idealPath = [];
AdaptiveAdvice.limitOfAllowedPathAlterations = -1;
AdaptiveAdvice.path = [];
AdaptiveAdvice.timeLimit = -1;
AdaptiveAdvice.timer = 0;

AdaptiveAdvice.apply = function (idealPath, limitOfAllowedPathAlterations, timeLimit) {
    if (idealPath) {
        check(idealPath, [String]);
        AdaptiveAdvice.idealPath = idealPath;
    } else {
        AdaptiveAdvice.idealPath = [];
    }

    if (limitOfAllowedPathAlterations) {
        check(limitOfAllowedPathAlterations, Match.Integer);
        AdaptiveAdvice.limitOfAllowedPathAlterations = limitOfAllowedPathAlterations;
    } else {
        AdaptiveAdvice.limitOfAllowedPathAlterations = -1;
    }

    if (timeLimit) {
        check(timeLimit, Match.Integer);
        AdaptiveAdvice.timeLimit = timeLimit;
    } else {
        AdaptiveAdvice.timeLimit = -1;
    }

    $('a').unbind('click', linkClicked);
    $('a').bind('click', linkClicked);
};

AdaptiveAdvice.stop = function () {
    $('a').unbind('click', linkClicked);
    AdaptiveAdvice.timer = new Date() - AdaptiveAdvice.timer;
};

AdaptiveAdvice.resetParameter = function () {
    AdaptiveAdvice.idealPath = [];
    AdaptiveAdvice.limitOfAllowedPathAlterations = -1;
    AdaptiveAdvice.path = [];
    AdaptiveAdvice.timer = new Date();
};


AdaptiveAdvice.performedWell = function () {
    if (AdaptiveAdvice.limitOfAllowedPathAlterations < 0 && AdaptiveAdvice.timer < 0) {
        return true;
    } else {
        return (levenshteinDistance(AdaptiveAdvice.path, AdaptiveAdvice.idealPath) <= AdaptiveAdvice.limitOfAllowedPathAlterations) && (AdaptiveAdvice.timer < AdaptiveAdvice.timeLimit);
    }
};


/*
 Levenshtein distance algorithm implementation adopted from and adjusted based on the works of
 Sten Hjelmqvist's (2012) implementation to be found at
 "http://www.codeproject.com/Articles/13525/Fast-memory-efficient-Levenshtein-algorithm" (retrieved on 22/07/2016)
 */
function levenshteinDistance(string1, string2) {
    check(string1, Match.OneOf(String, [String]));
    check(string2, Match.OneOf(String, [String]));

    // simple cases
    if (JSON.stringify(string1) === JSON.stringify(string2)) {
        return 0;
    }
    if (string1.length === 0) {
        return string2.length;
    }
    if (string2.length === 0) {
        return string1.length;
    }

    // declare work vectors
    let v0 = new Array(string2.length + 1);
    let v1 = new Array(string2.length + 1);

    // init v0
    // with edit distance of empty string2
    for (let i = 0; i < v0.length; i++) {
        v0[i] = i;
    }

    for (let i = 0; i < string1.length; i++) {
        // calculate v1 (current row distances) from the previous row v0

        // first element of v1 is A[i+1][0]
        //   edit distance is delete (i+1) chars from s to match empty t
        v1[0] = i + 1;

        // use formula to fill in the rest of the row
        for (let j = 0; j < string2.length; j++) {
            let cost = (string1[i] === string2[j]) ? 0 : 1;
            v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
        }

        // copy v1 (current row) to v0 (previous row) for next iteration
        for (let j = 0; j < v0.length; j++) {
            v0[j] = v1[j];
        }
    }

    return v1[string2.length];
};
