/*  BodyCurry
    Ankit Patil
    The Banana Design Company */


(function ($) {
    $(window).on('load', function () {

        // Init wow js
        new WOW().init();
        $('body').delay(1000).css('background', 'none');

        // Animate scrolls
        $('.bullets ul li a, #landing .scroll').click(function (e) {
            e.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top
            }, 900, 'easeInOutQuart');
        });

        // Parallax
        $(window).scroll(function () {
            $('#landing').css('backgroundPosition', 'center ' + $(window).scrollTop() / 3 + 'px');
        });

        // Get in touch
        $('#landing .touch, .touch-sticky').click(function (e) {
            e.preventDefault();

            $('html, body').animate({
                scrollTop: $('.contact').offset().top
            }, 900, 'easeInOutQuart', function () {
                $('.contact #inputName').focus();
            });
        });

        // Intro animations
        $('#introducing .points a').click(function (e) {
            e.preventDefault();

            $('#introducing .points .content span, #introducing .boxes').addClass('quick');

            $('#introducing .back-button h2, #introducing .back-button p, #introducing .content h4, #introducing .content p').attr('style', '').removeClass('wow fadeInUp').addClass('fadeOutUp animated');
            $('#introducing .icon, #introducing .icon span, #introducing .content span, #introducing .boxes').attr('style', '').removeClass('wow fadeIn').addClass('fadeOut animated');
            setTimeout(function () {
                $('#introducing .back-button h2, #introducing .back-button p, #introducing .boxes').attr('style', '').css('visibility', 'hidden');
            }, 900);

            switch ($(this).data('open')) {
            case 'sanitary':
                setTimeout(function () {
                    $('#introducing .default').css('display', 'none');
                    $('#introducing .sanitary').css('display', 'block');
                    $('#introducing .sanitary h2, #introducing .sanitary p').removeClass('fadeOutUp').addClass('fadeInUp animated').css('visibility', 'visible');
                    $('#introducing .sanitary img').removeClass('zoomOut').addClass('zoomIn animated').css('visibility', 'visible');
                    $('#introducing .sanitary .sub').removeClass('quick fadeOut').addClass('fadeIn animated').css('visibility', 'visible');
                    $('#introducing .back-button a').removeClass('quick fadeOut').addClass('fadeIn animated').css('visibility', 'visible');
                }, 1200);
                break;
            case 'dry':
                setTimeout(function () {
                    $('#introducing .default').css('display', 'none');
                    $('#introducing .dry').css('display', 'block');
                    $('#introducing .dry h2, #introducing .dry p').removeClass('fadeOutUp').addClass('fadeInUp animated').css('visibility', 'visible');
                    $('#introducing .dry img').removeClass('zoomOut').addClass('zoomIn animated').css('visibility', 'visible');
                    $('#introducing .dry .sub').removeClass('quick fadeOut').addClass('fadeIn animated').css('visibility', 'visible');
                    $('#introducing .back-button a').removeClass('quick fadeOut').addClass('fadeIn animated').css('visibility', 'visible');
                }, 1200);
                break;
            case 'oily':
                setTimeout(function () {
                    $('#introducing .default').css('display', 'none');
                    $('#introducing .oily').css('display', 'block');
                    $('#introducing .oily h2, #introducing .oily p').removeClass('fadeOutUp').addClass('fadeInUp animated').css('visibility', 'visible');
                    $('#introducing .oily img').removeClass('zoomOut').addClass('zoomIn animated').css('visibility', 'visible');
                    $('#introducing .oily .sub').removeClass('quick fadeOut').addClass('fadeIn animated').css('visibility', 'visible');
                    $('#introducing .back-button a').removeClass('quick fadeOut').addClass('fadeIn animated').css('visibility', 'visible');
                }, 1200);
                break;
            case 'travel':
                setTimeout(function () {
                    $('#introducing .default').css('display', 'none');
                    $('#introducing .travel').css('display', 'block');
                    $('#introducing .travel h2, #introducing .travel p').removeClass('fadeOutUp').addClass('fadeInUp animated').css('visibility', 'visible');
                    $('#introducing .travel img').removeClass('zoomOut').addClass('zoomIn animated').css('visibility', 'visible');
                    $('#introducing .travel .sub').removeClass('quick fadeOut').addClass('fadeIn animated').css('visibility', 'visible');
                    $('#introducing .back-button a').removeClass('quick fadeOut').addClass('fadeIn animated').css('visibility', 'visible');
                }, 1200);
                break;
            }
        });

        // Close button
        $('#introducing .back-button a').click(function (e) {
            e.preventDefault();

            $('#introducing h2, #introducing p').removeClass('fadeInUp').addClass('fadeOutUp');
            $('#introducing div:not(.sub) img:not(.boxes)').removeClass('zoomIn').addClass('zoomOut');
            $('#introducing .back-button a, #introducing .sub').removeClass('fadeIn').addClass('fadeOut quick');

            setTimeout(function () {
                $('#introducing .sanitary, #introducing .dry, #introducing .oily, #introducing .travel').css('display', 'none');
                $('#introducing .default').css('display', 'block');
                $('#introducing .back-button h2, #introducing .back-button p, #introducing .boxes').attr('style', '').css('visibility', 'visible');
                $('#introducing .back-button h2, #introducing .back-button p, #introducing .content h4, #introducing .content p').removeClass('fadeOutUp').addClass('fadeInUp animated');
                $('#introducing .icon, #introducing .icon span, #introducing .content span, #introducing .boxes').removeClass('fadeOut quick').addClass('fadeIn animated');
            }, 1200);
        });

        // Add class to open accordion
        $('#accordion')
            .on('show.bs.collapse', function (e) {
                $(e.target).prev('.panel-heading').addClass('active');
            })
            .on('hide.bs.collapse', function (e) {
                $(e.target).prev('.panel-heading').removeClass('active');
            });

        // Remove animate class after anim on button
        $('.contact button').parent().on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('wow fadeInUp').attr('style', '');
        });

        // Contact form
        $('.contact form').validator().on('submit', function (e) {
            if (e.isDefaultPrevented()) {
                // handle the invalid form...
            } else {
                e.preventDefault();
                $.ajax({
                    url: 'contact.php',
                    type: 'post',
                    data: {
                        'name': $('.contact form #inputName').val(),
                        'email': $('.contact form #inputMail').val(),
                        'phone': $('.contact form #inputNo').val(),
                        'interested': $('.contact form select option:selected').val()
                    }
                }).done(function (response, textStatus, jqXHR) {
                    console.log(response);
                    $('.contact input, .contact button').attr('disabled', true);
                    $('.contact .cs-skin-border').addClass('disabled').parent().css('cursor', 'not-allowed');
                    $('.success-message').css('display', 'block').animate({
                        'opacity': 1
                    }, 300, function () {
                        $(this).click(function (e) {
                            e.preventDefault();
                            $(this).animate({
                                'opacity': 0
                            }, 300, function () {
                                $(this).remove()
                            });
                        });
                    });
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    console.error(
                        "The following error occurred: " +
                        textStatus, errorThrown
                    );
                });
            }
        });
        $('#inputMail').focusout(function () {
            setTimeout(function () {
                if ($('#inputMail').parent().hasClass('has-error')) {
                    $('#inputMail').css('color', '#FFF');
                    $('#inputMail').siblings('span').css('display', 'block').animate({
                        'opacity': 1
                    }, 300);
                }
            }, 450);
        }).focus(function () {
            $(this).attr('placeholder', '');
            $(this).css('color', '#404040');
            $(this).siblings('span').css({
                'display': 'none',
                'opacity': 0
            });
        });
        $('#inputNo').focusout(function () {
            setTimeout(function () {
                if ($('#inputNo').parent().hasClass('has-error')) {
                    $('#inputNo').css('color', '#FFF');
                    $('#inputNo').siblings('span').css('display', 'block').animate({
                        'opacity': 1
                    }, 300);
                }
            }, 10);
        }).focus(function () {
            $(this).attr('placeholder', '');
            $(this).css('color', '#404040');
            $(this).siblings('span').css({
                'display': 'none',
                'opacity': 0
            });
        });

        // Select style
        [].slice.call(document.querySelectorAll('select.cs-select')).forEach(function (el) {
            new SelectFx(el);
        });

        // Analytics
        $.ajax({
            url: "analytics.php"
        }).done(function (response, textStatus, jqXHR) {
            console.log(response);
        });

    });
})(jQuery);
