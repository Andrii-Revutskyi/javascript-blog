'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = ''; // Clear the list

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';  // Variable to accumulate all the links

  /* loop through all articles */
  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id'); // Get article id

    /* find the title element */
    const articleTitleElement = article.querySelector(optTitleSelector); // Get the title element

    /* get the title from the title element */
    const articleTitle = articleTitleElement.innerHTML; // Get article title text

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* append the link to html variable */
    html = html + linkHTML; // Add new HTML to the html variable
  }

  /* after the loop, insert all the links at once */
  titleList.innerHTML = html; // Insert all links into titleList

  /* Now, after generating the links, add event listeners */
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

  console.log(html); // Output the generated HTML to the console
}

generateTitleLinks();