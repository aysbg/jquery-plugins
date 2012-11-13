/** Custom Select dropdowns
========================================**/
(function($) {
    $.fn.customSelect = function(options) {

      return this.each(function() {
        //options for plugin
        options = options || {};

        // select element to be replaced
        var select = $(this);
        var header = $(this).attr('data-header');

        var selectBoxContainer = $('<div>', {
          //width : select.outerWidth(), //adding padding on both sides
          width : options.minWidth,
          class : 'customSelect',
          html  : '<span class="selectBox">'+ header +'</span>'
        });

        var dropDown = $('<ul>', { class:'dropDown' });
        var selectBox = selectBoxContainer.find('.selectBox');
        $(dropDown).css('width', options.listWidth);

        // loop through the options of the select element
        select.find('option').each(function(opt) {
          var option = $(this);

          if(opt == select.attr('selectedIndex')) {
            selectBox.html(option.text());
          }

          var li = $('<li>', { 
            html: option.text()
          });

          li.click(function() {
            selectBox.html(option.text());
            dropDown.trigger('hide');

            select.val(option.val());

            return false;
          });
          
          //add li items to dropdown
          dropDown.append(li);
        });

        selectBoxContainer.append(dropDown.hide());
        select.hide().after(selectBoxContainer);

        // Binding custom show and hide events on the dropDown:
        dropDown.bind('show',function(){

          if(dropDown.is(':animated')){
            return false;
          }

          selectBox.addClass('expanded');
          dropDown.slideDown();

        }).bind('hide',function(){

          if(dropDown.is(':animated')){
            return false;
          }

          selectBox.removeClass('expanded');
          dropDown.slideUp();

        }).bind('toggle',function(){
          if(selectBox.hasClass('expanded')){
            dropDown.trigger('hide');
          }
          else dropDown.trigger('show');
        });

        selectBox.click(function(){
          dropDown.trigger('toggle');
          return false;
        });

        // If we click anywhere on the page, while the
        // dropdown is shown, it is going to be hidden:
        $(document).click(function(){
          dropDown.trigger('hide');
        });

      });
    };

    //setting default values for plugin variables
    $.fn.customSelect.defaults = { 
      minWidth  : 125,
      listWidth : 150
    }

})(jQuery);