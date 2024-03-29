import {$} from 'meteor/jquery';
import {check, Match} from 'meteor/check';


export let AdaptiveComplexity = {};

function preventLinkExecution(e) {
    e.preventDefault();
}


AdaptiveComplexity.apply = function (elements) {
    // Reset bound elements
    AdaptiveComplexity.reset();

    // Bind elements
    if (elements !== undefined) {
        check(elements, {
            deactivatedElements: Match.Maybe(String),
            activatedElements: Match.Maybe(String)
        });

        if (elements.deactivatedElements !== undefined) {
            $(elements.deactivatedElements).bind('click', preventLinkExecution).addClass('disabled');
        }

        if (elements.activatedElements !== undefined) {
            $(elements.activatedElements).unbind('click', preventLinkExecution).removeClass('disabled');
        }
    }
};

AdaptiveComplexity.reset = function () {
    $("a").unbind('click', preventLinkExecution).removeClass('disabled');
};