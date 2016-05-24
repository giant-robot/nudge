#Introductions

Nudge is a very light replacement for JavaScript's `alert()` based on the excellent [Featherlight](https://github.com/noelboss/featherlight) jQuery lightbox plugin. 

It is simple, uses sensible css (everything is name-spaced using BEM conventions), it's completely customizable and the girls love it!

##Installation

Nudge requires [jQuery](http://jquery.com/download/) and [Featherlight](https://github.com/noelboss/featherlight/releases/latest).

As soon you've got those down, you can manually grab the [latest release](https://github.com/giant-robot/nudge/releases/latest) or install using bower:

`bower install giant-nudge`

You should then make sure to include the scripts below:

* `dist/nudge.min.js` (its majesty)
* `dist/nudge.min.css` (basic overlays and centering)

and maybe also include the most absolutely minimal theme from:

* `dist/themes/lite.min.css`

If you're a Sassy person, you might find `src/nudge.scss` and `src/nudge-lite.scss` handy. Just saying.


##Usage
You can create (and store) Nudges by instantiating the globally exposed class `Nudge`:

```js
var myNudge = new Nudge(options);
```

You can then show them, optionally overriding some (or all) of the options:

```js
myNudge.give(options);
```

You can even create and show Nudges on-the-fly:

```js
Nudge.give(options);
```

###Options

Whether you're creating a new instance, showing an instance or showing a Nudge on-the-fly, you can define the options you need to set in the form of a JavaScript object.

**title** `String` `default: ''`  
The title to display.  
 
**message** `String` `default: ''`  
The message to display.

**confirmText** `String` `default: 'OK'`  
Confirmation button text.

**showCancel** `Boolean` `default: false`  
Whether to show a cancel button.

**cancelText** `String` `default: 'Cancel'`  
Cancel button text.

**prompt** `Boolean` `default: false`  
Wether to show an input prompt. When set to `true`, a text input field will be shown after the message.

**promptDefault** `String` `default: ''`  
Default text for the prompt input field.

**namespace** `String` `default: 'nudge-message'`    
Message container class and elements prefix.  

**variant** `String` `default: null`  
Message container class modifier.  

For example: if your namespace is `alert` and you pass in the variant `success`, the class `alert--success` will be added to the message container.

**onConfirm** `Function`  
A callback to execute when the confirm button is clicked. `this` is the Nudge instance. The current Featherlight instance is passed as a parameter to the callback.  

This is what the default callback that closes the modal looks like:

```js
function(featherlight) {
    featherlight.close()
};
```

**onCancel** `Function`  
A callback to execute when the cancel button is clicked. `this` is the Nudge instance. The current Featherlight instance is passed as a parameter to the callback.  

This is what the default callback that closes the modal looks like:

```js
function(featherlight) {
    featherlight.close()
};
```


**onInput** `Function` `default: $.noop()`  
A callback to execute right before `onConfirm` when a prompt is displayed. `this` is the Nudge instance. The value entered in the input field is passed as a parameter to the callback.  

**modal** `Object`  
A JavaScript object that is passed directly to Featherlight when creating the modal.  

By default, the following options are set:

```js
{
    namespace: 'nudge',  /* Set our own namespace. */
    closeOnClick: false, /* Don't close the modal on click. */
    closeIcon: null      /* Don't render a close icon. */
}
```

###Methods

**give(`String|Object options`)**  
Show a Nudge using the supplied options. 

* When the parameter passed is a string, it is used to override the current `message` option, keeping the other settings intact.  
* When the parameter passed is an object, it is used to extend the current settings object.

##Examples

If you haven't gotten the picture already, here are some examples to get you started.

```js
// Create a Nudge.
var success = new Nudge({
    title:   'A Grand Success!',
    message: 'Everything worked out OK.',
    variant: 'success'
});

// Show the Nudge overriding the message.
success.give('That feels good.');

// Show the Nudge overriding the title as well.
success.give({
    title:   'Hot Damn!',
    message: 'That feels good.'
});	

// Create and show the same Nudge on-the-fly.
Nudge.give({
    title:   'Hot Damn!',
    message: 'That feels good.',
    variant: 'success'
});
```