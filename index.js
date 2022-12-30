import PROJECTS from './projects.js';
import i18Obj from './translate.js';

window.onload = function () {
  addProjects();
  getTranslate(lang);
};

const addProjects = () => {
  createContentFromList();
  createContentFromImages();
};

const createContentFromList = () => {
  const projectsList = document.getElementsByClassName('projects__list')[0];
  PROJECTS.forEach((project) => {
    const listItem = document.createElement('li');
    listItem.classList.add('projects__item');
    const link = createLinkWithText(project);
    const imgWrapper = createImg(project, 'projects__img-wrapper');
    listItem.append(link);
    listItem.append(imgWrapper);
    projectsList.append(listItem);
  });
};

const createContentFromImages = () => {
  const projectsList = document.getElementsByClassName('projects__images')[0];
  PROJECTS.forEach((project) => {
    const wrapper = document.createElement('div');
    const link = createLink(project, 'link_images');
    const imgWrapper = createImg(project, 'projects__images-wrapper');
    link.append(imgWrapper);
    wrapper.append(link);
    projectsList.append(wrapper);
  });
};

const createImg = (project, className) => {
  const imgWrapper = document.createElement('div');
  imgWrapper.classList.add(className);
  const img = document.createElement('img');
  img.classList.add('projects__img');
  img.src = `${project.img}`;
  imgWrapper.append(img);
  return imgWrapper;
};

const createLinkWithText = (project) => {
  const link = createLink(project, 'link_brown');
  const icon = document.createElement('span');
  icon.classList.add('ico', 'ico_project');
  const description = document.createElement('span');
  description.classList.add('link_text');
  description.setAttribute('data-i18', `${project.name}`);
  link.append(icon);
  link.append(description);
  return link;
};

const createLink = (project, className) => {
  const link = document.createElement('a');
  link.classList.add('link', className);
  link.setAttribute('href', `${project.href}`);
  link.setAttribute('target', '_blank');
  return link;
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

/* Handle hamburger menu */
const hamburger = document.getElementsByClassName('hamburger-icon')[0];
const overlay = document.getElementsByClassName('overlay')[0];
const nav = document.getElementsByClassName('nav__list')[0];

const checkOverlay = () => {
  if (overlay.classList.contains('open')) {
    if (!document.body.classList.contains('fixed')) {
      document.body.classList.add('fixed');
    }
  } else {
    document.body.classList.remove('fixed');
  }
};

const toggleOpenClass = () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
  overlay.classList.toggle('open');
  checkOverlay();
};

overlay.addEventListener('click', () => {
  toggleOpenClass();
});

hamburger.addEventListener('click', () => {
  toggleOpenClass();
});

nav.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('nav__link') &&
    hamburger.classList.contains('open')
  ) {
    toggleOpenClass();
  }
});
