function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    var re = /[-+]?([0-9]{9,13}$)/;
    return re.test(String(phone).toLowerCase());
}

// Forms are delivered by Web3Forms (https://web3forms.com) instead of the old
// Laravel POST /send and POST /send-phone endpoints. access_key, subject and
// from_name live as hidden inputs in the HTML.
var FORM_ENDPOINT = "https://api.web3forms.com/submit";

function submitForm($form, requiredFields, onSuccess, onError) {
    var form = $form[0];

    // The old server-side validator enforced these; keep the same behaviour.
    var missing = requiredFields.filter(function (name) {
        var el = form.elements[name];
        if (!el) {
            return true;
        }
        return String(el.value).replace(/[^0-9A-Za-zА-Яа-яЁёĂÂÎȘȚăâîșț]/g, "").length === 0;
    });
    if (missing.length) {
        onError();
        return;
    }

    fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form)
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (response) {
            if (response && response.success) {
                onSuccess();
                form.reset();
            } else {
                onError();
            }
        })
        .catch(function () {
            onError();
        });
}

$("#contacts-form").on("submit", function (e) {
    e.preventDefault();
    submitForm(
        $(this),
        ["firstName", "phone", "address", "message"],
        function () {
            $(".message-erorr").removeClass("erorr");
            $(".message-success").addClass("send");
            setTimeout(function () {
                $(".message-success").removeClass("send");
            }, 6000);
        },
        function () {
            $(".message-success").removeClass("send");
            $(".message-erorr").addClass("erorr");
        }
    );
});

// handle links with @href started with '#' only
$(document).on('click', 'a[href^="#"]', function (e) {
    // target element id
    var id = $(this).attr('href');
    // target element
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }
    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();
    // top position relative to the document
    var pos = $id.offset().top - 120;

    // animated top scrolling
    $('body, html').animate({scrollTop: pos});
});


$("#send-phone").on("submit", function (e) {
    e.preventDefault();
    submitForm(
        $(this),
        ["phone"],
        function () {
            $(".message").addClass("active");
            setTimeout(function () {
                $(".message").removeClass("active");
            }, 6000);
        },
        function () {
            $(".message").addClass("eroare");
        }
    );
});


$(document).ready(function () {

    $(".datepicker").datepicker();
});

$(".burger").on("click", function () {
    $(this).toggleClass("active");
    $(".menu").toggleClass("active");
});
$('.menu_item').on('click', function () {
    $(".menu").removeClass('active')
    $(".burger").removeClass('active')

})

$(".button_ok_close_modal").on("click", function () {
    let fade = $(".modal_fade");
    fade.removeClass("active");
    fade.removeClass("eroare");
});

if ($(".modal_fade").hasClass("active")) {
    $("body").css("overflow", "hidden");
}

$(document).on("click", ".count-btn", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(".dropdown-item").removeClass("active");
    // $.closest("li").toggleClass('active')
    $(e.target)
        .closest(".dropdown-item")
        .addClass("active");
});

$(".location").on("click", function (e) {
    e.preventDefault();
    $(".submenu-dropdown").toggleClass("active");
});
$(".question").on("click", function () {
    $(this)
        .closest(".single_question")
        .toggleClass("active");
});

// inputmask.js is only loaded on the landing pages; guard so the rest of this
// file keeps running on /rights and /ru/rights (it used to throw there).
if ($.fn.inputmask) {
    // Target the phone field by name. A broader ".send_phone_number input"
    // also matches the hidden Web3Forms fields in the same form, and the mask
    // would overwrite the access key with a phone number.
    $(
        ".send_phone_number input[name='phone'] , .s-contacts-form .form-group.phone input[name='phone']"
    ).inputmask({
        mask: "(+373) 99-999-999",
        // greedy: true,
        placeholder: "0",
        // numericInput: true,
        // autoUnmask: true,
        // alias: "datetime",
        // alias: "email",
        // numericInput: true,
        showMaskOnFocus: true,
        showMaskOnHover: false
    });
}

// swiper.js is likewise landing-page only.
if (typeof Swiper !== "undefined" && $(document).width() < 500) {
    var swiper = new Swiper(".swiper-list", {
        slidesPerView: "auto",
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        }
    });
}

// swiperList();
//
// $(window).on("resize", function () {
//     swiperList();
// });
