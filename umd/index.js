!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).vanillaObserver=t()}(this,function(){"use strict";var t=function(){return(t=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};return function(e){var s={state:e,events:new Set,listen:function(e,t){return t&&(e.getMemo=t,e.lastMemo=t(s.state)),s.events.has(e)||s.events.add(e),function(){s.events.delete(e)}},unListen:function(e){s.events.delete(e)},setState:function(e){s.state=t({},s.state,e),s.update()},beforeUpdate:function(e){e&&e(s.state)},connectElement:function(n,o,e,t){if(void 0===t&&(t=!0),document&&document.createElement){var a=s.listen(function(e,t){document.body.contains(n)?o(e,t):a()},e);t&&o(s.state,e?e(s.state):[])}},update:function(e){s.beforeUpdate(e),s.events.forEach(function(e){if(e.getMemo&&e.lastMemo){for(var t=e.getMemo(s.state),n=!1,o=0;o<e.lastMemo.length;o++){if(e.lastMemo[o]!==t[o]){n=!0;break}}n&&e(s.state,e.lastMemo)}else e(s.state,e.lastMemo)})}};return s}});
//# sourceMappingURL=index.js.map
