// Disambiguation
function disambiguate(selection) {

  body = document.body
    
  // Fetch HTML page
  url = 'https://en.wikipedia.org/wiki/' +  selection
  urlString = fetch(url)
    .then((resp) => resp.text())
    .then(function(data) {
      parser = new DOMParser()
      doc = parser.parseFromString(data, "text/html")
      
      // Put everything under suggestions
      suggestions = document.createElement('div')
      suggestions.setAttribute('id', 'suggestions')

      // Make introduction line
      intro = document.createElement('div')
      intro.setAttribute('id', 'intro')
      introSelection = document.createElement('b')
      introSelection.textContent = selection
      introRest = document.createTextNode(' may refer to:')
      intro.appendChild(introSelection)
      intro.appendChild(introRest)
      suggestions.appendChild(intro)

      // Get all relevant nodes
      mwparser = doc.querySelector('.mw-parser-output')
      candidateNodes = mwparser.querySelectorAll(':scope > ul, :scope > h2, :scope > dl')
      for (i = 0; i < candidateNodes.length; i++){

        // Make a domain section
        if (candidateNodes[i].tagName == 'H2') {
          sectionNode = candidateNodes[i].querySelector('.mw-headline')
          section = document.createElement('div')
          section.setAttribute('class', 'domain')
          section.textContent = sectionNode.textContent
          suggestions.appendChild(section)

          // Make a similar word section
        } else if (candidateNodes[i].tagName == 'DL') {
          section = document.createElement('div')
          section.setAttribute('class', 'similar')
          section.textContent = candidateNodes[i].textContent
          suggestions.appendChild(section)

          // Make disambiguation candidates
        } else {
          candidateNodes[i].querySelectorAll('li').forEach((candidate) => {

            // Put a candidate's nodes under candidateDisplay
            candidateDisplay = document.createElement('p')
            candidateDisplay.setAttribute('class', 'candidate')
            candidate.childNodes.forEach((c) => {

              // Make candidate links
              if (c.tagName == 'A') {
                if (c.getAttribute('class') == 'external text') {
                  cLink = document.createElement('a')
                  cLink.setAttribute('href', c.getAttribute('href'))
                  cLink.setAttribute('class', 'external')
                  cLink.textContent = c.textContent
                } else if (c.getAttribute('class') == 'new') {
                  cLink = document.createTextNode(c.textContent)
                } else {
                  cLink = document.createElement('a')
                  cLink.setAttribute('class', 'wiki')
                  cLink.textContent = c.getAttribute('title')
                  cLink.addEventListener("click", function( event ) {
                    suggestions.remove()
                    wikipediaBody(event.target.textContent)
                  })
                }
                candidateDisplay.appendChild(cLink)

                // Make candidate text
              } else if (c.nodeType == 3) {
                cText = document.createTextNode(c.textContent)
                candidateDisplay.appendChild(cText)

                // Make candidate italic links and text
              } else if (c.tagName == 'I') {
                iNode = document.createElement('i')
                c.childNodes.forEach((i) => {
                  if (i.tagName == 'A') {
                    iLink = document.createElement('a')
                    iLink.setAttribute('class', 'wiki')
                    iLink.textContent = i.getAttribute('title')
                    iLink.addEventListener("click", function( event ) {
                      suggestions.remove()
                      wikipediaBody(event.target.textContent)
                    })
                    iNode.appendChild(iLink)
                  } else if (i.nodeType == 3) {
                    iText = document.createTextNode(i.textContent)
                    iNode.appendChild(iText)
                  }
                })
                candidateDisplay.appendChild(iNode)
              }
            })

            // Put everything together
            suggestions.appendChild(candidateDisplay)
          })
        }}

      // Display
      body.appendChild(suggestions)

      // Navigate Wikipedia links through arrow keys
      wLinks = document.getElementsByClassName('wiki')
      selected = 0
      wLinks[selected].classList.add('selected')
      var map = {}
      onkeydown = onkeyup = function(e){
        e.preventDefault()
        map[e.keyCode] = e.type == 'keydown';
        // Enter
        if(map[13]){
          wLinks[selected].click()
          // Up          
        } else if(map[38]) {
          if (selected > 0) {
            wLinks[selected].classList.remove('selected')
            selected--
            wLinks[selected].classList.add('selected')
            wLinks[selected].scrollIntoView({behavior: "instant", block: "nearest"})
          }
          // Down
        } else if (map[40]) {
          if (selected < wLinks.length) {
            wLinks[selected].classList.remove('selected')
            selected++
            wLinks[selected].classList.add('selected')
            wLinks[selected].scrollIntoView({behavior: "instant", block: "nearest"})
          }
          // Ctrl+Shift+V
        } else if (map[17] && map[16] && map[86]) {
          browser.sidebarAction.close()
        }
      }

      // Ugly hack to focus sidebar
      document.getElementById('focused').remove()
      
    })}

// Get article image
function wikipediaImage(selection){
  url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=1&indexpageids=&prop=pageimages&pithumbsize=280&titles=' + selection
  urlString = fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      pageid = data.query.pageids[0]
      if (pageid != '-1' && data['query']['pages'][pageid]['thumbnail'] != undefined) {
        articleImage = document.createElement('img')
        articleImage.setAttribute('src', data['query']['pages'][pageid]['thumbnail']['source'])
        articleImage.setAttribute('alt', data['query']['pages'][pageid]['title'])
        body = document.body
        articleBody = document.getElementById('article')
        body.insertBefore(articleImage, articleBody)
        // document.getElementById('thumbnail').appendChild(articleImage)
      }
    })
}

// Get article extract
function wikipediaBody(selection){
  
  url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=1&indexpageids=&prop=extracts|templates&exintro=&explaintext=&tltemplates=Template:Disambiguation|Template:Dmbox|Template:Biology_disambiguation|Template:Call_sign_disambiguation|Template:Caselaw_disambiguation|Template:Chinese_title_disambiguation|Template:Disambiguation_cleanup|Template:Genus_disambiguation|Template:Hospital_disambiguation|Template:Human_name_disambiguation|Template:Human_name_disambiguation_cleanup|Template:Letter_disambiguation|Template:Letter-Number_Combination_Disambiguation|Template:Mathematical_disambiguation|Template:Mil-unit-dis|Template:Number_disambiguation|Template:Phonetics_disambiguation|Template:Place_name_disambiguation|Template:Road_disambiguation|Template:School_disambiguation|Template:Species_Latin_name_abbreviation_disambiguation|Template:Species_Latin_name_disambiguation|Template:Synagogue_disambiguation|Template:Taxonomic_authority_disambiguation|Template:Taxonomy_disambiguation|Template:Wikipedia_disambiguation|Template:Set_index_article|Template:Animal_common_name|Template:Chemistry_index|Template:Enzyme_index|Template:Fungus_common_name|Template:Given_name|Template:Lake_index|Template:Locomotive_index|Template:Molecular_formula_index|Template:Mountain_index|Template:Nickname|Template:Plant_common_name|Template:River_index|Template:Road_index|Template:Ship_index|Template:Sport_index|Template:Storm_index|Template:Surname&titles=' + selection
  
  urlString = fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      pageid = data.query.pageids[0]
      if (pageid == '-1') {
        noArticle = document.createElement('div')
        noArticle.setAttribute('id', 'intro')
        noArticle.textContent = "Couldn't find a page for that!"
        body = document.body
        body.appendChild(noArticle)
      } else if (data['query']['pages'][pageid]['templates']) {
        disambiguate(selection)
      } else {
        articleTitle = document.createElement('div')
        articleTitle.setAttribute('id', 'title')
        articleTitle.textContent = selection        
        articleBody = document.createElement('div')
        articleBody.setAttribute('id', 'article')
        articleBody.textContent = data['query']['pages'][pageid]['extract']
        reference = document.createElement('a')
        reference.setAttribute('href', 'https://en.wikipedia.org/wiki/' + selection)
        reference.setAttribute('id', 'reference')
        reference.textContent = "Wikipedia"
        body = document.body
        body.appendChild(articleTitle)
        body.appendChild(articleBody)
        body.appendChild(reference)
        wikipediaImage(selection)
        // Ugly hack to focus sidebar
        document.getElementById('focused').remove()
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
