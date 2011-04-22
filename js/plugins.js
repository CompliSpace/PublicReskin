
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  arguments.callee = arguments.callee.caller;  
  if(this.console) console.log( Array.prototype.slice.call(arguments) );
};
// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});


// place any jQuery/helper plugins in here, instead of separate, slower script files.

/*
 * jQuery YQL plugin
 *
 * Copyright (c) 2010 Gabriel Falcão
 * Copyright (c) 2010 Lincoln de Sousa
 * licensed under MIT license.
 *
 * http://github.com/gabrielfalcao/jquery-yql/raw/master/license.txt
 *
 * Version: 0.3.0
 */

(function($){
     $.extend(
         {
             _prepareYQLQuery: function (query, params) {
                 $.each(
                     params, function (key) {
                         var name = "#{" + key + "}";
                         var value = $.trim(this);
                         if (!value.match(/^[0-9]+$/)) {
                             value = '"' + value + '"';
                         }
                         while (query.search(name) > -1) {
                             query = query.replace(name, value);
                         }

                         var name = "@" + key;
                         var value = $.trim(this);
                         if (!value.match(/^[0-9]+$/)) {
                             value = '"' + value + '"';
                         }
                         while (query.search(name) > -1) {
                             query = query.replace(name, value);
                         }

                     }
                 );
                 return query;
             },
             yql: function (query) {
                 var $self = this;
                 var successCallback = null;
                 var errorCallback = null;

                 if (typeof arguments[1] == 'object') {
                     query = $self._prepareYQLQuery(query, arguments[1]);
                     successCallback = arguments[2];
                     errorCallback = arguments[3];
                 } else if (typeof arguments[1] == 'function') {
                     successCallback = arguments[1];
                     errorCallback = arguments[2];
                 }

                 var doAsynchronously = successCallback != null;
                 var yqlJson = {
                     url: "http://query.yahooapis.com/v1/public/yql",
                     dataType: "jsonp",
                     success: successCallback,
                     async: doAsynchronously,
                     data: {
                         q: query,
                         format: "json",
                         env: 'store://datatables.org/alltableswithkeys',
                         callback: "?"
                     }
                 }

                 if (errorCallback) {
                     yqlJson.error = errorCallback;
                 }

                 $.ajax(yqlJson);
                 return $self.toReturn;
             }
         }
     );
 })(jQuery);
