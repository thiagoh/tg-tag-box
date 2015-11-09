/*
 * tg-tag-box
 * https://github.com/thiago/tg-tag-box
 *
 * Copyright (c) 2015 Thiago Andrade
 * Licensed under the MIT license.
 */
/*jslint node: true */
(function(angular, $) {

    'use strict';

    var tgTagBox = angular.module('tgTagBoxModule', [])
        .directive('tgTagBox', ['$http', '$q', '$log', function($http, $q, $log) {

            var _link = function link(scope, elem, attr, ngModel) {

                var query = elem.find('input'),
                    chosenWrapper = $(elem[0]).find('.chosen-wrapper'),
                    fakeInput = $(elem[0]).find('.fake-input'),
                    findIndex = function findIndex(arr, result) {

                        var ix, i = 0,
                            length = arr.length;

                        if (!!result.id) {

                            for (; i < length; i++) {
                                if (result.id === arr[i].id) {
                                    return i;
                                }
                            }

                            return -1;

                        } else {

                            ix = arr.indexOf(result);
                        }

                        return ix;
                    },
                    processEntry = function processEntry(cur) {

                        var obj;

                        if (typeof cur === 'object') {

                            obj = angular.extend({}, cur);

                        } else {

                            obj = {
                                label: cur,
                                id: cur,
                                value: cur
                            };
                        }

                        return obj;
                    };

                $('<span id="idSpan" style="position: absolute; left: -100000px;"></span>').appendTo(document.body);

                scope.results = [];
                scope.output = [];

                if (scope.userOutput) {
                    scope.output = scope.userOutput;
                }

                if (scope.userSearch) {
                    scope.search = scope.userSearch;
                }

                scope.focus = function focus() {

                    query[0].focus();
                };

                scope.removeItem = function removeItem(event, result) {

                    var ix = findIndex(scope.results, result);

                    event.preventDefault();
                    event.stopPropagation();

                    if (ix >= 0) {

                        scope.results.splice(ix, 1);
                        scope.output.splice(ix, 1);
                    }
                };

                scope.addItem = function addItem(event, result) {

                    event.preventDefault();
                    event.stopPropagation();

                    if (findIndex(scope.results, result) === -1) {
                        scope.results.push(result);
                        scope.output.push(result.value);
                        query.val('');
                        scope.keyup();
                        scope.focus();
                    }
                };

                var fixWidth = function fixWidth() {

                    var w1, w2, w3, left;

                    w1 = fakeInput.width();
                    w2 = chosenWrapper.width();
                    w3 = $('#idSpan').html(query.val()).width() + 1;

                    $(query[0]).width(w3);

                    if (chosenWrapper.css('position') !== 'relative') {
                        chosenWrapper.css('position', 'relative');
                        $(query[0]).css('position', 'relative');
                    }

                    if (w2 + w3 > w1) {

                        left = ((w2 + w3 - w1) * -1);

                        chosenWrapper.css('left', left + 'px');
                        $(query[0]).css('left', left + 'px');

                    } else {

                        chosenWrapper.css('left', '0px');
                        $(query[0]).css('left', '0px');
                    }
                };

                scope.keyup = function keyup(event) {

                    var deferred = $q.defer(),
                        promise = deferred.promise;

                    fixWidth();
                    scope.searchData = [];

                    if (query.val().trim() === '') {
                        return;
                    }

                    promise.then(function() {

                        return scope.search(query.val());

                    }).then(function(result) {

                        if (!result.length) {
                            deferred.reject(result);
                            return;
                        }

                        scope.searchData = result.map(processEntry);
                        fixWidth();

                    }).catch(function(result) {

                        deferred.reject(result);
                        scope.searchData = [];
                        fixWidth();
                    });

                    deferred.resolve();

                    return deferred.promise;
                };
            };

            var template = '<div class="tg-tag-box outer">' +
                '   <div class="fake-input" ng-click="focus($event)">' +
                '       <span class="chosen-wrapper"><span class="chose" ng-repeat="entry in results" ' +
                '           >{{entry.label}}<span class="delete" ng-click="removeItem($event, entry)">x</span></span></span>' +
                '       <input type="text" class="query" ng-keyup="keyup($event)" />' +
                '   </div>' +
                '   <div class="inner" ng-show="searchData.length > 0">' +
                '       <span class="item" ng-click="addItem($event, entry)" ng-repeat="entry in searchData">' +
                '           {{entry.label}}' +
                '      </span>' +
                '   </div>' +
                '</div>';

            return {
                restrict: 'AE',
                template: template,
                scope: {
                    'userOutput': '=ngModel',
                    'userSearch': '=search'
                },
                link: function(scope, elem, attr, ngModel) {
                    return _link(scope, elem, attr, ngModel);
                }
            };
        }]);

}(typeof angular !== 'undefined' && angular || {}, jQuery));