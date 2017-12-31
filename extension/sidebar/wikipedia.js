/* global browser, window, document, DOMParser, fetch:false */

/**
 * TODO:
 * Do something about articles that consist of mostly tables: e.g. {@link https://en.wikipedia.org/wiki/Armorial_of_the_Communes_of_Seine-Maritime}
 * Test more, discover and support other types of articles
 */

/**
 * The document body.
 */
const sidebar = document.body;

/**
 * Wikipedia language codes, as defined in {@link https://github.com/inventaire/wikidata-lang/blob/master/lib/lang.json}.
 */
const languageCodes = {
  aa: 'Afar', ab: 'Abkhazian', af: 'Afrikaans', ak: 'Akan', am: 'Amharic', an: 'Aragonese', ar: 'Arabic', as: 'Assamese', av: 'Avar', ay: 'Aymara', az: 'Azerbaijani', ba: 'Bashkir', be: 'Belarusian', bg: 'Bulgarian', bh: 'Bihari', bi: 'Bislama', bm: 'Bambara', bn: 'Bengali', bo: 'Tibetan', br: 'Breton', bs: 'Bosnian', ca: 'Catalan', ce: 'Chechen', ch: 'Chamorro', co: 'Corsican', cr: 'Cree', cs: 'Czech', cu: 'Old Church Slavonic / Old Bulgarian', cv: 'Chuvash', cy: 'Welsh', da: 'Danish', de: 'German', dv: 'Divehi', dz: 'Dzongkha', ee: 'Ewe', el: 'Greek', en: 'English', eo: 'Esperanto', es: 'Spanish', et: 'Estonian', eu: 'Basque', fa: 'Persian', ff: 'Peul', fi: 'Finnish', fj: 'Fijian', fo: 'Faroese', fr: 'French', fy: 'West Frisian', ga: 'Irish', gd: 'Scottish Gaelic', gl: 'Galician', gn: 'Guarani', gu: 'Gujarati', gv: 'Manx', ha: 'Hausa', he: 'Hebrew', hi: 'Hindi', ho: 'Hiri Motu', hr: 'Croatian', ht: 'Haitian', hu: 'Hungarian', hy: 'Armenian', hz: 'Herero', ia: 'Interlingua', id: 'Indonesian', ie: 'Interlingue', ig: 'Igbo', ii: 'Sichuan Yi', ik: 'Inupiak', io: 'Ido', is: 'Icelandic', it: 'Italian', iu: 'Inuktitut', ja: 'Japanese', jv: 'Javanese', ka: 'Georgian', kg: 'Kongo', ki: 'Kikuyu', kj: 'Kuanyama', kk: 'Kazakh', kl: 'Greenlandic', km: 'Cambodian', kn: 'Kannada', ko: 'Korean', kr: 'Kanuri', ks: 'Kashmiri', ku: 'Kurdish', kv: 'Komi', kw: 'Cornish', ky: 'Kirghiz', la: 'Latin', lb: 'Luxembourgish', lg: 'Ganda', li: 'Limburgian', ln: 'Lingala', lo: 'Laotian', lt: 'Lithuanian', lv: 'Latvian', mg: 'Malagasy', mh: 'Marshallese', mi: 'Maori', mk: 'Macedonian', ml: 'Malayalam', mn: 'Mongolian', mo: 'Moldovan', mr: 'Marathi', ms: 'Malay', mt: 'Maltese', my: 'Burmese', na: 'Nauruan', nd: 'North Ndebele', ne: 'Nepali', ng: 'Ndonga', nl: 'Dutch', nn: 'Norwegian Nynorsk', no: 'Norwegian', nr: 'South Ndebele', nv: 'Navajo', ny: 'Chichewa', oc: 'Occitan', oj: 'Ojibwa', om: 'Oromo', or: 'Oriya', os: 'Ossetian / Ossetic', pa: 'Panjabi / Punjabi', pi: 'Pali', pl: 'Polish', ps: 'Pashto', pt: 'Portuguese', qu: 'Quechua', rm: 'Raeto Romance', rn: 'Kirundi', ro: 'Romanian', ru: 'Russian', rw: 'Rwandi', sa: 'Sanskrit', sc: 'Sardinian', sd: 'Sindhi', se: 'Northern Sami', sg: 'Sango', sh: 'Serbo-Croatian', si: 'Sinhalese', sk: 'Slovak', sl: 'Slovenian', sm: 'Samoan', sn: 'Shona', so: 'Somalia', sq: 'Albanian', sr: 'Serbian', ss: 'Swati', st: 'Southern Sotho', su: 'Sundanese', sv: 'Swedish', sw: 'Swahili', ta: 'Tamil', te: 'Telugu', tg: 'Tajik', th: 'Thai', ti: 'Tigrinya', tk: 'Turkmen', tl: 'Tagalog / Filipino', tn: 'Tswana', to: 'Tonga', tr: 'Turkish', ts: 'Tsonga', tt: 'Tatar', tw: 'Twi', ty: 'Tahitian', ug: 'Uyghur', uk: 'Ukrainian', ur: 'Urdu', uz: 'Uzbek', ve: 'Venda', vi: 'Vietnamese', vo: 'Volapük', wa: 'Walloon', wo: 'Wolof', xh: 'Xhosa', yi: 'Yiddish', yo: 'Yoruba', za: 'Zhuang', zh: 'Chinese', zu: 'Zulu',
};


/**
 * Assemble URLs so functions look a little prettier.
 */
const urls = (function urlMaker() {
  function extractUrl(keywords, lang) {
    return `https://${lang}.wikipedia.org/w/api.php?format=json&action=query&redirects=1&indexpageids=&prop=extracts|templates&exintro=&explaintext=&tltemplates=Template:Disambiguation|Template:Dmbox|Template:Biology_disambiguation|Template:Call_sign_disambiguation|Template:Caselaw_disambiguation|Template:Chinese_title_disambiguation|Template:Disambiguation_cleanup|Template:Genus_disambiguation|Template:Hospital_disambiguation|Template:Human_name_disambiguation|Template:Human_name_disambiguation_cleanup|Template:Letter_disambiguation|Template:Letter-Number_Combination_Disambiguation|Template:Mathematical_disambiguation|Template:Mil-unit-dis|Template:Number_disambiguation|Template:Phonetics_disambiguation|Template:Place_name_disambiguation|Template:Road_disambiguation|Template:School_disambiguation|Template:Species_Latin_name_abbreviation_disambiguation|Template:Species_Latin_name_disambiguation|Template:Synagogue_disambiguation|Template:Taxonomic_authority_disambiguation|Template:Taxonomy_disambiguation|Template:Wikipedia_disambiguation|Template:Set_index_article|Template:Animal_common_name|Template:Chemistry_index|Template:Enzyme_index|Template:Fungus_common_name|Template:Given_name|Template:Lake_index|Template:Locomotive_index|Template:Molecular_formula_index|Template:Mountain_index|Template:Nickname|Template:Plant_common_name|Template:River_index|Template:Road_index|Template:Ship_index|Template:Sport_index|Template:Storm_index|Template:Surname&titles=${encodeURIComponent(keywords)}`;
  }
  function articleUrl(keywords, lang = 'en') {
    return `https://${lang}.wikipedia.org/wiki/${keywords}`;
  }
  function thumbnailUrl(keywords, lang = 'en') {
    return `https://${lang}.wikipedia.org/w/api.php?format=json&action=query&redirects=1&indexpageids=&prop=pageimages&pithumbsize=360&titles=${encodeURIComponent(keywords)}`;
  }
  function languageUrl(keywords) {
    return `https://www.wikidata.org/w/api.php?format=json&action=wbgetentities&sites=enwiki|frwiki|eswiki|dewiki&props=sitelinks&titles=${encodeURIComponent(keywords)}`;
  }
  function fulltextUrl(keywords, offset) {
    return `https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=1&indexpageids=&list=search&srlimit=20&srprop=snippet&sroffset=${offset}&srsearch=${encodeURIComponent(keywords)}`;
  }
  return {
    extract: extractUrl,
    article: articleUrl,
    thumbnail: thumbnailUrl,
    language: languageUrl,
    fulltext: fulltextUrl,
  };
}());

/**
 * Return DOM element with any set of properties.
 */
const element = function makeElement(tag, properties = '') {
  const el = document.createElement(tag);
  if (properties) {
    Object.keys(properties).forEach((prop) => {
      if (typeof properties[prop] === 'object') {
        Object.keys(properties[prop]).forEach((p) => {
          el[prop][p] = properties[prop][p];
        });
      } else {
        el[prop] = properties[prop];
      }
    });
  }
  return el;
};

/**
 * The only way I could focus the cursor on the sidebar automatically
 * with the current state of webextensions was to create an autofocused 
 * input element directly on the sidebar html. In most cases, this 
 * element has no value after the sidebar opens so we remove it after
 * loading sidebar elements.
 */
const noinput = function removeInputElement() {
  if (document.getElementsByTagName('INPUT')[0]) {
    document.getElementsByTagName('INPUT')[0].remove();
  }
};

/**
 * The entry point.
 * 
 * It loads a content script on the current tab and dispatches
 * the message it sends to {@link create}.
 */
const init = function handleContentScript() {
  browser.tabs.query({ currentWindow: true, active: true })
    .then((tabs) => {
      tabs.forEach((tab) => {
        browser.runtime.onMessage.addListener(create);
        browser.tabs.executeScript(tab.id, { file: 'getselection.js' });
      });
    });
};

/**
 * After receiving the content script message.
 * 
 * If the message contains a non-empty string, try to get its extract: {@link extract}.
 * Otherwise, let the user write the query on an input box: {@link write}.
 */
const create = function actOnContentScriptMessage(message) {
  const keywords = message.selected;
  if (keywords === '') {
    write();
  } else {
    extract(keywords);
  }
};

/**
 * Let the user write a query on an input box.
 *
 * Explain that the we couldn't get any text selection.
 * Display an input box.
 * Get the input value extract as soon as the user presses Enter: {@link extract}.
 */
const write = function writeQuery() {
  const explain = element('div', {
    className: 'small',
  });
  [
    "You selected nothing or this page doesn't allow me get your selection.",
    'Please type your query:',
  ]
    .forEach((text) => {
      const phrase = element('p', {
        className: 'snippet',
        textContent: text,
      });
      explain.appendChild(phrase);
    });
  const input = document.getElementsByTagName('INPUT')[0];
  input.style = 'border: #a26d54; border-style: solid; border-width: 1px; color: #a26d54; background: #ffffff; padding: 0px 7px; margin: 0px 25px; line-height: 25px; border-radius: 3px; width: 75%';
  input.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      explain.remove();
      input.style = 'border: none; color: #fbfbfb; background: #fbfbfb;';
      extract(input.value);
    }
  });
  sidebar.insertBefore(explain, input);
};

/**
 * Display a tooltip on top of text selections to search for extracts.
 * 
 * If the selection is not empty, draw a box over it that holds a link.
 * When the user clicks the link, try to get  an extract for the selection
 * and remove all elements from the sidebar. {@link extract}
 * Each new selection should remove the last one.
 */
const tooltip = function displaySelectionTooltip() {
  const selection = window.getSelection();
  if (selection.toString() !== '') {
    const rect = selection.getRangeAt(0).getBoundingClientRect();
    const tip = element('div', {
      id: 'tooltip',
      style: {
        top: `${rect.top + window.scrollY}px`,
        left: `${rect.left}px`,
        height: `${rect.height}px`,
        width: `${rect.width}px`,
      },
    });
    const link = element('a', {
      textContent: 'W',
      id: 'tooltiptext',
      dataset: {
        selection: selection.toString(),
      },
    });
    link.addEventListener('click', (event) => {
      const nodes = sidebar.querySelectorAll(':scope > :not(#tooltip)');
      nodes.forEach((node) => {
        node.remove();
      });
      extract(event.target.dataset.selection);
      tip.remove();
    });
    tip.appendChild(link);
    if (document.getElementById('tooltip')) {
      document.getElementById('tooltip').remove();
    }
    sidebar.appendChild(tip);
  } else if (document.getElementById('tooltip')) {
    document.getElementById('tooltip').remove();
  }
};

/**
 * Try to display the thumbnail image for an extract.
 *
 * Draw a background for the image so it looks good if it includes transparency.
 * Fix the image on top of the sidebar, extend it all wide and make it
 * never exceed 300px in height.
 */
const thumbnail = function getWikipediaThumbnail(keywords, lang = 'en') {
  const url = urls.thumbnail(keywords, lang);
  fetch(url)
    .then(resp => resp.json())
    .then((data) => {
      const pageid = data.query.pageids[0];
      if (pageid !== '-1' && data.query.pages[pageid].thumbnail !== undefined) {
        const container = element('div', {
          className: 'simple imgcontain',
        });
        const image = element('img', {
          id: 'articleimg',
          src: data.query.pages[pageid].thumbnail.source,
          alt: data.query.pages[pageid].title,
        });
        image.addEventListener('load', () => {
          image.setAttribute('style', 'background: linear-gradient(to bottom, white 80%, #a794c833); ');
        });
        container.appendChild(image);
        const article = document.getElementById('article');
        sidebar.insertBefore(container, article);
      }
    });
};

/**
 * Try to display an extract.
 *
 * If the query has an extract and it isn't a disambiguation page
 * display it, look for a thumbnail {@link thumbnail} and create tooltips {@link tooltip}.
 * If the extract belongs to a disambiguation page, try to display it: {@link disambiguation}.
 * If the query doesn't contain an extract, search for it in other languages {@link languages}.
 */
const extract = function getWikipediaExtract(keywords, lang = 'en') {
  const url = urls.extract(keywords, lang);
  fetch(url)
    .then(resp => resp.json())
    .then((data) => {
      const pageid = data.query.pageids[0];
      if (pageid === '-1') {
        languages(keywords);
      } else if (data.query.pages[pageid].templates) {
        disambiguate(keywords);
      } else {
        const title = element('div', {
          textContent: keywords,
          id: 'title',
        });
        const titleseparator = element('hr', {
          className: 'titleseparator',
        });
        const body = element('div', {
          textContent: data.query.pages[pageid].extract,
        });
        const refseparator = element('hr', {
          className: 'refseparator',
        });
        const reference = element('div', {
          className: 'reference',
        });
        const link = element('a', {
          textContent: 'Wikipedia',
          href: urls.article(keywords, lang),
        });
        const article = element('div', {
          className: 'simple',
          id: 'article',
        });
        article.appendChild(title);
        article.appendChild(titleseparator);
        article.appendChild(body);
        article.appendChild(refseparator);
        reference.appendChild(link);
        article.appendChild(reference);
        sidebar.appendChild(article);
        noinput();
        body.addEventListener('mouseup', tooltip);
        thumbnail(keywords);
      }
    });
};

/**
 * Keyboard navigation for pages that consist of a list of links.
 *
 * Select the first navigable link,
 * go up, down, top and end,
 * click the link and close the sidebar.
 */
const navigation = function keyboardNavigation() {
  const links = document.getElementsByClassName('navigable');
  let selected = 0;
  links[selected].classList.add('selected');
  const map = {};
  function rules(e) {
    e.preventDefault();
    map[e.keyCode] = e.type === 'keydown';
    // Enter
    if (map[13]) {
      sidebar.removeEventListener('keydown', rules);
      sidebar.removeEventListener('keyup', rules);
      links[selected].click();
      // Up
    } else if (map[38]) {
      if (selected > 0) {
        links[selected].classList.remove('selected');
        selected -= 1;
        links[selected].classList.add('selected');
        links[selected].scrollIntoView({
          behavior: 'instant',
          block: 'nearest',
        });
      }
      // Down
    } else if (map[40]) {
      if (selected < links.length - 1) {
        links[selected].classList.remove('selected');
        selected += 1;
        links[selected].classList.add('selected');
        links[selected].scrollIntoView({ behavior: 'instant', block: 'nearest' });
      }
      // Close
    } else if (map[17] && map[16] && map[86]) {
      browser.sidebarAction.close();
      // Home
    } else if (map[36]) {
      window.scroll(0, 0);
      // End
    } else if (map[35]) {
      window.scroll(0, document.body.scrollHeight);
    }
  }
  sidebar.addEventListener('keydown', rules);
  sidebar.addEventListener('keyup', rules);
};

/**
 * Display a list of languages in which an extract exists.
 *
 * If the query exists in a language, list it
 * and lead to the extract when the user clicks it {@link extract}.
 * Otherwise, make a full text search on wikipedia {@link fulltext}.
 */
const languages = function checkNonEnglishPages(keywords) {
  const url = urls.language(keywords);
  fetch(url)
    .then(resp => resp.json())
    .then((data) => {
      Object.keys(data.entities).forEach((entity) => {
        if (data.entities[entity].type) {
          const list = element('ul');
          const sitelinks = data.entities[entity].sitelinks;
          Object.keys(sitelinks).forEach((sitelink) => {
            const c = sitelink.substring(0, 2);
            if (sitelink.match(/[a-z]{2}wiki$/g) != null && languageCodes[c]) {
              const item = element('li');
              const language = element('a', {
                className: 'navigable',
                textContent: languageCodes[c],
                dataset: {
                  code: c,
                  title: sitelinks[sitelink].title,
                },
              });
              language.addEventListener('click', (event) => {
                const nodes = sidebar.querySelectorAll(':scope > :not(input)');
                nodes.forEach((node) => {
                  node.remove();
                });
                extract(event.target.dataset.title, event.target.dataset.code);
              });
              item.appendChild(language);
              list.appendChild(item);
            }
          });
          if (list.children.length > 0) {
            const explain = element('div', {
              className: 'small',
              textContent: 'There is no exact page for that in English, but I found it in these languages:',
            });
            const container = element('div', {
              className: 'middle',
              id: 'languages',
            });
            const search = element('div');
            const get = element('a', {
              className: 'navigable',
              textContent: 'Or get full text search results in English',
            });
            get.addEventListener('click', () => {
              const nodes = sidebar.querySelectorAll(':scope > :not(input)');
              nodes.forEach((node) => {
                node.remove();
              });
              fulltext(keywords);
            });
            container.appendChild(list);
            search.appendChild(get);
            sidebar.appendChild(explain);
            sidebar.appendChild(container);
            sidebar.appendChild(search);
            navigation();
            noinput();
          } else {
            fulltext(keywords);
          }
        }
      });
      if (document.getElementById('languages') == null) {
        fulltext(keywords);
      }
    });
};

/**
 * Display a list of articles that contain the query in any part.
 *
 * If the query appears in any article, display it in a list with 20 results at most, 
 * and lead to the article extract when the user clicks it {@link extract}.
 * Offer to browse the next set of 20 results {@link fulltext}.
 * Otherwise, explain that we couldn't find an extract in any language
 * or even a match in the content of any article.
 */
const fulltext = function checkFullTextSearchResults(keywords, offset = 0) {
  const url = urls.fulltext(keywords, offset);
  fetch(url)
    .then(resp => resp.json())
    .then((data) => {
      const totalhits = data.query.searchinfo.totalhits;
      if (totalhits === 0) {
        const suggestion = data.query.searchinfo.suggestion;
        if (suggestion) {
          fulltext(suggestion, 0);
        } else {
          const nothing = element('div', {
            textContent: "Couldn't find a page or search results for that",
          });
          sidebar.appendChild(nothing);
        }
      } else {
        const intro = element('div', {
          className: 'intro',
        });
        if (offset === 0) {
          const explain = element('p', {
            className: 'small',
          });
          [
            "There's no exact page for that, but I found ",
            String(totalhits),
            ' search results on Wikipedia.',
          ]
            .forEach((item) => {
              const phrase = document.createTextNode(item);
              explain.appendChild(phrase);
            });
          intro.appendChild(explain);
        }
        const results = element('div', {
          className: 'middle',
        });
        for (let r = 0; r < data.query.search.length; r += 1) {
          const result = element('div', {
            className: 'small simple',
          });
          const link = element('a', {
            className: 'navigable simple',
            textContent: data.query.search[r].title,
          });
          link.addEventListener('click', (event) => {
            const nodes = sidebar.querySelectorAll(':scope > :not(input)');
            nodes.forEach((node) => {
              node.remove();
            });
            extract(event.target.textContent);
          });
          const snippet = element('p', {
            className: 'snippet',
            textContent: data.query.search[r].snippet.split(RegExp('(?:<span class="searchmatch">|</span>)')).join(''),
          });
          const separator = element('hr');
          result.appendChild(link);
          result.appendChild(snippet);
          results.appendChild(separator);
          results.appendChild(result);
        }
        sidebar.appendChild(results);
        let last;
        if (offset + 20 > totalhits) {
          last = totalhits;
        } else {
          last = offset + 20;
          const next = element('div', {
            id: 'next',
          });
          const link = element('a', {
            className: 'navigable',
            textContent: 'Next 20 results',
          });
          link.addEventListener('click', () => {
            const nodes = sidebar.querySelectorAll(':scope > :not(input)');
            nodes.forEach((node) => {
              node.remove();
            });
            fulltext(keywords, last);
          });
          next.appendChild(link);
          sidebar.appendChild(next);
        }
        const count = element('p', {
          textContent: `Results ${String(offset)} to ${String(last)}`,
        });
        intro.appendChild(count);
        sidebar.insertBefore(intro, results);
        navigation();
      }
      noinput();
    });
};


/**
 * Display a list of disambiguation candidates and their sections.
 *
 * Contrary to other functions, in this case the Wikipedia API falls short
 * and we need to parse the HTML of the page.
 * We select the array of relevant nodes, and treat them one by one.
 * They can either be sections or candidates.
 * Sections come as H2 or DL elements.
 * Candidates come as collections of link, text and italic elements.
 * Links to valid articles lead to their extracts {@link extract}.
 */
const disambiguate = function displayDisambiguationPage(keywords) {
  const url = urls.article(keywords);
  // Explain
  function makeExplain(k) {
    const explain = element('div', {
      className: 'small intro',
    });
    const bold = element('b', {
      textContent: k,
    });
    const text = document.createTextNode(' may refer to:');
    explain.appendChild(bold);
    explain.appendChild(text);
    return explain;
  }
  // Make a link element
  function makeLink(c) {
    const link = element('a', {
      className: 'navigable',
      textContent: c.title,
    });
    link.addEventListener('click', (event) => {
      const nodes = sidebar.querySelectorAll(':scope > :not(input)');
      nodes.forEach((node) => {
        node.remove();
      });
      extract(event.target.textContent);
    });
    return link;
  }
  // Make a candidate element
  function displayCandidate(container, li) {
    const candidate = element('p', {
      className: 'candidate',
    });
    // Iterate over list item nodes
    li.childNodes.forEach((c) => {
      // If this node is a link
      if (c.tagName === 'A') {
        let link;
        // If this link leads to an external address
        if (c.className === 'external text') {
          link = element('a', {
            href: c.href,
            className: 'external',
            textContent: c.textContent,
          });
          // If this link leads to an empty article
        } else if (c.className === 'new') {
          link = document.createTextNode(c.textContent);
          // If this link leads to an article
        } else {
          link = makeLink(c);
        }
        candidate.appendChild(link);
        // If this node is text
      } else if (c.nodeType === 3) {
        const text = document.createTextNode(c.textContent);
        candidate.appendChild(text);
        // If this node is italic
      } else if (c.tagName === 'I') {
        const italic = element('i');
        // Iterate over nodes inside the italic
        c.childNodes.forEach((i) => {
          // if this node is a link
          if (i.tagName === 'A') {
            const link = makeLink(i);
            italic.appendChild(link);
            // if this node is text
          } else if (i.nodeType === 3) {
            const text = document.createTextNode(i.textContent);
            italic.appendChild(text);
          }
        });
        candidate.appendChild(italic);
      }
    });
    container.appendChild(candidate);
  }
  // Make a section element
  function makeSection(tag, n) {
    const text = tag === 'H2' ? n.querySelector('.mw-headline').textContent : n.textContent;
    const section = element('div', {
      className: 'section',
      textContent: text,
    });
    return section;
  }
  /* Fetch */
  fetch(url)
    .then(resp => resp.text())
    .then((data) => {
      // Explain
      const explain = makeExplain(keywords);
      sidebar.appendChild(explain);
      // Parse page and select relevant nodes
      const parser = new DOMParser();
      const page = parser.parseFromString(data, 'text/html');
      const nodes = page.querySelector('.mw-parser-output').querySelectorAll(':scope > ul, :scope > h2, :scope > dl');
      // An element to put everything into
      const container = element('div', {
        className: 'middle',
      });
      // Iterate over relevant nodes
      for (let n = 0; n < nodes.length; n += 1) {
        // If this node is h2
        if (nodes[n].tagName === 'H2') {
          const separator = element('hr');
          const section = makeSection('H2', nodes[n]);
          container.appendChild(separator);
          container.appendChild(section);
          // If this node is dl
        } else if (nodes[n].tagName === 'DL') {
          const separator = element('hr');
          const section = makeSection('DL', nodes[n]);
          container.appendChild(separator);
          container.appendChild(section);
          // If this node is a candidate
        } else {
          nodes[n].querySelectorAll('li')
            .forEach(li => displayCandidate(container, li));
        }
      }
      sidebar.appendChild(container);
      navigation();
      noinput();
    });
};

/**
 * Let the fun start.
 */
init();
