﻿var _ = _ || require('./../Script/underscore.js');
var Handlebars = Handlebars || require('./../Script/handlebars-1.0.0.js');
var accounting = accounting || require('./../Script/accounting.min.js');
var moment = moment || require('./../Script/moment.min.js');

Handlebars.registerHelper('epoch', function () {
    return moment().local().unix();
});

Handlebars.registerHelper('moment', function (date, format) {
    try {
        var isEpoch = _.isNumber(date);

        if (_.isBlank(format) || _.isNull(format) || _.isUndefined(format)) {
            format = 'MMMM Do YYYY';
        }

        if (isEpoch)
        {
            return moment.unix(date).local().format(format);
        }

        return moment(date).format(format);
    }
    catch (e) {
        return date.toString();
    }
});


Handlebars.registerHelper('timefrom', function (date) {
    try {
        return moment(date).calendar();
    }
    catch (e) {
        return date.toString();
    }
});

Handlebars.registerHelper('friendly_date', function (epoch) {
    try {
        if (!_.isNumber(epoch)) {
            return '';
        }

        if (epoch <= 0) {
            return '';
        }

        // return '';
        return moment.unix(epoch).local().format('MMMM Do YYYY');
    }
    catch (e) {
        return e.toString();
    }
});

Handlebars.registerHelper('friendly_from', function (epoch) {
    try {
        if (!_.isNumber(epoch)) {
            return '';
        }

        if (epoch <= 0) {
            return '';
        }

        // return '';
        return moment.unix(epoch).local().calendar(null, {            
            sameElse: 'DD MMM YYYY'
        });
    }
    catch (e) {
        return e.toString();
    }
});


Handlebars.registerHelper("now", function (format) {
    var today = new Date();

    // These methods need to return a String
    return today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear();
});


Handlebars.registerHelper("hour", function (hour) {
    var shour = '' + hour;
    if (shour.length === 3) {
        shour = '0' + shour;
    }

    var h = Number(shour.substr(0, 2));
    var ampm = h < 12;
    if (!ampm && h != 12) {
        h = (h - 12);
    }
    h = (h < 10) ? '0' + h : '' + h;

    var m = shour.substr(2);

    return h + ':' + m + (ampm ? 'am' : 'pm');

});


Handlebars.registerHelper("dayname", function (day) {

    day = parseInt(day);

    switch (day) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return 'Sunday';
    }
});
