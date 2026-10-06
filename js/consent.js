// Cookie consent for Google Analytics. GA is loaded only after the visitor
// clicks "Accept"; until then no analytics script or cookie is set. The choice
// lives in localStorage, and any link with [data-cookie-settings] reopens the
// banner so the visitor can change it (privacy policy, section 6).
(function () {
    var GA_ID = "G-PF0R143FH2";
    var KEY = "mydepo-cookie-consent";

    var TEXT = {
        ro: {
            message: "Folosim cookie-uri Google Analytics pentru a înțelege cum este folosit site-ul. Le activăm doar cu acordul Dvs.",
            policy: "Politica de confidențialitate",
            policyUrl: "/privacy/",
            accept: "Accept",
            decline: "Refuz"
        },
        ru: {
            message: "Мы используем cookies Google Analytics, чтобы понимать, как используют сайт. Включаем их только с вашего согласия.",
            policy: "Политика конфиденциальности",
            policyUrl: "/ru/privacy/",
            accept: "Принять",
            decline: "Отклонить"
        }
    };

    function readChoice() {
        try {
            return window.localStorage.getItem(KEY);
        } catch (e) {
            return null;
        }
    }

    function saveChoice(value) {
        try {
            window.localStorage.setItem(KEY, value);
        } catch (e) {
            // Storage blocked: the choice applies to this page view only.
        }
    }

    function loadAnalytics() {
        if (window.__mydepoGaLoaded) {
            return;
        }
        window.__mydepoGaLoaded = true;
        var s = document.createElement("script");
        s.async = true;
        s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };
        window.gtag("js", new Date());
        window.gtag("config", GA_ID);
    }

    function deleteAnalyticsCookies() {
        var host = location.hostname.replace(/^www\./, "");
        document.cookie.split(";").forEach(function (c) {
            var name = c.split("=")[0].trim();
            if (name === "_ga" || name.indexOf("_ga_") === 0 || name.indexOf("_gcl_") === 0) {
                ["", "; domain=" + host, "; domain=." + host].forEach(function (d) {
                    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + d;
                });
            }
        });
    }

    function lang() {
        return (document.documentElement.lang || "ro").indexOf("ru") === 0 ? "ru" : "ro";
    }

    function hideBanner() {
        var el = document.getElementById("cookie-banner");
        if (el) {
            el.parentNode.removeChild(el);
        }
    }

    function showBanner() {
        hideBanner();
        var t = TEXT[lang()];
        var el = document.createElement("div");
        el.id = "cookie-banner";
        el.className = "cookie-banner";
        el.setAttribute("role", "dialog");
        el.setAttribute("aria-live", "polite");
        el.innerHTML =
            '<p class="cookie-banner__text">' + t.message +
            ' <a href="' + t.policyUrl + '">' + t.policy + "</a></p>" +
            '<div class="cookie-banner__buttons">' +
            '<button type="button" class="cookie-banner__btn cookie-banner__btn--decline">' + t.decline + "</button>" +
            '<button type="button" class="cookie-banner__btn cookie-banner__btn--accept">' + t.accept + "</button>" +
            "</div>";
        document.body.appendChild(el);

        el.querySelector(".cookie-banner__btn--accept").addEventListener("click", function () {
            saveChoice("granted");
            hideBanner();
            loadAnalytics();
        });
        el.querySelector(".cookie-banner__btn--decline").addEventListener("click", function () {
            var wasLoaded = window.__mydepoGaLoaded;
            saveChoice("denied");
            hideBanner();
            deleteAnalyticsCookies();
            // GA keeps running in an already-loaded page; reload to stop it.
            if (wasLoaded) {
                location.reload();
            }
        });
    }

    function init() {
        var choice = readChoice();
        if (choice === "granted") {
            loadAnalytics();
        } else if (choice !== "denied") {
            showBanner();
        }

        document.addEventListener("click", function (e) {
            var link = e.target.closest ? e.target.closest("[data-cookie-settings]") : null;
            if (link) {
                e.preventDefault();
                showBanner();
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
