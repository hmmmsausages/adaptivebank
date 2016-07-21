import {$} from 'meteor/jquery';

export let AdaptiveAdvice = {};

function linkClicked(e) {
    console.log($(this).attr('id'));
}

AdaptiveAdvice.apply = function () {
    $('a').bind('click', linkClicked);
};

AdaptiveAdvice.reset = function () {
    $('a').unbind('click', linkClicked);
};