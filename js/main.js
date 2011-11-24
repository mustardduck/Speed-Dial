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
		  if(data)
		  {
		      // Header
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
		      
		      // Entries
    	              var cnt0 = 0;
    	              var cnt1 = 0;
    	              var irArr = $('.fillMe');
    	              $.each(irArr,
			     function(i, v)
    			     {
				 if(eval("data.url" + cnt0 + cnt1))
				 {
    				     var b0 = cnt0;
    				     var b1 = cnt1;
				     var dataName = eval("data.url" + b0 + b1 + ".name") || "";
				     var dataUrl = eval("data.url" + b0 + b1 + ".url") || "";
				     var dataTip = eval("data.url" + b0 + b1 + ".tooltip") || "";
				     $(this).html('<div class="ui-dialog-content ui-widget-content innerRow tip_trigger">' +
						  '<p><br /><br />' + dataName + ' <span class="tip">' + (dataTip || dataUrl) + '</span><br /><br /><br /></p>' +
						  '</div>');
				     if(dataName && dataUrl)
				     {   
    					 $(this).bind({
        				     click: function() {
						 if(data.openInNewTab)
						 {
						     window.open(dataUrl,'_newtab');
						 } else
						 {
						     window.location = dataUrl;
						 }
					     }});
					 $(this).hover(
					     function()
					     {
						 $('#url').html("<b>" + dataUrl + "</b>");
					     }, 
					     function ()
					     {
						 $('#url').html("&nbsp;");
					     });
				     } else
				     {
					 $(this).unbind();
				     }
				     ++cnt1;
				     if(cnt1 > 3)
				     {
					 ++cnt0;
					 cnt1 = 0;
				     }
				 }
			     });

		      // Tooltips
		      if(data.tooltips)
		      {
			  $.each($(".tip_trigger"),
				 function()
				 {
				     if($(this).find('.tip').html())
				     {
					 $(this).hover(
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
				 });
		      }

		      // Search form
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
    	      }
    	  });
      });
  });
