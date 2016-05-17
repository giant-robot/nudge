(function($) {
    'use strict';

    if (typeof $.featherlight === 'undefined')
    {
        if ('console' in window)
        {
            window.console.info('Too much lightness; Nudge needs Featherlight.');
        }
        return;
    }

    /**
     * Nudge is a thin replacement for JavaScript's native alert() function,
     * based on Featherlight.
     *
     * @constructor
     */
    function Nudge(options) {

        this.config = $.extend(true, {}, this.defaults, options || {});
    }

    /**
     * Nudge defaults.
     *
     * @type {Object}
     */
    Nudge.prototype.defaults = {
        title: '',
        message: '',
        confirmText: 'OK',
        cancelText: 'Cancel',
        showCancel: false,
        variant: null,
        prompt: false,
        promptDefault: '',
        namespace: 'nudge-message',
        onConfirm: function (alert) {
            alert.close();
        },
        onCancel: function (alert) {
            alert.close();
        },
        onInput: function (value) {
            return value;
        },
        modal: {
            namespace: 'nudge',
            closeOnClick: false,
            closeIcon: null
        }
    };

    /**
     * Show the nudge. You can still modify it.
     *
     * @param options
     */
    Nudge.prototype.give = function (options) {

        // Spawn a new config object.
        options = (typeof options === 'string') ? {message: options} : options;

        var config = $.extend(true, {}, this.config, options);

        // Build the containers.
        var $content = $('<div>').addClass(config.namespace);

        if (config.variant)
        {
            $content.addClass(config.namespace + '--' + config.variant);
        }

        var $heading = $('<div>').addClass(config.namespace + '__title');
        var $message = $('<div>').addClass(config.namespace + '__message');
        var $actions = $('<div>').addClass(config.namespace + '__actions');
        var $prompt = $('<div>').addClass(config.namespace + '__input');
        var $button = $('<a>').addClass(config.namespace + '__button');

        // Build the action controls.
        var $confirmButtom = $button.clone().addClass(config.namespace + '__button--confirm').text(config.confirmText);
        var $cancelButton = $button.clone().addClass(config.namespace + '__button--cancel').text(config.cancelText);

        // Put the content together based on the current config.
        if (config.title)
        {
            $content.append($heading.text(config.title));
        }

        if (config.message)
        {
            $content.append($message.text(config.message));
        }

        if (config.prompt)
        {
            var $input = $('<input>');

            if (config.prompt === 'textarea')
            {
                $input = $('<textarea>');
            }

            $input.addClass(config.namespace + '__field').val(config.promptDefault);
            $prompt.append($input);
            $content.append($prompt);
        }

        if (config.showCancel)
        {
            $actions.append($cancelButton);
        }

        $actions.append($confirmButtom);

        $content.append($actions);

        // Create customized Featherlight config.
        var modalConfig = $.extend({}, config.modal, {

            // Queue binding of control actions to the newly created modal instance.
            afterContent: function () {

                var modal = this;

                // Confirmed.
                modal.$content.find('.' + config.namespace + '__button--confirm').click(function () {
                    if (config.prompt)
                    {
                        config.onInput(modal.$content.find('.' + config.namespace + '__field').val());
                    }
                    config.onConfirm(modal);
                    return false;
                });

                // Cancelled.
                modal.$content.find('.' + config.namespace + '__button--cancel').click(function () {
                    config.onCancel(modal);
                    return false;
                });
            },

            // Switch focus to the prompt input field.
            afterOpen: function () {

                if (config.prompt)
                {
                    this.$content.find('.' + config.namespace + '__field').focus();
                }
            }
        });

        // Fire!
        $.featherlight($content, modalConfig);
    };

    /**
     * Prepare and show a nudge on the fly.
     *
     * @static
     * @param options
     */
    Nudge.give = function(options) {
        new Nudge().give(options);
    };

    // Get ready for some nudging.
    window.Nudge = Nudge;

})(window.jQuery);
