$(function()
  {
      $(document).ready(function(){
	  $('.ui-widget').hover(
    	      function() {
    		  $(this).addClass('ui-state-hover');
    	      }, 
    	      function() {
    		  $(this).removeClass('ui-state-hover');
    	      }
    	  );
	  
    	  $.ajax({
    	      url: "data/data.json",
    	      dataType: 'json',
    	      success: function(data)
    	      {
		  if(data.showHeader)
		  {
		      $('#header').show();
		      if(data.owner != "")
		      {
			  $('#owner').html(data.owner + '\'s');
		      }
		  } else
		  {
		      $('#header').hide();
		      $('.mainDiv').css('padding-top', '3%');
		  }
		  
    	          var cnt0 = 0;
    	          var cnt1 = 0;
    	          var irArr = $('.fillMe');
    	          $.each(irArr,
			 function(i, v)
    			 {
    			     if(eval("data.url" + cnt0 + cnt1) != undefined)
    			     {
    				 var b0 = cnt0,
    				 b1 = cnt1;
    				 $(this).html('<div class="ui-dialog-content ui-widget-content innerRow tip_trigger">' +
    	                                      '<p><br /><br />' + eval("data.url" + b0 + b1 + ".name") + ' <span class="tip">' + eval("data.url" + b0 + b1 + ".url") + '</span><br /><br /><br /></p>' +
    					      '</div>');
    				 if(eval("data.url" + cnt0 + cnt1 + ".url") != "")
    				 {           
    				     $(this).bind({
        				 click: function() {
					     if(data.openInNewTab)
					     {
						 window.open(eval("data.url" + b0 + b1 + ".url",'_newtab'));
					     } else
					     {
						 window.location = eval("data.url" + b0 + b1 + ".url");
					     }
        				 }
        	                     });
				     $(this).hover(
					 function ()
					 {
					     $('#url').html("<b>" + eval("data.url" + b0 + b1 + ".url") + "</b>");
					 }, 
					 function ()
					 {
					     $('#url').html("&nbsp;");
					 })
				 } else
				 {
				     $(this).unbind();
				 }
			     } else
			     {
				 $(this).hide();
			     }
			     ++cnt1;
			     if(cnt1 > 3)
			     {
				 ++cnt0;
				 cnt1 = 0;
			     }
    			 });
		  if(data.tooltips)
		  {
		      $(".tip_trigger").hover(
			  function()
			  {
			      tip = $(this).find('.tip');
			      tip.show();
			  }, function()
			  {
			      tip.hide();
			  }).mousemove(
			      function(e)
			      {
				  var mousex = e.pageX + 20;
				  var mousey = e.pageY;
				  if(data.showHeader)
				  {
				      mousey -= 60;
				  }
				  var tipWidth = tip.width();
				  var tipHeight = tip.height();

				  var tipVisX = $(window).width() - (mousex + tipWidth);
				  var tipVisY = $(window).height() - (mousey + tipHeight);

				  if ( tipVisX < 20 )
				  { 
				      mousex = e.pageX - tipWidth - 20;
				  } if ( tipVisY < 20 ) 
				  {
				      mousey = e.pageY - tipHeight - 20;
				  }
				  tip.css({  top: mousey, left: mousex });
			      });
		  }
		  if(data.showSearchForm)
		  {
		      $('#googleSearchForm').show();
		      $('#googleSearchFormInput').focus();
		      $('body').click(
			  function()
			  {
			      $('#googleSearchFormInput').focus();
			  });
		  }
		  $('.hideMe').show();
    	      }
    	  });
      });
  });
