/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const list = document.getElementsByClassName('student-item');

// HELPERS

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

// Create the `appendPageLinks function` to generate, append, and add functionality to the pagination buttons.

function appendPageLinks(list) {
  const pageCount = Math.floor(list.length / 10) + 1;

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

showPage(list, 1);
appendPageLinks(list);
