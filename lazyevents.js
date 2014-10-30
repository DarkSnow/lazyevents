/**
 * Add lazy events for scroll and resize
 */
(function() {
  var opt = {
    timeout: 250, // How often the event can fire in milliseconds
    realEvents: ['scroll', 'resize'],
    prefix: 'lazy'
  };
  
  // Merge in user config if set
  if (typeof(LazyEventConfig) === 'object') {
    for (var p in LazyEventConfig) {
      opt[p] = LazyEventConfig[p];
    }
  }

  timers = {};
  events = {};

  // Handle a real event
  beLazy = function(event) {
    // If there's no timer for this event
    if (!timers[event.type]) {
      // Create a timer for this event
      timers[event.type] = window.setTimeout(function() {
        // Once the timer ticks, clear the timer
        timers[event.type] = null;
        // And dispatch lazy event
        window.dispatchEvent(events[event.type]);
      }, opt.timeout);
    }
  }

  // Watch the real events to trigger newly built lazy events
  for (var i = opt.realEvents.length - 1; i >= 0; i--) {
    if (window.addEventListener) { // Decent Browsers (and IE 9+)
      events[opt.realEvents[i]] = document.createEvent('Event');
      events[opt.realEvents[i]].initEvent(opt.prefix + opt.realEvents[i], true, true);
      window.addEventListener(opt.realEvents[i], beLazy, false);
    }
  }
})();

