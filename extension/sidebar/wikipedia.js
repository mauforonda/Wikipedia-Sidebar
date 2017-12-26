// Wikipedia language codes 
langCode = {
  "aa": "Afar",
  "ab": "Abkhazian",
  "af": "Afrikaans",
  "ak": "Akan",
  "am": "Amharic",
  "an": "Aragonese",
  "ar": "Arabic",
  "as": "Assamese",
  "av": "Avar",
  "ay": "Aymara",
  "az": "Azerbaijani",
  "ba": "Bashkir",
  "be": "Belarusian",
  "bg": "Bulgarian",
  "bh": "Bihari",
  "bi": "Bislama",
  "bm": "Bambara",
  "bn": "Bengali",
  "bo": "Tibetan",
  "br": "Breton",
  "bs": "Bosnian",
  "ca": "Catalan",
  "ce": "Chechen",
  "ch": "Chamorro",
  "co": "Corsican",
  "cr": "Cree",
  "cs": "Czech",
  "cu": "Old Church Slavonic / Old Bulgarian",
  "cv": "Chuvash",
  "cy": "Welsh",
  "da": "Danish",
  "de": "German",
  "dv": "Divehi",
  "dz": "Dzongkha",
  "ee": "Ewe",
  "el": "Greek",
  "en": "English",
  "eo": "Esperanto",
  "es": "Spanish",
  "et": "Estonian",
  "eu": "Basque",
  "fa": "Persian",
  "ff": "Peul",
  "fi": "Finnish",
  "fj": "Fijian",
  "fo": "Faroese",
  "fr": "French",
  "fy": "West Frisian",
  "ga": "Irish",
  "gd": "Scottish Gaelic",
  "gl": "Galician",
  "gn": "Guarani",
  "gu": "Gujarati",
  "gv": "Manx",
  "ha": "Hausa",
  "he": "Hebrew",
  "hi": "Hindi",
  "ho": "Hiri Motu",
  "hr": "Croatian",
  "ht": "Haitian",
  "hu": "Hungarian",
  "hy": "Armenian",
  "hz": "Herero",
  "ia": "Interlingua",
  "id": "Indonesian",
  "ie": "Interlingue",
  "ig": "Igbo",
  "ii": "Sichuan Yi",
  "ik": "Inupiak",
  "io": "Ido",
  "is": "Icelandic",
  "it": "Italian",
  "iu": "Inuktitut",
  "ja": "Japanese",
  "jv": "Javanese",
  "ka": "Georgian",
  "kg": "Kongo",
  "ki": "Kikuyu",
  "kj": "Kuanyama",
  "kk": "Kazakh",
  "kl": "Greenlandic",
  "km": "Cambodian",
  "kn": "Kannada",
  "ko": "Korean",
  "kr": "Kanuri",
  "ks": "Kashmiri",
  "ku": "Kurdish",
  "kv": "Komi",
  "kw": "Cornish",
  "ky": "Kirghiz",
  "la": "Latin",
  "lb": "Luxembourgish",
  "lg": "Ganda",
  "li": "Limburgian",
  "ln": "Lingala",
  "lo": "Laotian",
  "lt": "Lithuanian",
  "lv": "Latvian",
  "mg": "Malagasy",
  "mh": "Marshallese",
  "mi": "Maori",
  "mk": "Macedonian",
  "ml": "Malayalam",
  "mn": "Mongolian",
  "mo": "Moldovan",
  "mr": "Marathi",
  "ms": "Malay",
  "mt": "Maltese",
  "my": "Burmese",
  "na": "Nauruan",
  "nd": "North Ndebele",
  "ne": "Nepali",
  "ng": "Ndonga",
  "nl": "Dutch",
  "nn": "Norwegian Nynorsk",
  "no": "Norwegian",
  "nr": "South Ndebele",
  "nv": "Navajo",
  "ny": "Chichewa",
  "oc": "Occitan",
  "oj": "Ojibwa",
  "om": "Oromo",
  "or": "Oriya",
  "os": "Ossetian / Ossetic",
  "pa": "Panjabi / Punjabi",
  "pi": "Pali",
  "pl": "Polish",
  "ps": "Pashto",
  "pt": "Portuguese",
  "qu": "Quechua",
  "rm": "Raeto Romance",
  "rn": "Kirundi",
  "ro": "Romanian",
  "ru": "Russian",
  "rw": "Rwandi",
  "sa": "Sanskrit",
  "sc": "Sardinian",
  "sd": "Sindhi",
  "se": "Northern Sami",
  "sg": "Sango",
  "sh": "Serbo-Croatian",
  "si": "Sinhalese",
  "sk": "Slovak",
  "sl": "Slovenian",
  "sm": "Samoan",
  "sn": "Shona",
  "so": "Somalia",
  "sq": "Albanian",
  "sr": "Serbian",
  "ss": "Swati",
  "st": "Southern Sotho",
  "su": "Sundanese",
  "sv": "Swedish",
  "sw": "Swahili",
  "ta": "Tamil",
  "te": "Telugu",
  "tg": "Tajik",
  "th": "Thai",
  "ti": "Tigrinya",
  "tk": "Turkmen",
  "tl": "Tagalog / Filipino",
  "tn": "Tswana",
  "to": "Tonga",
  "tr": "Turkish",
  "ts": "Tsonga",
  "tt": "Tatar",
  "tw": "Twi",
  "ty": "Tahitian",
  "ug": "Uyghur",
  "uk": "Ukrainian",
  "ur": "Urdu",
  "uz": "Uzbek",
  "ve": "Venda",
  "vi": "Vietnamese",
  "vo": "Volapük",
  "wa": "Walloon",
  "wo": "Wolof",
  "xh": "Xhosa",
  "yi": "Yiddish",
  "yo": "Yoruba",
  "za": "Zhuang",
  "zh": "Chinese",
  "zu": "Zulu"
}

// Arrow navigation
function arrowNavigation() {
  wLinks = document.getElementsByClassName('wiki')
  selected = 0
  wLinks[selected].classList.add('selected')
  var map = {}      
  function navigate(e) {
    e.preventDefault()
    map[e.keyCode] = e.type == 'keydown'
    
    // Enter
    if(map[13]){
      wLinks[selected].click()
      body.removeEventListener('keydown', navigate)
      body.removeEventListener('keyup', navigate)
      
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
      if (selected < wLinks.length - 1) {
        wLinks[selected].classList.remove('selected')
        selected++
        wLinks[selected].classList.add('selected')
        wLinks[selected].scrollIntoView({behavior: "instant", block: "nearest"})
      }
      
      // Ctrl+Shift+V
    } else if (map[17] && map[16] && map[86]) {
      browser.sidebarAction.close()

      // Home
    } else if (map[36]) {
      window.scroll(0,0)

      // End
    } else if (map[35]) {
      window.scroll(0,document.body.scrollHeight)
    }
  }

  // Listen keys
  body.addEventListener('keydown', navigate)
  body.addEventListener('keyup', navigate)
}

// Suggest a page in non-English languages
function suggestLanguages(selection) {
  body = document.body
  url = "https://www.wikidata.org/w/api.php?format=json&action=wbgetentities&sites=enwiki|frwiki|eswiki|dewiki&props=sitelinks&titles=" + selection
  urlString = fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      for (i in data.entities) {
        if (data['entities'][i]['type']){

          // Header
          languageExplain = document.createElement('div')
          languageExplain.textContent = "There is no exact page for that in English, but I found it in these languages:"
          body.appendChild(languageExplain)
          
          // Language list
          languageList = document.createElement('div')
          languageList.setAttribute('id', 'languagelist')
          langUl = document.createElement('ul')
          sitelinks = data['entities'][i]['sitelinks']
          for (a in sitelinks){
            if (a.match(/[a-z]{2}wiki$/g) != null) {
              code = a.substring(0,2)
              if (langCode[code]) {
                langLi = document.createElement('li')
                lang = document.createElement('a')
                lang.setAttribute('class', 'wiki')
                lang.textContent = langCode[code]
                lang.setAttribute('data-code', code)
                lang.setAttribute('data-title', sitelinks[a]['title'])
                lang.addEventListener("click", function( event ) {
                  languageExplain.remove()
                  languageList.remove()
                  searchBox.remove()
                  wikipediaBody(event.target.getAttribute('data-title'), event.target.getAttribute('data-code'))
                })
                langLi.appendChild(lang)
                langUl.appendChild(langLi)
              }
            }
          }
          languageList.appendChild(langUl)
          body.appendChild(languageList)

          //Suggest full text search
          searchBox = document.createElement('div')
          search = document.createElement('a')
          search.setAttribute('class', 'wiki')
          search.textContent = "Or get full text search results in English"
          search.addEventListener("click", function( event ) {
            languageExplain.remove()
            languageList.remove()
            searchBox.remove()
            fullSearch(selection, 0)
          })
          searchBox.appendChild(search)
          body.appendChild(searchBox)

          // Arrow navigation
          arrowNavigation()
          
        }}
      if (document.getElementById('languagelist') == null) {
        fullSearch(selection, 0)
      }
    })
  if (document.getElementById('focused')) {
    document.getElementById('focused').remove()
  }
}

// Full search
function fullSearch(selection, pageOffset) {
  body = document.body
  url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=1&indexpageids=&list=search&srlimit=20&srprop=snippet&sroffset='+pageOffset+'&srsearch='+selection
  urlString = fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      hits = data.query.searchinfo.totalhits

      // No search result
      if (hits == 0) {
        
        // Follow suggested search terms
        if (data.query.searchinfo.suggestion) {
          fullSearch(data.query.searchinfo.suggestion, 0)
          
          // No suggestions
        } else {
        noArticle = document.createElement('div')
        noArticle.setAttribute('id', 'noarticle')
        noArticle.textContent = "Couldn't find a page or search results for that"
          body.appendChild(noArticle)
        }
      } else {
        
        // Search header
        searchHeader = document.createElement('div')
        searchHeader.setAttribute('id', 'searchheader')
        if (pageOffset == 0) {
          searchHeader1 = document.createTextNode("There's no exact page for that, but I found ")
          searchHeaderHits = document.createElement('b')
          searchHeaderHits.textContent = String(hits)
          searchHeader2 = document.createTextNode(' search results on Wikipedia.')
          searchHeaderp1 = document.createElement('p')
          searchHeaderp1.setAttribute('id', 'searchexplain')
          searchHeaderp1.appendChild(searchHeader1)
          searchHeaderp1.appendChild(searchHeaderHits)
          searchHeaderp1.appendChild(searchHeader2)
          searchHeader.appendChild(searchHeaderp1)
        }
        searchHeaderp2 = document.createElement('p')
        searchHeaderp2.setAttribute('id', 'searchcount')
        if (hits  < pageOffset + 20 ) {
          searchHeaderp2.textContent = "Results " + String(pageOffset) + " to " +  String(hits) + ":"
        } else {
          searchHeaderp2.textContent = "Results " + String(pageOffset) + " to " + String(pageOffset + 20) + ":"
        }
        searchHeader.appendChild(searchHeaderp2)
        
        // Search results
        searchResults = document.createElement('div')
        searchResults.setAttribute('id', 'searchresults')
        for (i = 0 ; i < data.query.search.length ; i++){
          result = document.createElement('div')
          result.setAttribute('class', 'result')
          rLink = document.createElement('a')
          rLink.setAttribute('class', 'wiki')
          rLink.textContent = data['query']['search'][i]['title']
          rLink.addEventListener("click", function( event ) {
            searchHeader.remove()
            searchResults.remove()
            if (document.getElementById('nextpage')) {
              nextPage.remove()
            }
            wikipediaBody(event.target.textContent, 'en')
          })
          rSnippet = document.createElement('p')
          snippetText = data['query']['search'][i]['snippet'].split(RegExp('(?:<span class="searchmatch">|</span>)')).join('')
          rSnippet.textContent = snippetText
          hr =  document.createElement('hr')
          result.appendChild(rLink)
          result.appendChild(rSnippet)
          searchResults.appendChild(hr)
          searchResults.appendChild(result)
        }

        // Display header and results
        body.appendChild(searchHeader)
        body.appendChild(searchResults)

        // Next page
        pageOffset = pageOffset + 20
        if (pageOffset < hits) {
          nextPage = document.createElement('div')
          nextPage.setAttribute('id', 'nextpage')
          nextPageLink = document.createElement('a')
          nextPageLink.setAttribute('class', 'wiki')
          nextPageLink.textContent = "Next 20 results"
          nextPageLink.addEventListener('click', function(event) {
            searchHeader.remove()
            searchResults.remove()
            nextPage.remove()
            fullSearch(selection, pageOffset)
          })
          nextPage.appendChild(nextPageLink)
          body.appendChild(nextPage)
        }

        // Arrow navigation
        arrowNavigation()
      }
      if (document.getElementById('focused')) {
        document.getElementById('focused').remove()
      }
    })
}

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
          separator = document.createElement('hr')
          suggestions.appendChild(separator)
          sectionNode = candidateNodes[i].querySelector('.mw-headline')
          section = document.createElement('div')
          section.setAttribute('class', 'domain')
          section.textContent = sectionNode.textContent
          suggestions.appendChild(section)

          // Make a similar word section
        } else if (candidateNodes[i].tagName == 'DL') {
          separator = document.createElement('hr')
          suggestions.appendChild(separator)
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
                    // body.removeEventListener('keydown', navigate)
                    // body.removeEventListener('keyup', navigate)
                    suggestions.remove()
                    wikipediaBody(event.target.textContent, 'en')
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
                      // body.removeEventListener('keydown', navigate)
                      // body.removeEventListener('keyup', navigate)
                      suggestions.remove()
                      wikipediaBody(event.target.textContent, 'en')
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

      // Arrow navigation
      arrowNavigation()
      if (document.getElementById('focused')) {
        document.getElementById('focused').remove()
      }      
    })}

// Get article image
function wikipediaImage(selection){
  url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=1&indexpageids=&prop=pageimages&pithumbsize=360&titles=' + selection
  urlString = fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      pageid = data.query.pageids[0]
      if (pageid != '-1' && data['query']['pages'][pageid]['thumbnail'] != undefined) {
        imagediv = document.createElement('div')
        imagediv.setAttribute('id', 'imagediv')
        imagedivdiv = document.createElement('div')
        imagedivdiv.setAttribute('id', 'imagedivdiv')
        imageback = document.createElement('div')
        imageback.setAttribute('id', 'imgback')
        articleImage = document.createElement('img')
        articleImage.setAttribute('id', 'articleimg')
        articleImage.setAttribute('src', data['query']['pages'][pageid]['thumbnail']['source'])
        articleImage.setAttribute('alt', data['query']['pages'][pageid]['title'])
        articleImage.addEventListener('load', function(e) {imagedivdiv.setAttribute('style', 'background: linear-gradient(to bottom, transparent, #0a0415cc)')})
        imagediv.appendChild(imageback)
        imagediv.appendChild(articleImage)
        imagedivdiv.appendChild(imagediv)
        body = document.body
        articleTitle = document.getElementById('title')
        body.insertBefore(imagedivdiv, articleTitle)
      }
    })
}

// Get article extract
function wikipediaBody(selection, lang){
  
  url = 'https://' + lang + '.wikipedia.org/w/api.php?format=json&action=query&redirects=1&indexpageids=&prop=extracts|templates&exintro=&explaintext=&tltemplates=Template:Disambiguation|Template:Dmbox|Template:Biology_disambiguation|Template:Call_sign_disambiguation|Template:Caselaw_disambiguation|Template:Chinese_title_disambiguation|Template:Disambiguation_cleanup|Template:Genus_disambiguation|Template:Hospital_disambiguation|Template:Human_name_disambiguation|Template:Human_name_disambiguation_cleanup|Template:Letter_disambiguation|Template:Letter-Number_Combination_Disambiguation|Template:Mathematical_disambiguation|Template:Mil-unit-dis|Template:Number_disambiguation|Template:Phonetics_disambiguation|Template:Place_name_disambiguation|Template:Road_disambiguation|Template:School_disambiguation|Template:Species_Latin_name_abbreviation_disambiguation|Template:Species_Latin_name_disambiguation|Template:Synagogue_disambiguation|Template:Taxonomic_authority_disambiguation|Template:Taxonomy_disambiguation|Template:Wikipedia_disambiguation|Template:Set_index_article|Template:Animal_common_name|Template:Chemistry_index|Template:Enzyme_index|Template:Fungus_common_name|Template:Given_name|Template:Lake_index|Template:Locomotive_index|Template:Molecular_formula_index|Template:Mountain_index|Template:Nickname|Template:Plant_common_name|Template:River_index|Template:Road_index|Template:Ship_index|Template:Sport_index|Template:Storm_index|Template:Surname&titles=' + selection
  urlString = fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      pageid = data.query.pageids[0]
      if (pageid == '-1') {

        // If there is no page, check other languages
        suggestLanguages(selection)
      } else if (data['query']['pages'][pageid]['templates']) {

        // Display disambiguation pages
        disambiguate(selection)
      } else {
        
        // Display extract
        articleTitle = document.createElement('div')
        articleTitle.setAttribute('id', 'title')
        articleTitle.textContent = selection        
        articleBody = document.createElement('div')
        articleBody.setAttribute('id', 'article')
        articleBody.textContent = data['query']['pages'][pageid]['extract']
        referenceContainer = document.createElement('div')
        referenceContainer.setAttribute('id', 'reference')
        reference = document.createElement('a')
        reference.setAttribute('href', 'https://en.wikipedia.org/wiki/' + selection)
        reference.textContent = "Wikipedia"
        referenceContainer.appendChild(reference)
        separator1 = document.createElement('hr')
        separator1.setAttribute('id', 'titleseparator')
        separator2 = document.createElement('hr')
        separator2.setAttribute('id', 'refseparator')
        body = document.body
        body.appendChild(articleTitle)
        body.appendChild(separator1)
        body.appendChild(articleBody)
        body.appendChild(separator2)
        body.appendChild(referenceContainer)
        
        // Focus cursor on sidebar
        if (document.getElementById('focused')) {
          document.getElementById('focused').remove()
        }

        // Get image
        wikipediaImage(selection)
      }
    })
}

function noSelection(){
  whatSelection = document.createElement('div')
  whatSelection.setAttribute('id', 'noselection')
  whatMessage = document.createElement('p')
  whatMessage.textContent = "You selected nothing or this page doesn't allow me get your selection."
  whatInvitation = document.createElement('p')
  whatInvitation.textContent = "Please type your query:"
  whatSelection.appendChild(whatMessage)
  whatSelection.appendChild(whatInvitation)
  searchBox = document.getElementById('focused')
  body = document.body
  body.insertBefore(whatSelection, searchBox)
  searchBox.setAttribute('style', 'border: #a26d54; border-style: solid; border-width: 1px; color: #a26d54; background: #ffffff; padding: 0px 7px; margin: 0px 25px; line-height: 25px; border-radius: 3px; width: 75%')
  searchBox.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      whatSelection.remove()
      searchBox.setAttribute('style', 'border: none; color: #fbfbfb; background: #fbfbfb;')
      wikipediaBody(searchBox.value, 'en')
    }
  })
}

function messageDo(message) {
  selection = message.selected
  if (selection == ""){
    noSelection()
  } else {
    wikipediaBody(selection, 'en')
  }
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
