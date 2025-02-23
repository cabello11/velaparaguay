console.log("init-article ads");

var REFRESH_KEY = "refresh";
var REFRESH_VALUE = "true";
// var interstitialSlot;

window.googletag = window.googletag || { cmd: [] };

googletag.cmd.push(function () {
    var mappingheadermbl = googletag
        .sizeMapping()
        .addSize([992, 0], [970, 90])
        .addSize(
            [320, 0],
            [
                [320, 100],
                [320, 50],
            ]
        )
        .addSize(
            [0, 0],
            [
                [300, 50],
                [300, 100],
                [320, 50],
                [320, 100],
            ]
        )
        .build();

    var mappingcenter = googletag
        .sizeMapping()
        .addSize(
            [992, 0],
            [
                [970, 90],
                [728, 90],
                [728, 180],
            ]
        )
        .addSize(
            [320, 0],
            [
                [320, 100],
                [320, 50],
            ]
        )
        .addSize(
            [0, 0],
            [
                [300, 50],
                [300, 100],
                [320, 50],
                [320, 100],
            ]
        )
        .build();

    var mappinglateral = googletag
        .sizeMapping()
        .addSize([992, 0], [120, 600])
        .addSize([768, 0], [])
        .addSize([320, 0], [])
        .addSize([0, 0], [])
        .build();

    //adUnits Display desktop y mobile
    googletag
        .defineSlot(
            "/54577773/abc_articulo/header",
            [
                [970, 90],
                [320, 100],
                [320, 50],
            ],
            "header_ad"
        )
        .defineSizeMapping(mappingheadermbl)
        .setTargeting(REFRESH_KEY, REFRESH_VALUE)
        .addService(googletag.pubads());
    googletag
        .defineSlot(
            "/54577773/abc_articulo/center",
            [
                [320, 100],
                [728, 90],
                [970, 90],
            ],
            "center_ad"
        )
        .defineSizeMapping(mappingcenter)
        .setTargeting(REFRESH_KEY, REFRESH_VALUE)
        .addService(googletag.pubads());
    googletag
        .defineSlot(
            "/54577773/abc_articulo/lateral_der",
            [120, 600],
            "lateral_der_ad"
        )
        .defineSizeMapping(mappinglateral)
        .setTargeting(REFRESH_KEY, REFRESH_VALUE)
        .addService(googletag.pubads());
    googletag
        .defineSlot(
            "/54577773/abc_articulo/lateral_izq",
            [120, 600],
            "lateral_izq_ad"
        )
        .defineSizeMapping(mappinglateral)
        .setTargeting(REFRESH_KEY, REFRESH_VALUE)
        .addService(googletag.pubads());
    googletag
        .defineSlot("/54577773/abc_articulo/floating", [1, 1], "floating_ad")
        .addService(googletag.pubads());
    googletag
        .defineSlot("/54577773/abc_articulo/slider", [1, 1], "slider_ad")
        .addService(googletag.pubads());
    googletag
        .defineSlot("/54577773/abc_articulo/inread", [1, 2], "inread_ad")
        .addService(googletag.pubads());
    googletag
        .defineSlot("/54577773/abc_articulo/sticky", [1, 3], "sticky_ad")
        .addService(googletag.pubads());

    googletag
        .defineSlot(
            "/54577773/abc_articulo/richmedia_expandible",
            [
                [320, 100],
                [320, 50],
                [375, 100],
            ],
            "richmedia_expandible_ad"
        )
        .addService(googletag.pubads());

    const anchor = googletag.defineOutOfPageSlot("/54577773/bottom_anchor_ABC", googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR);
    if (anchor) anchor.addService(googletag.pubads());

    // interstitialSlot = googletag.defineOutOfPageSlot('/54577773/web-itt_ABC', googletag.enums.OutOfPageFormat.INTERSTITIAL);
    // if (interstitialSlot) {
    //     interstitialSlot.addService(googletag.pubads());
    //     googletag.pubads().addEventListener('slotOnload', function (event) {
    //         if (interstitialSlot === event.slot) {
    //             document.getElementById('link').style.display = 'block';
    //         }
    //     });
    // }

    //Start refresh
    var SECONDS_TO_WAIT_AFTER_VIEWABILITY = 30; // 30 seconds
    googletag.pubads().addEventListener("impressionViewable", function (event) {
        var slot = event.slot;
        if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
            setTimeout(function () {
                if (slot.getTargeting("refreshed_slot")) {
                    slot.setTargeting("refreshed_slot", "true");
                }
                googletag.pubads().refresh([slot]);
            }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
        }
    });
    //End refresh

    //set key value
    if ( dfp_demo ) googletag.pubads().setTargeting("Demo", dfp_demo);
    if ( seccion ) googletag.pubads().setTargeting("section", seccion);
    if ( articleId ) googletag.pubads().setTargeting("articleid", articleId);
    if ( articleUri ) googletag.pubads().setTargeting("articleUri", articleUri);
    if ( tags && Array.isArray(tags) ) googletag.pubads().setTargeting("tag", tags);

    googletag.pubads().setCentering(true);
    googletag.pubads().enableSingleRequest();
    googletag.pubads().collapseEmptyDivs();
    googletag.enableServices();
});
