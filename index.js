import i18Obj from './translate.js';

const ruSwitcher = document.getElementsByClassName('switcher-item__ru')[0];
const enSwitcher = document.getElementsByClassName('switcher-item__en')[0];
let activeSwitcher = enSwitcher;
let lang = activeSwitcher.innerText.toLowerCase();

const toggleActiveSwitcher = () => {
  ruSwitcher.classList.toggle('active');
  enSwitcher.classList.toggle('active');
  activeSwitcher = ruSwitcher.classList.contains('active')
    ? ruSwitcher
    : enSwitcher;
  lang = activeSwitcher.innerText.toLowerCase();
  getTranslate(lang);
  console.log(lang);
};

ruSwitcher.addEventListener('click', toggleActiveSwitcher);
enSwitcher.addEventListener('click', toggleActiveSwitcher);

const getTranslate = (lang) => {
  const textToTranslate = document.querySelectorAll('[data-i18]');
  textToTranslate.forEach(
    (textItem) => (textItem.textContent = i18Obj[lang][textItem.dataset.i18])
  );
};
