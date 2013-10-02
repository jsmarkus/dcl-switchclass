/*
 * dcl-class-switch
 * https://github.com/dualjs/dcl-class-switch
 *
 * Copyright (c) 2013 Mark
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(constr, rules) {
    rules.forEach(addApplier.bind(this, constr));
};

function addApplier(constr, rule) {
    var attr = rule.attribute;
    var values = rule.values;
    var proto = constr.prototype;

    var valuesToClasses = Object.keys(values).map(function(val) {
        return [val, values[val]];
    });

    proto['applyAttribute_' + attr] = function(value) {
        valuesToClasses.forEach(function(valueToClass) {
            var matchValue = valueToClass[0];
            var className = valueToClass[1];
            if ('' + matchValue === '' + value) {
                this.addClass(className);
            } else {
                this.removeClass(className);
            }
        }.bind(this));
    };
}