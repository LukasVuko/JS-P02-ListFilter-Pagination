/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Global Variables
let globalListOfStudentsOnLoad = document.getElementsByClassName(
  'student-item'
);

// HELPERS

function addSelected(list) {
  for (i = 0; i < list.length; i++) {
    list[i].className = 'student-item cf selected';
  }
}

function showPage(list, page) {
  for (i = 0; i < list.length; i++) {
    if (i >= page * 10 && i <= page * 10 + 9) {
      list[i].style.display = '';
    } else {
      list[i].style.display = 'none';
    }
  }
}

function removeAllClasses(list) {
  for (i = 0; i < list.length; i++) {
    list[i].className = '';
  }
}

// AppendPageLinks to document

function appendPageLinks(list) {
  // If existing pages exist, delete them
  const existingDiv = document.querySelector('.pagination');
  if (existingDiv) {
    existingDiv.parentNode.removeChild(existingDiv);
  }

  if (list.length === 0) {
    let h1 = document.createElement('h1');
    h1.className = 'noResults';
    h1.innerText = 'No results were found!';
    document.querySelector('.page').appendChild(h1);
  } else {
    const h1 = document.querySelector('.noResults');
    if (h1) {
      h1.parentNode.removeChild(h1);
    }

    const pageCount = Math.floor(list.length / 10) + 1; // Generate number of pages

    const newDiv = document.createElement('div'); // Generate .pagination DIV - Append to .page DIV
    newDiv.className = 'pagination';
    document.querySelector('.page').appendChild(newDiv);

    const newUl = document.createElement('ul'); // Generate .pageList UL - Append to .pagination DIV
    newUl.className = 'pageList';
    document.querySelector('.pagination').appendChild(newUl);

    // Generate <li><a> tags - Append to .pageList UL
    for (i = 0; i < pageCount; i++) {
      let newListItem = document.createElement('li');
      let newAnchorTag = document.createElement('a');
      newAnchorTag.href = '#';
      newAnchorTag.innerText = i + 1;
      newListItem.appendChild(newAnchorTag);
      document.querySelector('.pageList').appendChild(newListItem);
    }
    showPage(list, 0);

    // Pagination fucntionality
    newUl.addEventListener('click', function (e) {
      const allLinks = document.querySelectorAll('a');
      removeAllClasses(allLinks);
      allLinks[e.target.innerText - 1].className = 'active';
      showPage(list, e.target.innerText - 1);
    });
  }
}

function appendSearch() {
  // Generate Search HTML
  let searchDiv = document.createElement('div');
  searchDiv.className = 'student-search';
  let input = document.createElement('input');
  input.placeholder = 'Search for students...';
  let button = document.createElement('button');
  button.innerText = 'Search';
  searchDiv.appendChild(input);
  searchDiv.appendChild(button);

  // Append Search HTML
  document.querySelector('.page-header').appendChild(searchDiv);

  // Functionality
  document.querySelector('input').addEventListener('keyup', function (e) {
    let input = e.target;
    let filter = input.value.toUpperCase();
    let listLi = document.querySelectorAll('.student-item');
    for (i = 0; i < listLi.length; i++) {
      let li = listLi[i];
      let name = listLi[i].getElementsByTagName('h3')[0];
      let txtValue = name.textContent || name.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li.style.display = '';
        li.className = 'student-item cf selected';
      } else {
        li.style.display = 'none';
        li.className = 'student-item cf';
      }
    }

    const arr = document.getElementsByClassName('selected');
    appendPageLinks(arr);
  });
}

addSelected(globalListOfStudentsOnLoad);
showPage(globalListOfStudentsOnLoad, 0);
appendPageLinks(globalListOfStudentsOnLoad);
appendSearch();
