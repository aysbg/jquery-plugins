(function($) {
	
	$.fn.extend({

		//pluginname
		dropdownMenu: function(options) {
			//set defaults for the plugin
			var defaults = {
				top		: 15,
				left	: 0,
				speed : 300
			};

			return this.each(function() {
				//options for plugin
        options = options || {};

        var $obj = $(this);
        var $menu = $obj.parent().find('ul.custom-dropdown');
        //var $items = $('li', $menu);

        //add default styling/positioning
        $menu.css('top', defaults.top + 5);
        $menu.css('left', defaults.left);

        //biding events for showing/hiding $menu
        $menu.bind('show', function() {
        	$obj.addClass('opened');
        	$menu.fadeIn(defaults.speed);
        })
        .bind('hide', function() {
        	$obj.removeClass('opened');
        	$menu.fadeOut(defaults.speed);
        })
        .bind('toggle', function() {
        	if($obj.hasClass('opened')) {
            $menu.trigger('hide');
          }
          else {
          	$menu.trigger('show');
          }
        });

        //add click even for anchor
        $obj.click(function() {
        	$menu.trigger('toggle');
          return false;
        });

        //add event to close dropdown-menu on click outside div
        $(document).click(function(e) {
    			var clicked = e.target.className;
    			if($.trim($menu) != '') {
        		if($menu != clicked) {
            	$menu.trigger('hide');
        		}
    			}
				});

			}); //end return function
		} //end plugin definition

	});

})(jQuery);