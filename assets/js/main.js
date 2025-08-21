/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mailto Form Handler
    const footerForm = document.getElementById('footer-contact-form');

    if (footerForm) {
        footerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = this.elements.name.value;
            const email = this.elements.email.value;
            const message = this.elements.message.value;
            const clientEmail = 'leadwaycorporatedevelopers@gmail.com';
            
            const subject = 'New Message from ' + name;
            const body = `You have a new message from your website contact form:%0D%0A%0D%0A` +
                         `Name: ${name}%0D%0A` +
                         `Email: ${email}%0D%0A%0D%0A` +
                         `Message:%0D%0A${message}`;

            window.location.href = `mailto:${clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }

    // Mobile Navigation Setup
    $navPanelToggle = $(
        '<a href="#navPanel" class="navPanelToggle"><span class="fa fa-bars"></span></a>'
    ).appendTo($nav);

    // Create and append the mobile navigation panel
    $navPanel = $(
        '<div id="navPanel">' +
            '<nav>' +
            $('#nav').find('.links').clone().html() +
            '</nav>' +
            '<a href="#navPanel" class="close"></a>' +
        '</div>'
    ).appendTo($body);

    // Handle mobile menu toggle
    $navPanelToggle.on('click', function(e) {
        e.preventDefault();
        $body.toggleClass('is-navPanel-visible');
    });

    // Handle closing mobile menu
    $navPanel.find('.close').on('click', function(e) {
        e.preventDefault();
        $body.removeClass('is-navPanel-visible');
    });

    // Close menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#navPanel, .navPanelToggle').length) {
            $body.removeClass('is-navPanel-visible');
        }
    });

    // Enhance Navigation
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('#nav').addClass('scrolled');
        } else {
            $('#nav').removeClass('scrolled');
        }
    });

    // Optimize Video Loading
    $('video').each(function() {
        $(this).attr('preload', 'metadata');
        $(this).attr('loading', 'lazy');
    });

    // Enhance Mobile Menu
    $('.navPanelToggle').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('is-navPanel-visible');
    });

    // Close menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#navPanel, .navPanelToggle').length) {
            $('body').removeClass('is-navPanel-visible');
        }
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

})(jQuery);