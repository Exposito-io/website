(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading')
				}, 0)
			})

		// Touch mode.
			if (skel.vars.mobile)
				$body.addClass('is-touch');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly({
				speed: 2000
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				alignment: 'right',
				hideDelay: 350
			});

			$('#banner').scrollex({
				mode:		'middle',
				top:		0,
				bottom:		0,
				enter: function(t) { 
					if (history.pushState) 
						history.pushState(null, null, "#")

					//ga('set', 'page', location.pathname)
					ga('send', 'pageview', {
						'page': location.pathname
					})
				}
			})

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// Parallax.
		// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
			if (skel.vars.browser == 'ie'
			||	skel.vars.mobile) {

				$.fn._parallax = function() {

					return $(this)

				}

			}
			else {

				$.fn._parallax = function() {

					$(this).each(function() {

						var $this = $(this),
							on, off

						on = function() {

							$this
								.css('background-position', 'center 0px')

							$window
								.on('scroll._parallax', function() {

									var pos = parseInt($window.scrollTop()) - parseInt($this.position().top)

									$this.css('background-position', 'center ' + (pos * -0.15) + 'px')

								})

						}

						off = function() {

							$this
								.css('background-position', '')

							$window
								.off('scroll._parallax')

						};

						skel.on('change', function() {

							if (skel.breakpoint('medium').active)
								(off)()
							else
								(on)()

						});

					});

					return $(this);

				}

				$window
					.on('load resize', function() {
						$window.trigger('scroll');
					});

			}

			
			// Spotlights.
			var $spotlights = $('.spotlight')

			$spotlights
				._parallax()
				.each(function() {

					var $this = $(this),
						on, off

					on = function() {

						// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

						// Enable transitions (if supported).
							if (skel.canUse('transition')) {

								var top, bottom, mode;

								// Side-specific scrollex tweaks.
									if ($this.hasClass('top')) {

										mode = 'top';
										top = '-20%';
										bottom = 0;

									}
									else if ($this.hasClass('bottom')) {

										mode = 'bottom-only';
										top = 0;
										bottom = '20%';

									}
									else {

										mode = 'middle';
										top = 0;
										bottom = 0;

									}

								// Add scrollex.
									$this.scrollex({
										mode:		mode,
										top:		top,
										bottom:		bottom,
										initialize:	function(t) { $this.addClass('inactive'); },
										terminate:	function(t) { $this.removeClass('inactive'); },
										enter:		function(t) { 
											if (history.pushState) 
												history.pushState(null, null, "#" + $this.get(0).id)

											//ga('set', 'page', location.pathname + '/' + $this.get(0).id);
											ga('send', 'pageview', {
												'page': location.pathname + '/' + $this.get(0).id
											})
																					
											$this.removeClass('inactive')
										},

										// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

										// leave: function(t) { $this.addClass('inactive') },

									})

							}

					}

					off = function() {

						// Clear spotlight's background.
							$this.css('background-image', '');

						// Disable transitions (if supported).
							if (skel.canUse('transition')) {

								// Remove scrollex.
									$this.unscrollex();

							}

					};

					skel.on('change', function() {

						if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();

					});

				});

		// Wrappers.
			var $wrappers = $('.wrapper');

			$wrappers
				.each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						if (skel.canUse('transition')) {

							$this.scrollex({
								top:		250,
								bottom:		0,
								initialize:	function(t) { $this.addClass('inactive'); },
								terminate:	function(t) { $this.removeClass('inactive'); },
								enter:		function(t) { $this.removeClass('inactive'); },

								// Uncomment the line below to "rewind" when this wrapper scrolls out of view.
								
								//leave:	function(t) { $this.addClass('inactive'); },

							});

						}

					};

					off = function() {

						if (skel.canUse('transition'))
							$this.unscrollex();

					};

					skel.on('change', function() {

						if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();

					});

				});

		// Banner.
			var $banner = $('#banner');

			$banner
				._parallax();

	});

})(jQuery)

$(function() {
	$('#invitation form').validate({ 
		email: { required: true, email: true },
		submitHandler: submitNewsletter
	})

	var daoPopoverStopwatch = new StopWatch()
	var daoPopoverTimeout
	var daoPopoverManualHide = false

	function closeDaoPopover() {
		daoPopoverTimeout = setTimeout(function() {
			daoPopoverManualHide = true
			$('#dao-link').popover('hide')
		}, 500)		
	}

	$('#dao-link').popover({ 
		container: 'body',
		trigger: 'click hover',
		html: true,
		content: 'A Decentralized Autonomous Organization (DAO) is a new form of organization that is completely virtual and built around cryptographic rules. Anyone can participate in a DAO by acquiring tokens, which are used as actual shares of the organization. <br><br>With tokens you can take part, collaborate, propose, vote and receive dividends, to name a few possibilities. This open participation makes the DAO completely autonomous and decentralized.'
	})

	$('#dao-link').on('shown.bs.popover', function(event) {
		daoPopoverStopwatch = new StopWatch()
		daoPopoverStopwatch.start()
	})

	$('body').click(function(evt) {
		if(evt.target.id == "dao-link" || evt.target.className.indexOf('popover') > -1) 
			return		

		if ($('.popover').length > 0) {
			daoPopoverManualHide = true
			$('#dao-link').popover('hide')
			// calling .popover('hide') does not hide the div, so we
			// remove the div completely
			$('.popover').remove()
		}
		
	})

	$('#dao-link').on('hide.bs.popover', function(event) {
		if (daoPopoverManualHide) {
			daoPopoverManualHide = false
			daoPopoverStopwatch.stop()
			sendEvent('DAO popover', 'duration', '', daoPopoverStopwatch.duration() * 1000)
			return true
		}
		var id = $(this).attr('aria-describedby')
		var $self = $(this)

		if (id) {
			var container = $('#' + id)

			event.preventDefault()
			event.stopPropagation()
			event.stopImmediatePropagation()
			event.stop

			closeDaoPopover()

			container.on('mouseenter', function(){
				//We entered the actual popover – call off the dogs
				clearTimeout(daoPopoverTimeout)
			})	

			container.on('mouseleave', function(){
				closeDaoPopover()
			})
		}

	})

})

function submitNewsletter() {
	$.post('/newsletter', { email: $('#email').val() })
	.done(function(result) {
		if (result == 1)
			OnNewsletterSubmitSuccess()
		else {
			sendEvent('newsletter', 'submit fail', 'server error')
			OnNewsletterSubmitFail()
		}
	})
	.fail(function(result) {
		console.log('fail')
		console.log(result)
		OnNewsletterSubmitFail()
		sendEvent('newsletter', 'submit fail', 'connection error')
	})
}


function OnNewsletterSubmit() {
	submitNewsletter()
}

function OnNewsletterSubmitSuccess() {
	sendEvent('newsletter', 'submit success')
	$('#invitation .thankyou').addClass('show')
}

function OnNewsletterSubmitFail() {
	$('#invitation .error').addClass('show')
}


function sendEvent(category, action, label, value) {
	console.log('event: ', category, action, label, value)
	ga('send', 'event', category, action, label, value)
}