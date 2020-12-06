const assert = require("assert");
const _ = require("lodash");
const moment = require("moment");
var rawEvents = require("./raw_events.json");

describe("Array", function () {
    describe("#indexOf()", function () {
        it("should return -1 when not found", function () {
            assert.strictEqual([1,2,3,].indexOf(4), -1);
        });
    });
});

describe("Events Tests", function () {
    // Prepare dates
    _.forEach(rawEvents, function (event) {
        event.date = moment(event.time).format("YYYY-MM-DD");
    });

    describe("number of events", function () {
        it("output events count", function () {
            var groupedByDate = _.groupBy(rawEvents, 'date');
            var prevValue = 0;
            _.forEach(_.keys(groupedByDate), function (k) {
                if(prevValue !== 0) {
                    if(!((prevValue * 0.8) <= groupedByDate[k].length && groupedByDate[k].length <= (prevValue * 1.2))) {
                        console.log(`Number of events for ${k} varies by more than 20% from previous day's data. Previous day's value => ${prevValue}. Current value => ${groupedByDate[k].length}`);
                    }
                }
                prevValue = groupedByDate[k].length;
            });
        });
    });
});

// Should I have done 20% variance from the previous days
// In case we need to calculate 20% of the "Standard Deviation (SD)", then we need to do the following:
//    npm install mathjs --save
//    Then, in the test.js file, do the following:
//        const math = require("mathjs");

// And then in the describe function where we calculate the variance - use math.std() => this calculates standard deviation
