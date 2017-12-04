function wikipediaImage(selection){
    url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=1&indexpageids=&prop=pageimages&pithumbsize=280&titles=' + selection
    urlString = fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            pageid = data.query.pageids[0]
            if (pageid != '-1' && data['query']['pages'][pageid]['thumbnail'] != undefined) {
                thumbnail = document.createElement('img')
                thumbnail.setAttribute('src', data['query']['pages'][pageid]['thumbnail']['source'])
                thumbnail.setAttribute('alt', data['query']['pages'][pageid]['title'])
                document.getElementById('thumbnail').appendChild(thumbnail)
            }
        })
}

function wikipediaBody(selection){
    url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=1&indexpageids=&prop=extracts&exintro=&explaintext=&titles=' + selection
    urlString = fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            pageid = data.query.pageids[0]
            if (pageid == '-1') {
                document.getElementById('selection').textContent = "Couldn't find a page for that!"
            } else if (data['query']['pages'][pageid]['extract'].indexOf("may refer to:") != "-1") {
                document.getElementById('selection').textContent = "There are multiple results, try something less ambiguous"
            } else {
                document.getElementById('title').textContent = selection
                document.getElementById('selection').textContent = data['query']['pages'][pageid]['extract']
                reference = document.createElement('a')
                reference.setAttribute('href', 'https://en.wikipedia.org/wiki/' + selection)
                reference.textContent = "Wikipedia"
                document.getElementById('reference').appendChild(reference)
                wikipediaImage(selection)
            }
        })
}

function messageDo(message) {
    selection = message.selected
    wikipediaBody(selection)
}

function tabDo(tabs) {
    for (let tab of tabs) {
        browser.runtime.onMessage.addListener(messageDo);
        var tabScript = browser.tabs.executeScript(tab.id, {file: 'getselection.js'});
    }
};

function init() {
    var queryTabs = browser.tabs.query({currentWindow: true, active: true})
    queryTabs.then(tabDo)
};

init();
