
$(document).ready(function() {
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 1;
    var syncedSecondary = true;
  
    sync1.owlCarousel({
        items: 1,
        slideSpeed: 1000,
        nav: true,
        autoplay: true, 
        dots: true,
        loop: true,
        responsiveRefreshRate: 1000,
        navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #fff;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #fff;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
    }).on('changed.owl.carousel', syncPosition);
  
    sync2
        .on('initialized.owl.carousel', function() {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: 1,
            slideSpeed: 1000,
            dots: false,
            nav: false,
            slideBy: slidesPerPage,
            responsiveRefreshRate: 1000
        }).on('changed.owl.carousel', syncPosition2);
  
    function syncPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);
  
        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }
        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();
  
        if (current > end) {
            sync2.data('owl.carousel').to(current, 1000, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 1000, true);
        }
    }
  
    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 1000, true);
        }
    }
  
    sync2.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 1000, true);
    });
  });