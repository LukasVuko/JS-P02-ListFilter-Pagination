/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// HELPERS
const list = document.getElementsByClassName('student-item');

function addSelected() {
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
  const pageCount = Math.floor(list.length / 10) + 1; // Generate number of pages

  const newDiv = document.createElement('div'); // Generate and append .pagination DIV
  newDiv.className = 'pagination';
  document.querySelector('.page').appendChild(newDiv);

  const newUl = document.createElement('ul'); // Generate and append .pageList UL
  newUl.className = 'pageList';
  document.querySelector('.pagination').appendChild(newUl);

  for (i = 0; i < pageCount; i++) {
    let newListItem = document.createElement('li');
    let newAnchorTag = document.createElement('a');
    newAnchorTag.href = '#';
    newAnchorTag.innerText = i + 1;
    newListItem.appendChild(newAnchorTag);
    document.querySelector('.pageList').appendChild(newListItem);
  }

  const allLinks = document.querySelectorAll('a');

  newUl.addEventListener('click', function (e) {
    removeAllClasses(allLinks);
    allLinks[e.target.innerText - 1].className = 'active';
    showPage(list, e.target.innerText - 1);
  });
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
    console.log(listLi);
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
  });
}

addSelected();
showPage(list, 0);
appendPageLinks(list);
appendSearch();
