// requires for webpack loading
require('./index.html');
require('./home.html');
require('./education.html');
require('./health.html');
require('./community.html');
require('./multifaith.html');
require('./about.html');
require('./events.html');
require('./contact.html');
require('./join.html');
require('./css/style.scss');

var $ = require('jquery');

// Navbar Management

$('.burger').click(function () {
    $('.burger').toggleClass('is-active');
    $('#' + this.dataset.target).toggleClass('is-active');
});

$('.navbar-item').click(function () {
    $('.burger').removeClass('is-active');
    $('.navbar-menu').removeClass('is-active');
});

// Page Navigation Management

var homeID = 'home';
var contentID = 'content';
var LOADING_CLASS = 'is-loading';
var LOADING_INTERVAL = 50; // (ms)
var pageFilled = false;
// tree of mappings between navigation buttons and page HTML
var RESERVED_KEYS = ['html', 'fetching', 'toc'];
var navMap = {
    home: {
        education: {
            toc: true
        },
        health: {
            toc: true
        },
        community: {
            toc: true
        },
        multifaith: {
            toc: true
        }
    },
    about: {},
    events: {},
    contact: {},
    join: {}
};

// initialize page HTML once the page is rendered
$(function () {
    var pageID = currentPage();
    updatePage(pageID);
    window.history.replaceState({
        pageID: pageID
    }, '', '#' + pageID);
});

// retrieves the current page based on the hash in the current URL
function currentPage() {
    return window.location.hash.substring(1, window.location.hash.length) ||
        homeID;
}

// recurses the tree of page navigation to find the mapping if it exists
function findPageMap(pageMap, pageID) {
    if (pageID in pageMap) return pageMap;
    return Object.keys(pageMap).reduce(function (acc, id) {
        if (RESERVED_KEYS.includes(id)) return acc;
        return findPageMap(pageMap[id], pageID) || acc;
    }, null);
}

// fetch the HTML for a page in the page map
function fetchHTML(pageMap, pageID) {
    if (!pageMap[pageID].html && !pageMap[pageID].fetching) {
        pageMap[pageID].fetching = true;
        $.get(pageID + '.html',
            function (data) {
                pageMap[pageID].html = data;
                pageMap[pageID].fetching = false;
            },
            'html'
        ).fail(function () {
            pageMap[pageID].fetching = false;
            fetchHTML(pageMap, pageID);
        });
    }
}

// the map that was previously registered with click callbacks
var prevRegisteredMap;

// updates the current page to a new page
function updatePage(pageID) {
    var pageMap = findPageMap(navMap, pageID);
    if (!pageMap) return;

    if ($('#' + contentID).hasClass(LOADING_CLASS) && !pageMap[pageID].html) {
        fetchHTML(pageMap, pageID);
        setTimeout(function () {
            updatePage(pageID);
        }, LOADING_INTERVAL);
        return;
    }

    $('#' + contentID).fadeOut(function () {
        $('#' + contentID).removeClass(LOADING_CLASS);
        if (pageMap[pageID].html) {
            unregisterPageNavigators(prevRegisteredMap);
            $('#' + contentID).html(pageMap[pageID].html);
            if (pageMap[pageID].toc) {
                createTOC();
            }
            registerPageNavigators(pageMap[pageID]);
            prevRegisteredMap = pageMap[pageID];
            window.scrollTo(0, 0);
        } else {
            $('#' + contentID).empty();
            $('#' + contentID).addClass(LOADING_CLASS);
            fetchHTML(pageMap, pageID);
            setTimeout(function () {
                updatePage(pageID);
            }, LOADING_INTERVAL);
        }
        $('#' + contentID).fadeIn();
    });
}

// unbinds all events from the pages in the provided page map
function unregisterPageNavigators(pageMap) {
    if (!pageMap) return;

    Object.keys(pageMap).forEach(function (pageID) {
        if (RESERVED_KEYS.includes(pageID)) return;
        $('#' + pageID).unbind();
    });
}

// fetches page HTML and binds click callbacks to page navigation
function registerPageNavigators(pageMap) {
    if (!pageMap) return;

    Object.keys(pageMap).forEach(function (pageID) {
        if (RESERVED_KEYS.includes(pageID)) return;

        // prefetch HTML for each page if it has not been downloaded already
        fetchHTML(pageMap, pageID);

        // register click callbacks that render corresponding page HTML
        $('#' + pageID).click(function () {
            if (pageID != currentPage()) {
                updatePage(pageID);
                window.history.pushState({
                    pageID: pageID
                }, '', '#' + pageID);
            }
            return false;
        });
    });
}

// updates the page according to browser navigation
window.onpopstate = function (e) {
    updatePage(e.state.pageID);
};

// linking navbar items to their respective page HTML
$(function () {
    registerPageNavigators(navMap);
});

// Page Management

// automatically creates a table of contents for the current page
function createTOC() {
    $('h4').each(function (index) {
        var id = $(this).attr('id');
        $('#toc').append('<a id=' + id + '-link class="is-size-4-desktop is-size-5-touch">' + $(this).text() + '</a><br>');
        $('#' + id + '-link').click(function () {
            $('html, body').animate({
                scrollTop: $('#' + id).offset().top - $('.navbar').height() - 10
            }, 1000);
        });
    });
}

// Quote Bank Management

var quoteID = 'quote';
var quoteSubtitleID = 'quote-subtitle';
var QUOTE_TIME = 15; // (s)
var QUOTES = [
    {quote: 'Love All, Serve All', isSai: true},
    {quote: 'Help Ever, Hurt Never', isSai: true},
    {quote: 'There is only one religion, the religion of love', isSai: true},
    {quote: 'There is only one caste, the caste of humanity', isSai: true},
    {quote: 'There is only one language, the language of the heart', isSai: true},
    {quote: 'Do not pollute your service with the poison of pride', isSai: true},
    {quote: 'Feel that you are serving yourself, curbing the ego', isSai: true},
    {quote: 'Engage in humble service and egoism will fade away', isSai: true},
    {quote: 'Serve because you are urged by Love not by reward', isSai: true}
    // {quote: 'Hands that serve are holier than lips that pray', isSai: false},
    // {quote: 'Service to man is service to God', isSai: false},
];
var quotes = QUOTES.slice(1, 5);

// shuffles the quote being shown
function shuffleQuote() {
    if (quotes.length == 0) quotes = QUOTES.slice();
    var quoteIndex = Math.floor(Math.random() * quotes.length);
    while (('"' + quotes[quoteIndex].quote + '"') == $('#' + quoteID).html()) {
        quoteIndex = Math.floor(Math.random() * quotes.length);
    }
    var quote = quotes[quoteIndex].quote;
    var isSai = quotes[quoteIndex].isSai;
    quotes.splice(quoteIndex, 1);
    $('#' + quoteID).fadeOut('slow', function () {
        if (isSai) {
            $('#' + quoteSubtitleID).fadeTo('slow', 1);
        } else {
            $('#' + quoteSubtitleID).fadeTo('slow', 0);
        }
        $('#' + quoteID).html('"' + quote + '"').fadeIn('slow');
    });
    setTimeout(shuffleQuote, QUOTE_TIME * 1000);
}
$(function () {
    setTimeout(shuffleQuote, QUOTE_TIME * 1000);
});
