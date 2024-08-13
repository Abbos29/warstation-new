//Ленивая загрузка метрики и call трекинга
function lazyLoadMetrica() {
    // Флаг, что Метрика уже загрузилась.
    var loadedMetrica = false,
        // Переменная для хранения таймера.
        timerId;

    // Для бота Яндекса грузим Метрику сразу без "отложки",
    // чтобы в панели Метрики были зелёные кружочки
    // при проверке корректности установки счётчика.
    if (window.self !== window.top ||
         location.search.includes('_ym_status-check') ||
         window.top.location.pathname.includes('/inpage/')) {

        loadMetrica();
    } else {
        // Подключаем Метрику, если юзер начал скроллить.
        window.addEventListener('scroll', loadMetrica, { passive: true });

        // Подключаем Метрику, если юзер коснулся экрана.
        window.addEventListener('touchstart', loadMetrica);

        // Подключаем Метрику, если юзер дернул мышкой.
        document.addEventListener('mouseenter', loadMetrica);

        // Подключаем Метрику, если юзер кликнул мышкой.
        document.addEventListener('click', loadMetrica);

        // Подключаем Метрику при полной загрузке DOM дерева,
        // с "отложкой" в 1 секунду через setTimeout,
        // если пользователь ничего вообще не делал (фоллбэк).
        // document.addEventListener('DOMContentLoaded', loadFallback);
    }

    function loadFallback() {
        timerId = setTimeout(loadMetrica, 1000);
    }

    function loadMetrica(e) {
        // загружаем метрику и остальные ленивые скрипты
        // Если флаг загрузки Метрики отмечен,
        // то ничего более не делаем.
        if (loadedMetrica) {
            return;
        }
        //загружаем метрику
        (function (m, e, t, r, i, k, a) {
            m[i] =
                m[i] ||
                function () {
                    (m[i].a = m[i].a || []).push(arguments);
                };
            m[i].l = 1 * new Date();
            for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) {
                    return;
                }
            }
            (k = e.createElement(t)),
                (a = e.getElementsByTagName(t)[0]),
                (k.async = 1),
                (k.src = r),
                a.parentNode.insertBefore(k, a);
        })(
            window,
            document,
            "script",
            "https://mc.yandex.ru/metrika/tag.js",
            "ym"
        );

            ym(92197085, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
            });
        //загружаем Google Tag Manager трекинг
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })
        (window,document,'script','dataLayer','GTM-K499VQC8');
        // Top.Mail.Ru counter
        var _tmr = window._tmr || (window._tmr = []);
        _tmr.push({
            id: "3379940",
            type: "pageView",
            start: new Date().getTime(),
        });
        (function (d, w, id) {
            if (d.getElementById(id)) return;
            var ts = d.createElement("script");
            ts.type = "text/javascript";
            ts.async = true;
            ts.id = id;
            ts.src = "https://top-fwz1.mail.ru/js/code.js";
            var f = function () {
                var s = d.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(ts, s);
            };
            if (w.opera == "[object Opera]") {
                d.addEventListener("DOMContentLoaded", f, false);
            } else {
                f();
            }
        })(document, window, "tmr-code");

        // amochat
        (function (a, m, o, c, r, m) {
            a[m] = {
                id: "398188",
                hash: "42527167aba6f00cd041adae42e2555f28cc7c154db1049e2e4c0b4099eba304",
                locale: "ru",
                inline: false,
                setMeta: function (p) {
                this.params = (this.params || []).concat([p]);
                },
            };
            a[o] =
                a[o] ||
                function () {
                (a[o].q = a[o].q || []).push(arguments);
                };
            var d = a.document,
                s = d.createElement("script");
            s.async = true;
            s.id = m + "_script";
            s.src = "https://gso.amocrm.ru/js/button.js";
            d.head && d.head.appendChild(s);
        })(window, 0, "amoSocialButton", 0, 0, "amo_social_button");

        // calltouch 
        (function(w,d,n,c){w.CalltouchDataObject=n;w[n]=function(){w[n]["callbacks"].push(arguments)};if(!w[n]["callbacks"]){w[n]["callbacks"]=[]}w[n]["loaded"]=false;if(typeof c!=="object"){c=[c]}w[n]["counters"]=c;for(var i=0;i<c.length;i+=1){p(c[i])}function p(cId){var a=d.getElementsByTagName("script")[0],s=d.createElement("script"),i=function(){a.parentNode.insertBefore(s,a)},m=typeof Array.prototype.find === 'function',n=m?"init-min.js":"init.js";s.async=true;s.src="https://mod.calltouch.ru/"+n+"?id="+cId;if(w.opera=="[object Opera]"){d.addEventListener("DOMContentLoaded",i,false)}else{i()}}})(window,document,"ct","1sw9hdvz");

        // Отмечаем флаг, что Метрика загрузилась,
        // чтобы не загружать её повторно при других
        // событиях пользователя и старте фоллбэка.
        loadedMetrica = true;

        // Очищаем таймер, чтобы избежать лишних утечек памяти.
        clearTimeout(timerId);

        // Отключаем всех наших слушателей от всех событий,
        // чтобы избежать утечек памяти.
        window.removeEventListener('scroll', loadMetrica);
        window.removeEventListener('touchstart', loadMetrica);
        document.removeEventListener('mouseenter', loadMetrica);
        document.removeEventListener('click', loadMetrica);
        // document.removeEventListener('DOMContentLoaded', loadFallback);
    }
}
window.lazyLoadMetrica = lazyLoadMetrica;
