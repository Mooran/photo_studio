
    var tip;

    tip = function(options) {
        this.settings = $.extend({
            text: '提示',
            cls: '',
            type: 'error', // error | success
            zIndex: '9999',
            speed: 500,
            stay: 1000,
            top: 0
        }, options);

        this.init();
    }
    tip.prototype = {
        constructor: tip,
        init: function() {
            var icos, that = this;

            this.$box = $([
                '<div class="tip-fall">',
                    '<div class="con" data-role="con"></div>',
                '</div>'
            ].join(''));
            this.$box.hide().appendTo(document.body);
            this.$box.addClass(this.settings.zIndex);
            this.$box.addClass('s-' + this.settings.type);

            icos = {
                'error': 'fa-exclamation-circle', 
                'success': 'fa-check-circle'
            }

            this.$box.find('*[data-role="ico"]').addClass(icos[this.settings.type]);
            this.$box.find('*[data-role="con"]').html(this.settings.text);

            this.$box.find('*[data-role="close"]').click(function(event) {
                that.remove();
            });
        },
        show: function() {
            var that = this;
            this.$box.css({
                'top': -50,
                'opacity': 0,
                'zIndex': that.settings.zIndex
            })
            .show()
            .animate({'top': that.settings.top, 'opacity': 1}, that.settings.speed, function() {
                that.timer = setTimeout(function() {
                    that.remove();
                }, that.settings.stay);                
            });;
        },
        remove: function() {
            this.$box.remove();
        }
    }
