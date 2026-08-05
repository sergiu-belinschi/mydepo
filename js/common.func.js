$(function () {

    $('body').on('click', '#js-faq .item', function (e) {
        e.preventDefault();
        var $item = $(this);
        var $el = $item.find('.item-answer');
        if ($item.hasClass('active')) {
            $el.slideUp('1000', function () {
                $item.removeClass('active');
            });
        } else {
            //$(this).height(0).addClass('active');
            $el.slideDown('1000', function () {
                $item.addClass('active');
            });
        }
    });

    $('#contacts-form .form-control').each(function () {
        var $el = $(this);
        if ($el.val().length !== 0) {
            $el.parent().addClass('active');
        }
    });

    $('body').on('focus', '#contacts-form .form-control', function () {
        var $el = $(this);
        $el.parent().addClass('active');
    }).on('blur', '#contacts-form .form-control', function () {
        var $el = $(this);
        // console.log($el.val().length);
        if ($el.val().length === 0) {
            $el.parent().removeClass('active');
        }
    });

    $('body').on('click', '#btn-hamburger', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-opened');
    });
    $('body').on('click', function (e) {
        var target = $(e.target),
            hasTargets = target.is("#content-nav") || target.is("#content-nav *") || target.is("#btn-hamburger") || target.is("#btn-hamburger *");

        if (!hasTargets && winSize() <= 1500) {
            $('body').removeClass('sidebar-opened');
        }
    });


    // $(document).on("scroll", onScroll);


    $('#content-nav a').on('click', function (e) {


        let target2 = $(e.target);

        // console.log($(e).closest(".submenu-dropdown").length, target2.is(".submenu-dropdown *"))
        if ($(e).closest(".submenu-dropdown").length || target2.is(".submenu-dropdown *"))
        // return;

            var href = $(e.target).attr("href");
        if (href && href.length && href[0] !== '#')
            return;
        e.preventDefault();

        $(document).off("scroll");

        $('#content-nav a, .s-offer-content a.btn').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);

        if ($('body').hasClass('sidebar-opened')) {
            $('body').toggleClass('sidebar-opened');
            setTimeout(function () {
                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top
                }, 1000, 'easeInOutCubic', function () {
                    window.location.hash = target;
                    $(document).on("scroll", onScroll);
                    // console.log(window.location.hash)
                });
            }, 300);
        } else {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 1000, 'easeInOutCubic', function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        }
    });

    // function onScroll(event) {
    //     let scrollPos = $(document).scrollTop();
    //     $('#content-nav a, span').each(function () {
    //         var currLink = $(this);
    //         var refElement = $(currLink).attr("href");
    //         if (refElement && refElement.length && refElement[0] !== '#')
    //             return;
    //         if ($(refElement).offset().top <= scrollPos && $(refElement).offset().top + $(refElement).outerHeight() > scrollPos) {
    //             $('#content-nav a').removeClass("active");
    //             $(currLink).addClass("active");
    //         } else {
    //             $(currLink).removeClass("active");
    //         }
    //     });
    // }

    checkMaps();
    $(window).on('resize', function () {
        winSize();
        checkMaps();
    });

    function checkMaps() {
        // if (winSize() <= 1750 && winSize() >= 1200) {
        //     $(".s-contacts-footer > div:first-child").addClass('item-active');
        //     $(".s-contacts-footer > div:last-child").addClass('item-inactive');
        //
        //     $('.s-contacts-form').on('click', function () {
        //         $('.s-contacts-form').removeClass('item-inactive').addClass('item-active');
        //         $('.s-contacts-map').removeClass('item-active').addClass('item-inactive');
        //     });
        //     $('.s-contacts-map').on('click', function () {
        //         $('.s-contacts-map').removeClass('item-inactive').addClass('item-active');
        //         $('.s-contacts-form').removeClass('item-active').addClass('item-inactive');
        //     });
        // } else {
        //     $(".s-contacts-footer > div").removeClass('item-active').removeClass('item-inactive');
        // }
    }


});

function winSize() {
    return $(window).width();
}

