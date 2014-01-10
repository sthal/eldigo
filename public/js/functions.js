// If JavaScript is enabled remove 'no-js' class and give 'js' class
jQuery('html').removeClass('no-js').addClass('js');

// Add .osx class to html if on Os/x
if ( navigator.appVersion.indexOf("Mac")!=-1 ) 
	jQuery('html').addClass('osx');

// When DOM is fully loaded
jQuery(document).ready(function($) {

/* --------------------------------------------------------	
	External Links
   --------------------------------------------------------	*/	

	(function() {
	    $(window).load(function() {
			$('a[rel=external]').attr('target','_blank');	
		});                                            
	})();  
  
/* --------------------------------------------------------	
	Responsive Navigation
   --------------------------------------------------------	*/	
	
	(function() {

		var $mainNav    = $('.navbar .nav'),
			responsiveNav = '';

		// Responsive nav
		$mainNav.find('li').each(function() {
			var $this   = $(this),
				$link = $this.children('a'),
				depth   = $this.parents('ul').length - 1,
				indent  = '';

			if( depth ) {
				while( depth > 0 ) {
					indent += ' - ';
					depth--;
				}
			}

			if ($link.text())
				responsiveNav += '<option ' + ($this.hasClass('active') ? 'selected="selected"':'') + ' value="' + $link.attr('href') + '">' + indent + ' ' + $link.text() + '</option>';

		}).end().after('<select class="nav-responsive">' + responsiveNav + '</select>');

		$('.nav-responsive').on('change', function() {
			window.location = $(this).val();
		});
			
	})();      

/* --------------------------------------------------------	
	Portfolio 
   --------------------------------------------------------	*/	

   (function() {
		$(window).load(function(){
			// container
			var $container = $('#portfolio-items');
			function filter_projects(tag)
			{
			  // filter projects
			  $container.isotope({ filter: tag });
			  // clear active class
			  $('li.active').removeClass('active');
			  // add active class to filter selector
			  $('#portfolio-filter').find("[data-filter='" + tag + "']").parent().addClass('active');
			  // update location hash
			  if (tag!='*')
				window.location.hash=tag.replace('.','');
			  if (tag=='*')
			  	window.location.hash='';
			}
			if ($container.length) {
				// conver data-tags to classes
				$('.project').each(function(){
					$this = $(this);
					var tags = $this.data('tags');
					if (tags) {
						var classes = tags.split(',');
						for (var i = classes.length - 1; i >= 0; i--) {
							$this.addClass(classes[i]);
						};
					}
				})
				// initialize isotope
				$container.isotope({
				  // options...
				  itemSelector : '.project',
				  layoutMode   : 'fitRows'
				});
				// filter items
				$('#portfolio-filter li a').click(function(){
					var selector = $(this).attr('data-filter');
					filter_projects(selector);
					return false;
				});
				// filter tags if location.has is available. e.g. http://example.com/work.html#design will filter projects within this category
				if (window.location.hash!='')
				{
					filter_projects( '.' + window.location.hash.replace('#','') );
				}
			}
		})

	})();

/* --------------------------------------------------------	
	Contact Form
   --------------------------------------------------------	*/	

   (function() {
   	$('#contact-f-submit').data('original-text', $('#contact-f-submit').html() );
		$('#contact-f-submit').click(function(e){
			var form = $('#contact-f').serialize();
			$('#contact-f-submit').addClass('disabled').html('Sending data ...');
			setTimeout(function(){
				// reset message field
				$('#contact-f-response').hide().attr('class','alert');
				// post form data using ajax
				$.post( 'php/contact.php', form, 
					function(response) {
						// reset contact form button with original text
						$('#contact-f-submit').removeClass('disabled').html( $('#contact-f-submit').data('original-text') );
						// e-mail was sent
						if ( response.status == 1 ) {
							message = '<i class="icon-ok"></i> Thanks for your message. We will get back to you as soon as we can.';
							$('#contact-f-response').addClass('alert-success');
						// there were errors, show them
						} else {
							message = '' + response.errors;
							$('#contact-f-response').addClass('alert-warning');
						}
						// show response message
						$('#contact-f-response').show().html(message);
					}
				,"json");
			},300);
		})
	})();

/* --------------------------------------------------------	
	Newsletter Form
   --------------------------------------------------------	*/	

   (function() {
   		$('#newsletter-f').submit(function(e){
			var form = $('#newsletter-f').serialize();
			$('#newsletter-f').hide();
			$('.ajax-loader').show();
			setTimeout(function(){
			// post form data using ajax
			$.post( 'php/newsletter.php', form, 
				function(response) {
					$('.ajax-loader').hide();
					// e-mail was sent
					if ( response.status == 1 ) {
						$('#newsletter-f').html("Thanks, you have been added to newsletter.");
						$('#newsletter-f').show();
					// there were errors, show them
					} else {
						$('#newsletter-f').show();
						alert(response.errors);
					}
				}
			,"json");
			},600);
			// prevent from reloading a page
			e.preventDefault();
		})
	})();

})

/* --------------------------------------------------------	
	Portfolio Overlay
   --------------------------------------------------------	*/	

$(function() {
    $(".portfolio li a").hover(
        function () {
            $(this).find('.overlay').slideDown();
        }, 
        function () {
            $(this).find('.overlay').stop().slideUp();
        }
        );
});
  
/* --------------------------------------------------------	
	Flex Initialize
   --------------------------------------------------------	*/	

$(function(){
  SyntaxHighlighter.all();
});
$(window).load(function(){
  $('.flexslider').flexslider({
    animation: "slide",
    start: function(slider){
      $('body').removeClass('loading');
    }
  });
});
