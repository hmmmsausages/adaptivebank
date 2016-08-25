import {chai} from 'meteor/practicalmeteor:chai';

import {AdaptiveAdvice} from './adaptive-advice.js';


describe('AdaptiveAdvice', function () {
    afterEach(function () {
        AdaptiveAdvice.resetParameter();
    });

    it('sets "idealPath", "limitOfAllowedPathAlterations" and "timeLimit" correctly.', function () {
        let idealPath = ["test"];
        let limitOfAllowedPathAlterations = 10;
        let timeLimit = 20;

        AdaptiveAdvice.apply({
            idealPath: idealPath,
            limitOfAllowedPathAlterations: limitOfAllowedPathAlterations,
            timeLimit: timeLimit
        });
        chai.assert.equal(AdaptiveAdvice.idealPath, idealPath);
        chai.assert.equal(AdaptiveAdvice.limitOfAllowedPathAlterations, limitOfAllowedPathAlterations);
        chai.assert.equal(AdaptiveAdvice.timeLimit, timeLimit);

        AdaptiveAdvice.apply();
        chai.assert.equal(AdaptiveAdvice.idealPath.length, 0);
        chai.assert.equal(AdaptiveAdvice.limitOfAllowedPathAlterations, Infinity);
        chai.assert.equal(AdaptiveAdvice.timeLimit, Infinity);

        AdaptiveAdvice.apply({idealPath: idealPath});
        chai.assert.equal(AdaptiveAdvice.idealPath, idealPath);
        chai.assert.equal(AdaptiveAdvice.limitOfAllowedPathAlterations, Infinity);
        chai.assert.equal(AdaptiveAdvice.timeLimit, Infinity);

        AdaptiveAdvice.apply({idealPath: idealPath, limitOfAllowedPathAlterations: limitOfAllowedPathAlterations});
        chai.assert.equal(AdaptiveAdvice.idealPath, idealPath);
        chai.assert.equal(AdaptiveAdvice.limitOfAllowedPathAlterations, limitOfAllowedPathAlterations);
        chai.assert.equal(AdaptiveAdvice.timeLimit, Infinity);

        AdaptiveAdvice.apply({idealPath: idealPath, timeLimit: timeLimit});
        chai.assert.equal(AdaptiveAdvice.idealPath, idealPath);
        chai.assert.equal(AdaptiveAdvice.limitOfAllowedPathAlterations, Infinity);
        chai.assert.equal(AdaptiveAdvice.timeLimit, timeLimit);

        AdaptiveAdvice.apply({timeLimit: timeLimit});
        chai.assert.equal(AdaptiveAdvice.idealPath.length, 0);
        chai.assert.equal(AdaptiveAdvice.limitOfAllowedPathAlterations, Infinity);
        chai.assert.equal(AdaptiveAdvice.timeLimit, timeLimit);
    });

    it('returns correct "performedWell" result (path only)', function () {
        let idealPath = ["test"];
        let limitOfAllowedPathAlterations = 1;

        AdaptiveAdvice.apply({idealPath: idealPath, limitOfAllowedPathAlterations: limitOfAllowedPathAlterations});
        AdaptiveAdvice.stop();
        AdaptiveAdvice.path = idealPath;

        chai.assert.equal(AdaptiveAdvice.performedWell(), true);

        AdaptiveAdvice.path = ["somethingElse"];
        chai.assert.equal(AdaptiveAdvice.performedWell(), true);

        AdaptiveAdvice.path = ["somethingElse", "andSomethingElse"];
        chai.assert.equal(AdaptiveAdvice.performedWell(), false);
    });

    it('returns correct "performedWell" result (time only)', function () {
        AdaptiveAdvice.apply({timeLimit: 0});
        AdaptiveAdvice.stop();
        chai.assert.equal(AdaptiveAdvice.performedWell(), false);

        AdaptiveAdvice.resetParameter();
        AdaptiveAdvice.apply({timeLimit: Infinity});
        AdaptiveAdvice.stop();
        chai.assert.equal(AdaptiveAdvice.performedWell(), true);
    });
    it('returns correct "performedWell" result (path & time)', function () {
        AdaptiveAdvice.apply({idealPath: [], limitOfAllowedPathAlterations: Infinity, timeLimit: Infinity});
        AdaptiveAdvice.stop();
        chai.assert.equal(AdaptiveAdvice.performedWell(), true);
    });
});
