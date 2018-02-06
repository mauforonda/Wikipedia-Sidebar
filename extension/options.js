/* global browser, document */

/*
 * Languages available
 */

const languages = [
  {
    code: 'aa',
    language: 'Afar',
  },
  {
    code: 'ab',
    language: 'Abkhazian',
  },
  {
    code: 'af',
    language: 'Afrikaans',
  },
  {
    code: 'ak',
    language: 'Akan',
  },
  {
    code: 'am',
    language: 'Amharic',
  },
  {
    code: 'an',
    language: 'Aragonese',
  },
  {
    code: 'ar',
    language: 'Arabic',
  },
  {
    code: 'as',
    language: 'Assamese',
  },
  {
    code: 'av',
    language: 'Avar',
  },
  {
    code: 'ay',
    language: 'Aymara',
  },
  {
    code: 'az',
    language: 'Azerbaijani',
  },
  {
    code: 'ba',
    language: 'Bashkir',
  },
  {
    code: 'be',
    language: 'Belarusian',
  },
  {
    code: 'bg',
    language: 'Bulgarian',
  },
  {
    code: 'bh',
    language: 'Bihari',
  },
  {
    code: 'bi',
    language: 'Bislama',
  },
  {
    code: 'bm',
    language: 'Bambara',
  },
  {
    code: 'bn',
    language: 'Bengali',
  },
  {
    code: 'bo',
    language: 'Tibetan',
  },
  {
    code: 'br',
    language: 'Breton',
  },
  {
    code: 'bs',
    language: 'Bosnian',
  },
  {
    code: 'ca',
    language: 'Catalan',
  },
  {
    code: 'ce',
    language: 'Chechen',
  },
  {
    code: 'ch',
    language: 'Chamorro',
  },
  {
    code: 'co',
    language: 'Corsican',
  },
  {
    code: 'cr',
    language: 'Cree',
  },
  {
    code: 'cs',
    language: 'Czech',
  },
  {
    code: 'cu',
    language: 'Old Church Slavonic / Old Bulgarian',
  },
  {
    code: 'cv',
    language: 'Chuvash',
  },
  {
    code: 'cy',
    language: 'Welsh',
  },
  {
    code: 'da',
    language: 'Danish',
  },
  {
    code: 'de',
    language: 'German',
  },
  {
    code: 'dv',
    language: 'Divehi',
  },
  {
    code: 'dz',
    language: 'Dzongkha',
  },
  {
    code: 'ee',
    language: 'Ewe',
  },
  {
    code: 'el',
    language: 'Greek',
  },
  {
    code: 'en',
    language: 'English',
  },
  {
    code: 'eo',
    language: 'Esperanto',
  },
  {
    code: 'es',
    language: 'Spanish',
  },
  {
    code: 'et',
    language: 'Estonian',
  },
  {
    code: 'eu',
    language: 'Basque',
  },
  {
    code: 'fa',
    language: 'Persian',
  },
  {
    code: 'ff',
    language: 'Peul',
  },
  {
    code: 'fi',
    language: 'Finnish',
  },
  {
    code: 'fj',
    language: 'Fijian',
  },
  {
    code: 'fo',
    language: 'Faroese',
  },
  {
    code: 'fr',
    language: 'French',
  },
  {
    code: 'fy',
    language: 'West Frisian',
  },
  {
    code: 'ga',
    language: 'Irish',
  },
  {
    code: 'gd',
    language: 'Scottish Gaelic',
  },
  {
    code: 'gl',
    language: 'Galician',
  },
  {
    code: 'gn',
    language: 'Guarani',
  },
  {
    code: 'gu',
    language: 'Gujarati',
  },
  {
    code: 'gv',
    language: 'Manx',
  },
  {
    code: 'ha',
    language: 'Hausa',
  },
  {
    code: 'he',
    language: 'Hebrew',
  },
  {
    code: 'hi',
    language: 'Hindi',
  },
  {
    code: 'ho',
    language: 'Hiri Motu',
  },
  {
    code: 'hr',
    language: 'Croatian',
  },
  {
    code: 'ht',
    language: 'Haitian',
  },
  {
    code: 'hu',
    language: 'Hungarian',
  },
  {
    code: 'hy',
    language: 'Armenian',
  },
  {
    code: 'hz',
    language: 'Herero',
  },
  {
    code: 'ia',
    language: 'Interlingua',
  },
  {
    code: 'id',
    language: 'Indonesian',
  },
  {
    code: 'ie',
    language: 'Interlingue',
  },
  {
    code: 'ig',
    language: 'Igbo',
  },
  {
    code: 'ii',
    language: 'Sichuan Yi',
  },
  {
    code: 'ik',
    language: 'Inupiak',
  },
  {
    code: 'io',
    language: 'Ido',
  },
  {
    code: 'is',
    language: 'Icelandic',
  },
  {
    code: 'it',
    language: 'Italian',
  },
  {
    code: 'iu',
    language: 'Inuktitut',
  },
  {
    code: 'ja',
    language: 'Japanese',
  },
  {
    code: 'jv',
    language: 'Javanese',
  },
  {
    code: 'ka',
    language: 'Georgian',
  },
  {
    code: 'kg',
    language: 'Kongo',
  },
  {
    code: 'ki',
    language: 'Kikuyu',
  },
  {
    code: 'kj',
    language: 'Kuanyama',
  },
  {
    code: 'kk',
    language: 'Kazakh',
  },
  {
    code: 'kl',
    language: 'Greenlandic',
  },
  {
    code: 'km',
    language: 'Cambodian',
  },
  {
    code: 'kn',
    language: 'Kannada',
  },
  {
    code: 'ko',
    language: 'Korean',
  },
  {
    code: 'kr',
    language: 'Kanuri',
  },
  {
    code: 'ks',
    language: 'Kashmiri',
  },
  {
    code: 'ku',
    language: 'Kurdish',
  },
  {
    code: 'kv',
    language: 'Komi',
  },
  {
    code: 'kw',
    language: 'Cornish',
  },
  {
    code: 'ky',
    language: 'Kirghiz',
  },
  {
    code: 'la',
    language: 'Latin',
  },
  {
    code: 'lb',
    language: 'Luxembourgish',
  },
  {
    code: 'lg',
    language: 'Ganda',
  },
  {
    code: 'li',
    language: 'Limburgian',
  },
  {
    code: 'ln',
    language: 'Lingala',
  },
  {
    code: 'lo',
    language: 'Laotian',
  },
  {
    code: 'lt',
    language: 'Lithuanian',
  },
  {
    code: 'lv',
    language: 'Latvian',
  },
  {
    code: 'mg',
    language: 'Malagasy',
  },
  {
    code: 'mh',
    language: 'Marshallese',
  },
  {
    code: 'mi',
    language: 'Maori',
  },
  {
    code: 'mk',
    language: 'Macedonian',
  },
  {
    code: 'ml',
    language: 'Malayalam',
  },
  {
    code: 'mn',
    language: 'Mongolian',
  },
  {
    code: 'mo',
    language: 'Moldovan',
  },
  {
    code: 'mr',
    language: 'Marathi',
  },
  {
    code: 'ms',
    language: 'Malay',
  },
  {
    code: 'mt',
    language: 'Maltese',
  },
  {
    code: 'my',
    language: 'Burmese',
  },
  {
    code: 'na',
    language: 'Nauruan',
  },
  {
    code: 'nd',
    language: 'North Ndebele',
  },
  {
    code: 'ne',
    language: 'Nepali',
  },
  {
    code: 'ng',
    language: 'Ndonga',
  },
  {
    code: 'nl',
    language: 'Dutch',
  },
  {
    code: 'nn',
    language: 'Norwegian Nynorsk',
  },
  {
    code: 'no',
    language: 'Norwegian',
  },
  {
    code: 'nr',
    language: 'South Ndebele',
  },
  {
    code: 'nv',
    language: 'Navajo',
  },
  {
    code: 'ny',
    language: 'Chichewa',
  },
  {
    code: 'oc',
    language: 'Occitan',
  },
  {
    code: 'oj',
    language: 'Ojibwa',
  },
  {
    code: 'om',
    language: 'Oromo',
  },
  {
    code: 'or',
    language: 'Oriya',
  },
  {
    code: 'os',
    language: 'Ossetian / Ossetic',
  },
  {
    code: 'pa',
    language: 'Panjabi / Punjabi',
  },
  {
    code: 'pi',
    language: 'Pali',
  },
  {
    code: 'pl',
    language: 'Polish',
  },
  {
    code: 'ps',
    language: 'Pashto',
  },
  {
    code: 'pt',
    language: 'Portuguese',
  },
  {
    code: 'qu',
    language: 'Quechua',
  },
  {
    code: 'rm',
    language: 'Raeto Romance',
  },
  {
    code: 'rn',
    language: 'Kirundi',
  },
  {
    code: 'ro',
    language: 'Romanian',
  },
  {
    code: 'ru',
    language: 'Russian',
  },
  {
    code: 'rw',
    language: 'Rwandi',
  },
  {
    code: 'sa',
    language: 'Sanskrit',
  },
  {
    code: 'sc',
    language: 'Sardinian',
  },
  {
    code: 'sd',
    language: 'Sindhi',
  },
  {
    code: 'se',
    language: 'Northern Sami',
  },
  {
    code: 'sg',
    language: 'Sango',
  },
  {
    code: 'sh',
    language: 'Serbo-Croatian',
  },
  {
    code: 'si',
    language: 'Sinhalese',
  },
  {
    code: 'sk',
    language: 'Slovak',
  },
  {
    code: 'sl',
    language: 'Slovenian',
  },
  {
    code: 'sm',
    language: 'Samoan',
  },
  {
    code: 'sn',
    language: 'Shona',
  },
  {
    code: 'so',
    language: 'Somalia',
  },
  {
    code: 'sq',
    language: 'Albanian',
  },
  {
    code: 'sr',
    language: 'Serbian',
  },
  {
    code: 'ss',
    language: 'Swati',
  },
  {
    code: 'st',
    language: 'Southern Sotho',
  },
  {
    code: 'su',
    language: 'Sundanese',
  },
  {
    code: 'sv',
    language: 'Swedish',
  },
  {
    code: 'sw',
    language: 'Swahili',
  },
  {
    code: 'ta',
    language: 'Tamil',
  },
  {
    code: 'te',
    language: 'Telugu',
  },
  {
    code: 'tg',
    language: 'Tajik',
  },
  {
    code: 'th',
    language: 'Thai',
  },
  {
    code: 'ti',
    language: 'Tigrinya',
  },
  {
    code: 'tk',
    language: 'Turkmen',
  },
  {
    code: 'tl',
    language: 'Tagalog / Filipino',
  },
  {
    code: 'tn',
    language: 'Tswana',
  },
  {
    code: 'to',
    language: 'Tonga',
  },
  {
    code: 'tr',
    language: 'Turkish',
  },
  {
    code: 'ts',
    language: 'Tsonga',
  },
  {
    code: 'tt',
    language: 'Tatar',
  },
  {
    code: 'tw',
    language: 'Twi',
  },
  {
    code: 'ty',
    language: 'Tahitian',
  },
  {
    code: 'ug',
    language: 'Uyghur',
  },
  {
    code: 'uk',
    language: 'Ukrainian',
  },
  {
    code: 'ur',
    language: 'Urdu',
  },
  {
    code: 'uz',
    language: 'Uzbek',
  },
  {
    code: 've',
    language: 'Venda',
  },
  {
    code: 'vi',
    language: 'Vietnamese',
  },
  {
    code: 'vo',
    language: 'Volapük',
  },
  {
    code: 'wa',
    language: 'Walloon',
  },
  {
    code: 'wo',
    language: 'Wolof',
  },
  {
    code: 'xh',
    language: 'Xhosa',
  },
  {
    code: 'yi',
    language: 'Yiddish',
  },
  {
    code: 'yo',
    language: 'Yoruba',
  },
  {
    code: 'za',
    language: 'Zhuang',
  },
  {
    code: 'zh',
    language: 'Chinese',
  },
  {
    code: 'zu',
    language: 'Zulu',
  },
];

/*
 * Create dropdown menu to select primary language
 */
const menu = document.createElement('select');
menu.name = 'menu';
languages.forEach((lang) => {
  const option = document.createElement('option');
  option.value = lang.code;
  option.appendChild(document.createTextNode(lang.language));
  menu.appendChild(option);
});
const form = document.getElementById('languages');
form.appendChild(menu);

const menuDOM = document.getElementsByTagName('select')[0];

const save = function saveOptions() {
  console.log(menuDOM.value);
};

menuDOM.addEventListener('onchange', save);
