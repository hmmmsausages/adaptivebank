import {$} from 'meteor/jquery';
import {check, Match} from 'meteor/check';


export let AdaptiveComplexity = {};

function preventLinkExecution(e) {
    e.preventDefault();
}


AdaptiveComplexity.apply = function (elements) {
    if (elements) {
        check(elements, {
            deactivatedElements: Match.Maybe(String),
            activatedElements: Match.Maybe(String)
        });

        if (elements.deactivatedElements) {
            $(elements.deactivatedElements).bind('click', preventLinkExecution).addClass('disabled');
        }

        if (elements.activatedElements) {
            $(elements.activatedElements).unbind('click', preventLinkExecution).removeClass('disabled');
        }
    }
};

AdaptiveComplexity.reset = function () {
    $("a").unbind('click', preventLinkExecution).removeClass('disabled');
};