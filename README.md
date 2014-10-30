lazyevents.js
=============
Certain JavaScript events fire a lot. Specifically the `move` and `resize` events. So much so that they can overwhelm a slower browser, especially if the event is used to run a lot of code. This has led many people to create little snippets of code to only do the complex operations every so often rather than every time the event fires.

This library fires a **lazy** version of those events every so often rather than every event, considerably reducing the load on slower browsers, most notably mobile.

Internet Explorer
-----------------
**This library will only work with IE9 and newer.**

Due to the broken event model in older versions of IE this library will not work with IE8 or older. There's code in there to simply prevent the event from ever being fired in those broken browsers so there won't be an error, but no event ever triggered. In fact, there appears to be no way to create and trigger custom events in older IE at all, even using some MS specific work around.

Just in case people are wondering how the frameworks handle this, the answer is, they don't really. If you were to listen for an event using the DOM `addEventListener` you can't listen for an event triggerd by something like `jQuery.trigger`. The frameworks usually implmenent their own event layer, which listens to the core browser events but not directly, they handle the system events and trigger any call backs within their own event handling system. This means they can name their events whatever they like and pass whatever data they like, while abstracting away the DOM events.

Usage
-----
To include this in a project simply include the library a script tag, just like any other library.

To use simply bind to the **lazy** event rather than the real event. The lazy events use the same name as the real events with lazy prepended, so rather than

        window.addEventListener('resize', function(e){}, false);

you would use

        window.addEventListener('lazyresize', function(e){}, false);

Simple as that.

Configuration
-------------
To set any of the configuration options (see below) include a `<script>` tag before including the library. Any config settings included in the JavaScript `LazyEventConfig` object will override the defaults.

Option|Default|Purpose
---|---|---
**`timeout`**|`250`|How often the lazy events can fire in milliseconds
**`realEvents`**|`['scroll', 'resize']`|JavaScript array containing the names of the real events to track
**`prefix`**|`'lazy'`|The string that gets prepended to the real event names to distinguish the lazy versions

        var LazyEventConfig = {
          timeout: 250,
          realEvents: ['scroll', 'resize', 'mousemove'],
          prefix: 'lazy'
        };


