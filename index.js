import PROJECTS from './projects.js';
import i18Obj from './translate.js';

window.onload = function () {
  addProjects();
  getTranslate(lang);
};

const addProjects = () => {
  const projects = document.getElementsByClassName('projects')[0];
  PROJECTS.forEach((project) => {
    const listItem = document.createElement('li');
    listItem.classList.add('projects__item');
    const link = document.createElement('a');
    link.classList.add('link', 'link_brown');
    link.setAttribute('href', `${project.href}`);
    link.setAttribute('target', '_blank');
    const icon = document.createElement('span');
    icon.classList.add('ico', 'ico_project');
    const description = document.createElement('span');
    description.classList.add('link_text');
    description.setAttribute('data-i18', `${project.name}`);
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('projects__img-wrapper');
    const img = document.createElement('img');
    img.classList.add('projects__img');
    img.src = `${project.img}`;
    link.append(icon);
    link.append(description);
    imgWrapper.append(img);
    listItem.append(link);
    listItem.append(imgWrapper);
    projects.append(listItem);
  });
};

const ruSwitcher = document.getElementsByClassName(
  'language-switcher__item_ru'
)[0];
const enSwitcher = document.getElementsByClassName(
  'language-switcher__item_en'
)[0];
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
