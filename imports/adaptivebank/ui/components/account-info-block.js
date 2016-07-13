import './account-info-block.html';

Template.Account_info_block.onRendered(function () {
    Meteor.defer(function () {
        $("#funds-info").popup();
    });
});