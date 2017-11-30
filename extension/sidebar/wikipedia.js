function messageDo(message) {
    url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=1&indexpageids=&prop=extracts&exintro=&explaintext=&titles='.concat(message.selected)
    urlString = fetch(url).then((resp) => resp.json())
    urlString.then(function(data) {
        pageid = data.query.pageids[0]
        if (pageid == '-1') {
            document.getElementById('selection').textContent = "Couldn't find a page for that!"
        } else if (data['query']['pages'][pageid]['extract'].indexOf("may refer to:") != "-1") {
            document.getElementById('selection').textContent = "There are multiple results, try something less ambiguous"
        } else {
            document.getElementById('title').textContent = message.selected
            document.getElementById('selection').textContent = data['query']['pages'][pageid]['extract']
            reference = document.createElement('a')
            reference.setAttribute('href', 'https://en.wikipedia.org/wiki/'.concat(message.selected))
            reference.textContent = "Source"
            document.getElementById('reference').appendChild(reference)
        }
    })
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
