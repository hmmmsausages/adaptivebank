import {Template} from 'meteor/templating';
import './frontpage.html';

Template.Frontpage.events({
    'click': function (e) {
        console.log("click");
    }
});