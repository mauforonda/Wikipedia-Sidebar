/* global browser, window, document, DOMParser, fetch:false */

// Arrow navigation
const navigation = function keyboardNavigation() {
  // All .navigable elements are navigable
  const links = document.getElementsByClassName('navigable');

  // Select the first navigable element
  let selected = 0;
  links[selected].classList.add('selected');

  // Rules for key events, including key combinations
  const map = {};
  function rules(e) {
    e.preventDefault();
    map[e.keyCode] = e.type === 'keydown';

    // Enter: trigger a click event
    if (map[13]) {
      links[selected].click();
      document.body.removeEventListener('keydown', rules);
      document.body.removeEventListener('keyup', rules);

      // Up: select the previous navigable element
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

      // Down: select the next navigable element
    } else if (map[40]) {
      if (selected < links.length - 1) {
        links[selected].classList.remove('selected');
        selected += 1;
        links[selected].classList.add('selected');
        links[selected].scrollIntoView({ behavior: 'instant', block: 'nearest' });
      }

      // Ctrl+Shift+V: close the sidebar
    } else if (map[17] && map[16] && map[86]) {
      browser.sidebarAction.close();

      // Home: scroll to the top
    } else if (map[36]) {
      window.scroll(0, 0);

      // End: scroll to the bottom
    } else if (map[35]) {
      window.scroll(0, document.body.scrollHeight);
    }
  }

  // Listen to key events
  document.body.addEventListener('keydown', rules);
  document.body.addEventListener('keyup', rules);
};

// Suggest a page in non-English languages
const languages = function checkNonEnglishPages(keywords) {
  // Wikipedia language codes
  const codes = {
    aa: 'Afar',
    ab: 'Abkhazian',
    af: 'Afrikaans',
    ak: 'Akan',
    am: 'Amharic',
    an: 'Aragonese',
    ar: 'Arabic',
    as: 'Assamese',
    av: 'Avar',
    ay: 'Aymara',
    az: 'Azerbaijani',
    ba: 'Bashkir',
    be: 'Belarusian',
    bg: 'Bulgarian',
    bh: 'Bihari',
    bi: 'Bislama',
    bm: 'Bambara',
    bn: 'Bengali',
    bo: 'Tibetan',
    br: 'Breton',
    bs: 'Bosnian',
    ca: 'Catalan',
    ce: 'Chechen',
    ch: 'Chamorro',
    co: 'Corsican',
    cr: 'Cree',
    cs: 'Czech',
    cu: 'Old Church Slavonic / Old Bulgarian',
    cv: 'Chuvash',
    cy: 'Welsh',
    da: 'Danish',
    de: 'German',
    dv: 'Divehi',
    dz: 'Dzongkha',
    ee: 'Ewe',
    el: 'Greek',
    en: 'English',
    eo: 'Esperanto',
    es: 'Spanish',
    et: 'Estonian',
    eu: 'Basque',
    fa: 'Persian',
    ff: 'Peul',
    fi: 'Finnish',
    fj: 'Fijian',
    fo: 'Faroese',
    fr: 'French',
    fy: 'West Frisian',
    ga: 'Irish',
    gd: 'Scottish Gaelic',
    gl: 'Galician',
    gn: 'Guarani',
    gu: 'Gujarati',
    gv: 'Manx',
    ha: 'Hausa',
    he: 'Hebrew',
    hi: 'Hindi',
    ho: 'Hiri Motu',
    hr: 'Croatian',
    ht: 'Haitian',
    hu: 'Hungarian',
    hy: 'Armenian',
    hz: 'Herero',
    ia: 'Interlingua',
    id: 'Indonesian',
    ie: 'Interlingue',
    ig: 'Igbo',
    ii: 'Sichuan Yi',
    ik: 'Inupiak',
    io: 'Ido',
    is: 'Icelandic',
    it: 'Italian',
    iu: 'Inuktitut',
    ja: 'Japanese',
    jv: 'Javanese',
    ka: 'Georgian',
    kg: 'Kongo',
    ki: 'Kikuyu',
    kj: 'Kuanyama',
    kk: 'Kazakh',
    kl: 'Greenlandic',
    km: 'Cambodian',
    kn: 'Kannada',
    ko: 'Korean',
    kr: 'Kanuri',
    ks: 'Kashmiri',
    ku: 'Kurdish',
    kv: 'Komi',
    kw: 'Cornish',
    ky: 'Kirghiz',
    la: 'Latin',
    lb: 'Luxembourgish',
    lg: 'Ganda',
    li: 'Limburgian',
    ln: 'Lingala',
    lo: 'Laotian',
    lt: 'Lithuanian',
    lv: 'Latvian',
    mg: 'Malagasy',
    mh: 'Marshallese',
    mi: 'Maori',
    mk: 'Macedonian',
    ml: 'Malayalam',
    mn: 'Mongolian',
    mo: 'Moldovan',
    mr: 'Marathi',
    ms: 'Malay',
    mt: 'Maltese',
    my: 'Burmese',
    na: 'Nauruan',
    nd: 'North Ndebele',
    ne: 'Nepali',
    ng: 'Ndonga',
    nl: 'Dutch',
    nn: 'Norwegian Nynorsk',
    no: 'Norwegian',
    nr: 'South Ndebele',
    nv: 'Navajo',
    ny: 'Chichewa',
    oc: 'Occitan',
    oj: 'Ojibwa',
    om: 'Oromo',
    or: 'Oriya',
    os: 'Ossetian / Ossetic',
    pa: 'Panjabi / Punjabi',
    pi: 'Pali',
    pl: 'Polish',
    ps: 'Pashto',
    pt: 'Portuguese',
    qu: 'Quechua',
    rm: 'Raeto Romance',
    rn: 'Kirundi',
    ro: 'Romanian',
    ru: 'Russian',
    rw: 'Rwandi',
    sa: 'Sanskrit',
    sc: 'Sardinian',
    sd: 'Sindhi',
    se: 'Northern Sami',
    sg: 'Sango',
    sh: 'Serbo-Croatian',
    si: 'Sinhalese',
    sk: 'Slovak',
    sl: 'Slovenian',
    sm: 'Samoan',
    sn: 'Shona',
    so: 'Somalia',
    sq: 'Albanian',
    sr: 'Serbian',
    ss: 'Swati',
    st: 'Southern Sotho',
    su: 'Sundanese',
    sv: 'Swedish',
    sw: 'Swahili',
    ta: 'Tamil',
    te: 'Telugu',
    tg: 'Tajik',
    th: 'Thai',
    ti: 'Tigrinya',
    tk: 'Turkmen',
    tl: 'Tagalog / Filipino',
    tn: 'Tswana',
    to: 'Tonga',
    tr: 'Turkish',
    ts: 'Tsonga',
    tt: 'Tatar',
    tw: 'Twi',
    ty: 'Tahitian',
    ug: 'Uyghur',
    uk: 'Ukrainian',
    ur: 'Urdu',
    uz: 'Uzbek',
    ve: 'Venda',
    vi: 'Vietnamese',
    vo: 'Volapük',
    wa: 'Walloon',
    wo: 'Wolof',
    xh: 'Xhosa',
    yi: 'Yiddish',
    yo: 'Yoruba',
    za: 'Zhuang',
    zh: 'Chinese',
    zu: 'Zulu',
  };

  const url = `https://www.wikidata.org/w/api.php?format=json&action=wbgetentities&sites=enwiki|frwiki|eswiki|dewiki&props=sitelinks&titles=${keywords}`;
  fetch(url)
    .then(resp => resp.json())
    .then((data) => {
      Object.keys(data.entities).forEach((entity) => {
        if (data.entities[entity].type) {
          // Header
          const explain = document.createElement('div');
          explain.className = 'small';
          explain.textContent = 'There is no exact page for that in English, but I found it in these languages:';
          document.body.appendChild(explain);

          // Language list
          const container = document.createElement('div');
          container.className = 'middle';
          container.setAttribute('id', 'languages');
          const list = document.createElement('ul');
          const sitelinks = data.entities[entity].sitelinks;
          Object.keys(sitelinks).forEach((sitelink) => {
            if (sitelink.match(/[a-z]{2}wiki$/g) != null) {
              const c = sitelink.substring(0, 2);
              if (codes[c]) {
                const item = document.createElement('li');
                const language = document.createElement('a');
                language.className = 'navigable';
                language.textContent = codes[c];
                language.setAttribute(
                  'data-code',
                  c,
                );
                language.setAttribute(
                  'data-title',
                  sitelinks[sitelink].title,
                );
                language.addEventListener(
                  'click',
                  (event) => {
                    explain.remove();
                    container.remove();
                    search.remove();
                    extract(
                      event.target.getAttribute('data-title'),
                      event.target.getAttribute('data-code'),
                    );
                  },
                );
                item.appendChild(language);
                list.appendChild(item);
              }
            }
          });
          container.appendChild(list);
          document.body.appendChild(container);

          // Suggest full text search
          const search = document.createElement('div');
          const get = document.createElement('a');
          get.setAttribute('class', 'navigable');
          get.textContent = 'Or get full text search results in English';
          get.addEventListener('click', () => {
            explain.remove();
            container.remove();
            search.remove();
            fulltext(keywords, 0);
          });
          search.appendChild(get);
          document.body.appendChild(search);

          // Arrow navigation
          navigation();
        }
      });
      if (document.getElementById('languages') == null) {
        fulltext(keywords, 0);
      }
    });
  if (document.getElementsByTagName('INPUT')[0]) {
    document.getElementsByTagName('INPUT')[0].remove();
  }
};

  // Full search
const fulltext = function checkFullTextSearchResults(keywords, offset) {
  const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=1&indexpageids=&list=search&srlimit=20&srprop=snippet&sroffset=${offset}&srsearch=${keywords}`;
  fetch(url)
    .then(resp => resp.json())
    .then((data) => {
      const totalhits = data.query.searchinfo.totalhits;

      // No search result
      if (totalhits === 0) {
        // Follow suggested search terms
        const suggestion = data.query.searchinfo.suggestion;
        if (suggestion) {
          fulltext(suggestion, 0);

          // No suggestions
        } else {
          const nothing = document.createElement('div');
          nothing.setAttribute('id', 'nothing');
          nothing.textContent = "Couldn't find a page or search results for that";
          document.body.appendChild(nothing);
        }
      } else {
        // Search header
        const intro = document.createElement('div');
        intro.className = 'intro';
        if (offset === 0) {
          const text1 = document.createTextNode("There's no exact page for that, but I found ");
          const bold = document.createElement('b');
          bold.textContent = String(totalhits);
          const text2 = document.createTextNode(' search results on Wikipedia.');
          const explain = document.createElement('p');
          explain.className = 'small';
          explain.appendChild(text1);
          explain.appendChild(bold);
          explain.appendChild(text2);
          intro.appendChild(explain);
        }
        const count = document.createElement('p');
        if (totalhits < offset + 20) {
          count.textContent = `Results ${String(offset)} to ${String(totalhits)}:`;
        } else {
          count.textContent = `Results ${String(offset)} to ${String(offset + 20)}:`;
        }
        intro.appendChild(count);

        // Search results
        const results = document.createElement('div');
        results.className = 'middle';
        for (let r = 0; r < data.query.search.length; r += 1) {
          const result = document.createElement('div');
          result.className = 'small simple';
          const link = document.createElement('a');
          link.className = 'navigable simple';
          link.textContent = data.query.search[r].title;
          link.addEventListener('click', (event) => {
            intro.remove();
            results.remove();
            if (document.getElementById('next')) {
              document.getElementById('next').remove();
            }
            extract(event.target.textContent);
          });
          const snippet = document.createElement('p');
          snippet.className = 'snippet';
          const plainsnippet = data.query.search[r].snippet.split(RegExp('(?:<span class="searchmatch">|</span>)')).join('');
          snippet.textContent = plainsnippet;
          const separator = document.createElement('hr');
          result.appendChild(link);
          result.appendChild(snippet);
          results.appendChild(separator);
          results.appendChild(result);
        }

        // Display header and results
        document.body.appendChild(intro);
        document.body.appendChild(results);

        // Next page
        const newoffset = offset + 20;
        if (newoffset < totalhits) {
          const next = document.createElement('div');
          next.setAttribute('id', 'next');
          const link = document.createElement('a');
          link.className = 'navigable';
          link.textContent = 'Next 20 results';
          link.addEventListener(
            'click',
            () => {
              intro.remove();
              results.remove();
              next.remove();
              fulltext(keywords, offset);
            },
          );
          next.appendChild(link);
          document.body.appendChild(next);
        }

        // Arrow navigation
        navigation();
      }

      if (document.getElementsByTagName('INPUT')[0]) {
        document.getElementsByTagName('INPUT')[0].remove();
      }
    });
};

  // Disambiguation
function disambiguate(keywords) {
  // Fetch HTML page
  const url = `https://en.wikipedia.org/wiki/${keywords}`;
  fetch(url)
    .then(resp => resp.text())
    .then((data) => {
      const parser = new DOMParser();
      const page = parser.parseFromString(data, 'text/html');

      // Make introduction line
      const explain = document.createElement('div');
      explain.className = 'small intro';
      const bold = document.createElement('b');
      bold.textContent = keywords;
      const text1 = document.createTextNode(' may refer to:');
      explain.appendChild(bold);
      explain.appendChild(text1);
      document.body.appendChild(explain);

      const createcandidate = function createCandidateElement(item) {
        const candidate = document.createElement('p');
        candidate.className = 'candidate';
        item.childNodes.forEach((c) => {
          // Make candidate links
          if (c.tagName === 'A') {
            if (c.getAttribute('class') === 'external text') {
              const link = document.createElement('a');
              link.setAttribute('href', c.getAttribute('href'));
              link.className = 'external';
              link.textContent = c.textContent;
              candidate.appendChild(link);
            } else if (c.getAttribute('class') === 'new') {
              const link = document.createTextNode(c.textContent);
              candidate.appendChild(link);
            } else {
              const link = document.createElement('a');
              link.setAttribute('class', 'navigable');
              link.textContent = c.getAttribute('title');
              link.addEventListener(
                'click',
                (event) => {
                  explain.remove();
                  container.remove();
                  extract(event.target.textContent);
                },
              );
              candidate.appendChild(link);
            }

            // Make candidate text
          } else if (c.nodeType === 3) {
            const text2 = document.createTextNode(c.textContent);
            candidate.appendChild(text2);

            // Make candidate italic links and text
          } else if (c.tagName === 'I') {
            const italic = document.createElement('i');
            c.childNodes.forEach((i) => {
              if (i.tagName === 'A') {
                const link = document.createElement('a');
                link.setAttribute('class', 'navigable');
                link.textContent = i.getAttribute('title');
                link.addEventListener(
                  'click',
                  (event) => {
                    explain.remove();
                    container.remove();
                    extract(event.target.textContent);
                  },
                );
                italic.appendChild(link);
              } else if (i.nodeType === 3) {
                const text = document.createTextNode(i.textContent);
                italic.appendChild(text);
              }
            });
            candidate.appendChild(italic);
          }
        });

        // Put everything together
        container.appendChild(candidate);
      };

      // Get all relevant nodes
      const mwparser = page.querySelector('.mw-parser-output');
      const nodes = mwparser.querySelectorAll(':scope > ul, :scope > h2, :scope > dl');
      const container = document.createElement('div');
      container.className = 'middle';
      for (let node = 0; node < nodes.length; node += 1) {
        // Make a domain section
        if (nodes[node].tagName === 'H2') {
          const separator = document.createElement('hr');
          const domain = document.createElement('div');
          domain.className = 'section';
          domain.textContent = nodes[node].querySelector('.mw-headline').textContent;
          container.appendChild(separator);
          container.appendChild(domain);

          // Make a similar word section
        } else if (nodes[node].tagName === 'DL') {
          const separator = document.createElement('hr');
          const similar = document.createElement('div');
          similar.className = 'section';
          similar.textContent = nodes[node].textContent;
          container.appendChild(separator);
          container.appendChild(similar);

          // Make disambiguation candidates
        } else {
          nodes[node].querySelectorAll('li').forEach(item => createcandidate(item));
        }
      }

      // Display
      document.body.appendChild(container);

      // Arrow navigation
      navigation();

      if (document.getElementsByTagName('INPUT')[0]) {
        document.getElementsByTagName('INPUT')[0].remove();
      }
    });
}

// Get article image
const thumbnail = function getWikipediaThumbnail(keywords) {
  const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=1&indexpageids=&prop=pageimages&pithumbsize=360&titles=${keywords}`;
  fetch(url)
    .then(resp => resp.json())
    .then((data) => {
      const pageid = data.query.pageids[0];
      if (pageid !== '-1' && data.query.pages[pageid].thumbnail !== undefined) {
        const container = document.createElement('div');
        const supercontainer = document.createElement('div');
        const back = document.createElement('div');
        const image = document.createElement('img');
        container.className = 'simple imagecontainer';
        supercontainer.className = 'simple imagecontainer imgsupercontain';
        back.className = 'imgback';
        image.setAttribute(
          'id',
          'articleimg',
        );
        image.setAttribute(
          'src',
          data.query.pages[pageid].thumbnail.source,
        );
        image.setAttribute(
          'alt',
          data.query.pages[pageid].title,
        );
        image.addEventListener(
          'load',
          () => {
            supercontainer.setAttribute('style', 'background: linear-gradient(to bottom, transparent, #0a0415cc)');
          },
        );
        container.appendChild(back);
        container.appendChild(image);
        supercontainer.appendChild(container);
        const title = document.getElementsByClassName('title')[0];
        document.body.insertBefore(supercontainer, title);
      }
    });
};

  // Get article extract
const extract = function getWikipediaExtract(
  keywords,
  lang = 'en',
) {
  const url = `https://${lang}.wikipedia.org/w/api.php?format=json&action=query&redirects=1&indexpageids=&prop=extracts|templates&exintro=&explaintext=&tltemplates=Template:Disambiguation|Template:Dmbox|Template:Biology_disambiguation|Template:Call_sign_disambiguation|Template:Caselaw_disambiguation|Template:Chinese_title_disambiguation|Template:Disambiguation_cleanup|Template:Genus_disambiguation|Template:Hospital_disambiguation|Template:Human_name_disambiguation|Template:Human_name_disambiguation_cleanup|Template:Letter_disambiguation|Template:Letter-Number_Combination_Disambiguation|Template:Mathematical_disambiguation|Template:Mil-unit-dis|Template:Number_disambiguation|Template:Phonetics_disambiguation|Template:Place_name_disambiguation|Template:Road_disambiguation|Template:School_disambiguation|Template:Species_Latin_name_abbreviation_disambiguation|Template:Species_Latin_name_disambiguation|Template:Synagogue_disambiguation|Template:Taxonomic_authority_disambiguation|Template:Taxonomy_disambiguation|Template:Wikipedia_disambiguation|Template:Set_index_article|Template:Animal_common_name|Template:Chemistry_index|Template:Enzyme_index|Template:Fungus_common_name|Template:Given_name|Template:Lake_index|Template:Locomotive_index|Template:Molecular_formula_index|Template:Mountain_index|Template:Nickname|Template:Plant_common_name|Template:River_index|Template:Road_index|Template:Ship_index|Template:Sport_index|Template:Storm_index|Template:Surname&titles=${keywords}`;
  fetch(url)
    .then(resp => resp.json())
    .then((data) => {
      const pageid = data.query.pageids[0];
      if (pageid === '-1') {
        // If there is no page, check other languages
        languages(keywords);
      } else if (data.query.pages[pageid].templates) {
        // Display disambiguation pages
        disambiguate(keywords);
      } else {
        // Display extract
        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = keywords;
        const body = document.createElement('div');
        body.textContent = data.query.pages[pageid].extract;
        const reference = document.createElement('div');
        reference.className = 'reference';
        const link = document.createElement('a');
        link.setAttribute('href', `https://en.wikipedia.org/wiki/${keywords}`);
        link.textContent = 'Wikipedia';
        reference.appendChild(link);
        const separator1 = document.createElement('hr');
        separator1.className = 'titleseparator';
        const separator2 = document.createElement('hr');
        separator2.className = 'refseparator';
        document.body.appendChild(title);
        document.body.appendChild(separator1);
        document.body.appendChild(body);
        document.body.appendChild(separator2);
        document.body.appendChild(reference);

        // Focus cursor on sidebar
        if (document.getElementsByTagName('INPUT')[0]) {
          document.getElementsByTagName('INPUT')[0].remove();
        }

        // Search text selections inside extract
        const tooltip = function drawSelectionTooltip() {
          const selection = window.getSelection();
          if (selection.toString() !== '') {
            // Make tooltip
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const container = document.createElement('div');
            container.setAttribute('id', 'tooltip');
            container.style.top = `${rect.top + window.scrollY}px`;
            container.style.left = `${rect.left}px`;
            container.style.height = `${rect.height}px`;
            container.style.width = `${rect.width}px`;
            const w = document.createElement('a');
            w.textContent = 'W';
            w.setAttribute('id', 'tooltiptext');
            w.setAttribute('data-selection', selection.toString());
            w.addEventListener(
              'click',
              (event) => {
                title.remove();
                separator1.remove();
                body.remove();
                separator2.remove();
                reference.remove();
                if (document.getElementsByClassName('imgsupercontain')[0]) {
                  document.getElementsByClassName('imgsupercontain')[0].remove();
                }
                extract(event.target.getAttribute('data-selection'));
                container.remove();
              },
            );
            container.appendChild(w);
            if (document.getElementById('tooltip')) {
              document.getElementById('tooltip').remove();
            }
            document.body.appendChild(container);
          } else if (document.getElementById('tooltip')) {
            document.getElementById('tooltip').remove();
          }
        };
        body.addEventListener(
          'mouseup',
          tooltip,
        );

        // Get image
        thumbnail(keywords);
      }
    });
};

const manual = function typeSearch() {
  const explain = document.createElement('div');
  explain.className = 'small';
  const text1 = document.createElement('p');
  text1.className = 'snippet';
  text1.textContent = "You selected nothing or this page doesn't allow me get your selection.";
  const text2 = document.createElement('p');
  text2.className = 'snippet';
  text2.textContent = 'Please type your query:';
  explain.appendChild(text1);
  explain.appendChild(text2);
  const input = document.getElementsByTagName('INPUT')[0];
  document.body.insertBefore(explain, input);
  input.setAttribute('style', 'border: #a26d54; border-style: solid; border-width: 1px; color: #a26d54; background: #ffffff; padding: 0px 7px; margin: 0px 25px; line-height: 25px; border-radius: 3px; width: 75%');
  input.addEventListener(
    'keyup',
    (event) => {
      event.preventDefault();
      if (event.keyCode === 13) {
        explain.remove();
        input.setAttribute('style', 'border: none; color: #fbfbfb; background: #fbfbfb;');
        extract(input.value);
      }
    },
  );
};

const create = function actOnContentScriptMessage(message) {
  const keywords = encodeURIComponent(message.selected);
  if (keywords === '') {
    manual();
  } else {
    extract(keywords);
  }
};

function init() {
  browser.tabs.query({ currentWindow: true, active: true })
    .then((tabs) => {
      tabs.forEach((tab) => {
        browser.runtime.onMessage.addListener(create);
        browser.tabs.executeScript(tab.id, { file: 'getselection.js' });
      });
    });
}

init();
