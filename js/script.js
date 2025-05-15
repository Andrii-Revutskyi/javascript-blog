'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  if (targetArticle) {
    targetArticle.classList.add('active');
  }
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {
  console.log('customSelector:', customSelector);
  console.log('Full selector:', optArticleSelector + customSelector);

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitleElement = article.querySelector(optTitleSelector);
    const articleTitle = articleTitleElement.innerHTML;
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    html += linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    if (!tagsWrapper) continue;

    const articleTags = article.getAttribute('data-tags');
    if (!articleTags) continue;

    const articleTagsArray = articleTags.split(' ');
    let html = '';

    for (let tag of articleTagsArray) {
      html += `<li><a href="#tag-${tag}">${tag}</a></li>`;
    }

    tagsWrapper.innerHTML = html;
  }

  addClickListenersToTags();
}

function tagClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll(`a[href="${href}"]`);
  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }

  generateTitleLinks(`[data-tags~="${tag}"]`);
}

function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  for (let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    if (!authorWrapper) continue;

    let author = article.getAttribute('data-author');

    if (!author) {
      author = authorWrapper.textContent.trim();
      article.setAttribute('data-author', author);
    }

    authorWrapper.innerHTML = `<a href="#author-${author}">${author}</a>`;
  }

  addClickListenersToAuthors();
}

function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }

  const authorLinks = document.querySelectorAll(`a[href="${href}"]`);
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }

  generateTitleLinks(`[data-author="${author}"]`);
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

generateTitleLinks();
generateTags();
generateAuthors();

