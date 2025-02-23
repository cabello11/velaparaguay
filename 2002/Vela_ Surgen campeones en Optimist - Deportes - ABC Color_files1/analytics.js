const id_prod = "UA-940226-1"; // abc.com.py
const id_beta = "UA-940226-16"; // beta.abc.com.py
const id_tm = "GTM-TQKRBZ9"; // google tag manager al parecer

/* use this */
const idUA = id_prod;

var imported = document.createElement("script");
imported.src = `https://www.googletagmanager.com/gtag/js?id=${idUA}`;
document.head.appendChild(imported);

function sendDataLayer() {
    window.dataLayer = window.dataLayer || [];

    let data = {};

    const author = document.querySelector('meta[name="cXenseParse:author"]');
    const sectionId = document.querySelector('meta[name="section_id"]');
    const pageType = document.querySelector('meta[name="page_type"]');
    const hasBeenUpdated = document.querySelector('meta[name="has_updated"]');

    if (author !== null) {
        data["author"] = author.content;
    }

    if (sectionId !== null) {
        data["section"] = sectionId.content;
    }

    if (pageType !== null) {
        data["page_type"] = pageType.content;

        if (pageType.content == "article" && hasBeenUpdated !== null) {
            data["has_been_updated"] = hasBeenUpdated.content;
        }
    }

    data["user_authenticated"] = "no";

    window.dataLayer.push(data);
}

sendDataLayer();

window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag("js", new Date());

/* gtag('config', idUA); */
gtag("config", idUA, {
    custom_map: {
        dimension1: "autor",
        dimension2: "edicion_impresa",
    },
});

function setCustomDimensionAuthor() {
    let authors = getAuthorsNames();
    authors.map((author) => {
        gtag("event", "firma_autor", {
            event_category: "Autores",
            event_label: author,
            autor: author,
        });
    });
}

function setCustomDimensionPrintedEdition() {
    const meta = document.querySelector(
        "meta[name='cXenseParse:azp-printededition']"
    );
    if (!!meta && meta.getAttribute("content") === "true") {
        const title = getPrintedEditionTitle();
        if (title) {
            gtag("event", "edicion_impresa", {
                event_category: "Articulos",
                event_label: title,
                edicion_impresa: title,
            });
        }
    }
}

function getPrintedEditionTitle() {
    const meta = document.querySelector("meta[name='cXenseParse:azp-title']");
    if (!!meta) {
        const title = meta.getAttribute("content");
        if (!!title && title.length) return title;
        return null;
    }
    return null;
}

function getAuthorsNames() {
    const meta = document.querySelector("meta[name='cXenseParse:author']");

    if (!meta) return [];

    let names = meta.getAttribute("content");
    if (!names.length) return [];

    return names.split("|");
}

/* set custom dimensions */
setCustomDimensionAuthor();
setCustomDimensionPrintedEdition();
