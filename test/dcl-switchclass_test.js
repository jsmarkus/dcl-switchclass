'use strict';

var switchclass = require('../lib/dcl-switchclass.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

function makeWidget() {
    var Widget = function() {
        this._classes = {};
    };

    Widget.prototype.addClass = function(cl) {
        this._classes[cl] = true;
    };

    Widget.prototype.removeClass = function(cl) {
        delete this._classes[cl];
    };

    Widget.prototype.hasClass = function(cl) {
        return !!this._classes[cl];
    };

    return Widget;
}


exports['class switcher'] = {
    setUp: function(done) {
        // setup here
        done();
    },

    'basic': function(test) {
        test.expect(1);

        var Widget = makeWidget();
        var w = new Widget();
        w.addClass('one');
        test.ok(w.hasClass('one'));

        test.done();
    },

    'monkey patch': function(test) {
        test.expect(5);

        var Widget = makeWidget();
        switchclass(Widget, [{
            attribute: 'span',
            values: {
                '1' : 'span1',
                '2' : 'span2',
                '3' : 'span3',
                '4' : 'span4'
            }
        }, {
            attribute: 'size',
            values: {
                'small':'btn-small',
                'large':'btn-large',
                'normal':'btn-normal'
            }

        }]);
        var w = new Widget();

        w.applyAttribute_span(2);
        test.ok(w.hasClass('span2'));

        w.applyAttribute_span(3);
        test.ok(w.hasClass('span3'));
        test.ok(!w.hasClass('span2'));

        w.applyAttribute_size('small');
        test.ok(w.hasClass('btn-small'));

        w.applyAttribute_size(null);
        test.ok(!w.hasClass('btn-small'));

        test.done();
    }
    // 'no args': function(test) {
    //   test.expect(1);
    //   // tests here
    //   test.equal(dcl_class_switch.awesome(), 'awesome', 'should be awesome.');
    //   test.done();
    // },
};