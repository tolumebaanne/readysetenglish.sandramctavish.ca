/*!
 * The Cricket War - Clean Base JavaScript
 * Version: 6.1
 * Date: August 3, 2025
 * Author: ObviUS Digital Inc
 * Copyright: © 2025 Sandra McTavish. All rights reserved.
 * Code Editor: Toluwalase Mebaanne
 */

/*===========================================
  MOBILE SIDEBAR - GLOBAL FUNCTIONS
  Must be outside document.ready for inline onclick to work
===========================================*/
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('show');
    document.body.classList.toggle('sidebar-open');
}

function closeMobileSidebar() {
    document.getElementById('sidebar').classList.remove('show');
    document.body.classList.remove('sidebar-open');
}

/*===========================================
  DOCUMENT READY
===========================================*/
$(document).ready(function() {
    console.log('Cricket War - Previous Section Triggers v6.1 Loaded');
    
    initThemeTransitions();
    initNavigation();
    initSidebarClickOutside();
    initReviews();
    initForms();
    initScrollEffects();
    initButtonEffects();
    initBootstrapComponents();
    initAccessibility();
    initBookInteractions();
    initMobileSectionTitle();
});

/*===========================================
  BIDIRECTIONAL THEME TRANSITIONS
===========================================*/
function initThemeTransitions() {
    let lastScrollTop = 0;
    let animatedSections = new Set();
    
    $('.nav-link').click(function() {
        const targetId = $(this).attr('href').substring(1);
        triggerSectionAnimation(targetId);
    });
    
    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        const triggerDistance = windowHeight * 0.15;
        
        if (scrollDirection === 'down') {
            const heroBottom = $('#hero').offset().top + $('#hero').outerHeight();
            if (scrollTop >= heroBottom - triggerDistance) {
                triggerSectionAnimation('about');
            }
            
            const aboutBottom = $('#about').offset().top + $('#about').outerHeight();
            if (scrollTop >= aboutBottom - triggerDistance) {
                triggerSectionAnimation('promo');
            }
            
            const impactBottom = $('#resources').offset().top + $('#resources').outerHeight();
            if (scrollTop >= impactBottom - triggerDistance) {
                triggerSectionAnimation('resources');
            }

            const promoBottom = $('#promo').offset().top + $('#promo').outerHeight();
            if (scrollTop >= promoBottom - triggerDistance) {
                triggerSectionAnimation('reviews');
            }
            
            const reviewsBottom = $('#reviews').offset().top + $('#reviews').outerHeight();
            if (scrollTop >= reviewsBottom - triggerDistance) {
                triggerSectionAnimation('author');
            }
            
            const authorBottom = $('#author').offset().top + $('#author').outerHeight();
            if (scrollTop >= authorBottom - triggerDistance) {
                triggerSectionAnimation('contact');
            }
            
            const contactBottom = $('#contact').offset().top + $('#contact').outerHeight();
            if (scrollTop >= contactBottom - triggerDistance) {
                triggerSectionAnimation('newsletter');
            }
        } else {
            if (scrollTop < $('#newsletter').offset().top - triggerDistance) {
                resetSectionAnimation('newsletter');
            }
            
            if (scrollTop < $('#contact').offset().top - triggerDistance) {
                resetSectionAnimation('contact');
            }
            
            if (scrollTop < $('#author').offset().top - triggerDistance) {
                resetSectionAnimation('author');
            }
            
            if (scrollTop < $('#reviews').offset().top - triggerDistance) {
                resetSectionAnimation('reviews');
            }
            
            if (scrollTop < $('#promo').offset().top - triggerDistance) {
                resetSectionAnimation('promo');
            }
            
            if (scrollTop < $('#resources').offset().top - triggerDistance) {
                resetSectionAnimation('resources');
            }

            if (scrollTop < $('#about').offset().top - triggerDistance) {
                resetSectionAnimation('about');
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    function triggerSectionAnimation(sectionId) {
        if (!animatedSections.has(sectionId)) {
            animatedSections.add(sectionId);
            $('#' + sectionId).addClass('animate-to-final');
        }
    }
    
    function resetSectionAnimation(sectionId) {
        if (animatedSections.has(sectionId)) {
            animatedSections.delete(sectionId);
            $('#' + sectionId).removeClass('animate-to-final');
        }
    }
}

/*===========================================
  NAVIGATION
===========================================*/
function initNavigation() {
    $('.nav-link').click(function(e) {
        e.preventDefault();
        
        const target = $(this).attr('href');
        const $target = $(target);
        
        if ($target.length) {
            $('.nav-link').removeClass('active');
            $(this).addClass('active');
            
            $('html, body').animate({
                scrollTop: $target.offset().top
            }, 800);
            
            if ($(window).width() <= 767) {
                closeMobileSidebar();
            }
        }
    });
    
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop() + 100;
        
        $('section[id]').each(function() {
            const top = $(this).offset().top;
            const bottom = top + $(this).outerHeight();
            const id = $(this).attr('id');
            
            if (scrollPos >= top && scrollPos < bottom) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + id + '"]').addClass('active');
            }
        });
    });
}

/*===========================================
  SIDEBAR CLICK OUTSIDE TO CLOSE
===========================================*/
function initSidebarClickOutside() {
    $(document).click(function(e) {
        const $sidebar = $('#sidebar');
        const $toggle = $('.topbar-toggle, .mobile-toggle');
        
        if ($(window).width() <= 767 && $sidebar.hasClass('show')) {
            if (!$sidebar.is(e.target) && $sidebar.has(e.target).length === 0 &&
                !$toggle.is(e.target) && $toggle.has(e.target).length === 0) {
                closeMobileSidebar();
            }
        }
    });
    
    $(window).resize(function() {
        if ($(window).width() > 767) {
            closeMobileSidebar();
        }
    });
}

/*===========================================
  REVIEW CARDS ROTATION
===========================================*/
function initReviews() {
    $('.review-card').each(function(index) {
        const $card = $(this);
        const reviews = JSON.parse($card.attr('data-reviews'));
        let current = 0;
        
        const $body = $card.find('.card-body');
        $body.empty();
        
        reviews.forEach((review, i) => {
            const $item = $(`
                <div class="review-item ${i === 0 ? 'active' : ''}">
                    <p class="review-text">"${review.text}"</p>
                    <p class="review-author">— ${review.author}</p>
                </div>
            `);
            $body.append($item);
        });
        
        setTimeout(function() {
            setInterval(function() {
                $card.find('.review-item').removeClass('active');
                current = (current + 1) % reviews.length;
                $card.find('.review-item').eq(current).addClass('active');
            }, 5000);
        }, index * 1000);
    });
}

/*===========================================
  FORMS
===========================================*/
function initForms() {
    $('.newsletter-btn').click(function() {
        const $input = $('.newsletter-input');
        const email = $input.val().trim();
        
        if (email && isValidEmail(email)) {
            $input.removeClass('is-invalid').addClass('is-valid');
            showToast('success', 'Thank you for subscribing!');
            
            setTimeout(function() {
                $input.val('').removeClass('is-valid');
            }, 2000);
        } else {
            $input.removeClass('is-valid').addClass('is-invalid');
            showToast('danger', 'Please enter a valid email address.');
        }
    });
    
    $('.newsletter-input').on('input', function() {
        $(this).removeClass('is-invalid');
    });
    
    $('.newsletter-input').keypress(function(e) {
        if (e.which === 13) {
            $('.newsletter-btn').click();
        }
    });
}

/*===========================================
  SCROLL EFFECTS
===========================================*/
function initScrollEffects() {
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        $('.hero-section').css('transform', 'translateY(' + (scrolled * 0.02) + 'px)');
    });
}

/*===========================================
  BUTTON EFFECTS
===========================================*/
function initButtonEffects() {
    $('.btn-custom-primary, .btn-outline-custom, .btn-accent-custom').click(function(e) {
        const $btn = $(this);
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        $btn.find('.ripple').remove();
        
        const $ripple = $('<span class="ripple"></span>').css({
            width: size,
            height: size,
            left: x,
            top: y,
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
            transform: 'scale(0)',
            animation: 'rippleEffect 0.6s linear',
            pointerEvents: 'none'
        });
        
        $btn.css('position', 'relative').append($ripple);
        
        setTimeout(function() {
            $ripple.remove();
        }, 600);
    });
}

/*===========================================
  BOOTSTRAP COMPONENTS
===========================================*/
function initBootstrapComponents() {
    $('[data-bs-toggle="tooltip"]').each(function() {
        new bootstrap.Tooltip(this);
    });
    
    $('[data-bs-toggle="popover"]').each(function() {
        new bootstrap.Popover(this);
    });
}

/*===========================================
  ACCESSIBILITY
===========================================*/
function initAccessibility() {
    if (!$('.skip-to-main').length) {
        $('body').prepend(`
            <a href="#hero" class="skip-to-main visually-hidden-focusable btn btn-primary position-absolute" 
               style="top: 10px; left: 10px; z-index: 9999;">
                Skip to main content
            </a>
        `);
    }
    
    $('.nav-link').keydown(function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });
}

/*===========================================
  BOOK INTERACTIONS
===========================================*/
function initBookInteractions() {
    $('.book-image').hover(
        function() {
            $(this).css({
                'animation-play-state': 'paused',
                'transform': 'rotateY(-30deg) rotateX(10deg) rotateZ(-3deg) translateY(-8px) scale(1.02)'
            });
        },
        function() {
            $(this).css({
                'animation-play-state': 'running',
                'transform': ''
            });
        }
    ).click(function() {
        showToast('info', 'Book preview coming soon!');
    });
}

/*===========================================
  MOBILE SECTION TITLE UPDATER
===========================================*/
function initMobileSectionTitle() {
    const titleEl = document.getElementById('currentSectionTitle');
    if (!titleEl) return;

    const map = {
        hero: 'Home',
        about: 'About',
        resources: 'The Impact',
        promo: 'Buy the Book',
        reviews: 'Reviews',
        author: 'About the Author',
        contact: 'Get in Touch',
        newsletter: 'Stay Connected'
    };

    const sections = Object.keys(map)
        .map(function(id) { return document.getElementById(id); })
        .filter(Boolean);

    function updateTitle() {
        const vpCenter = window.innerHeight * 0.45;
        let current = sections[0];

        sections.forEach(function(sec) {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= vpCenter && rect.bottom >= vpCenter) current = sec;
        });

        if (current && map[current.id]) titleEl.textContent = map[current.id];
    }

    updateTitle();
    document.addEventListener('scroll', updateTitle, { passive: true });
    window.addEventListener('resize', updateTitle);
}

/*===========================================
  UTILITIES
===========================================*/
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(type, message) {
    const id = 'toast-' + Date.now();
    const html = `
        <div id="${id}" class="toast align-items-center text-white bg-${type} border-0 position-fixed" 
             style="top: 20px; right: 20px; z-index: 1060; min-width: 350px;" role="alert">
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    $('body').append(html);
    
    const toast = new bootstrap.Toast(document.getElementById(id));
    toast.show();
    
    $('#' + id).on('hidden.bs.toast', function() {
        $(this).remove();
    });
}