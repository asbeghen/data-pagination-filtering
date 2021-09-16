/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Global Variables
*/
const studentList = document.querySelector('ul.student-list');
const linkList = document.querySelector('ul.link-list');


/*
`showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page) => {
  const startIndex = (page * 9) - 9;
  const endIndex = page * 9;
  studentList.innerHTML = '';

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      studentList.insertAdjacentHTML('beforeend', `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${list[i].picture.medium}" alt="${list[i].name.first}'s Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
          </div>
        </li>
      `);
    }
  }
};


/*
`addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const addPagination = (list) => {
  const paginationButtonCount = Math.ceil(list.length / 9);
  linkList.innerHTML = '';

  // Insert pagination buttons
  for (let i = 1; i <= paginationButtonCount; i++) {
    linkList.insertAdjacentHTML('beforeend', `
       <li>
         <button type="button">${i}</button>
       </li>
    `);
  }

  const buttons = linkList.querySelectorAll('button');

  // Add active class to first button
  linkList.querySelector('li button').classList.add('active');

  /*
  `removeActiveState` function
  This function will remove the active state of all buttons
  */
  const removeActiveState = () => {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('active');
    }
  };

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      removeActiveState();
      buttons[i].classList.add('active');
      showPage(list, buttons[i].textContent);
    });
  }
};


/*
`addSearchBar` function
This function will create the search input and handle the search event
*/
const addSearchBar = (list) => {
  const header = document.querySelector('header');
  const searchInputhtml = `
    <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>
  `;

  header.innerHTML += searchInputhtml;
  header.insertAdjacentHTML('afterend', `<div data-no-results></div>`);

  const searchInput = document.querySelector('input');
  const button = document.querySelector('.student-search button');
  const noResultsMsg = document.querySelector('[data-no-results]');

  button.addEventListener('click', () => {
    const searchedName = searchInput.value.toLowerCase();
    let newListArray = [];

    for (let i = 0; i < list.length; i++) {
      const firstName = list[i].name.first.toLowerCase();
      const lastName = list[i].name.last.toLowerCase();

      if (firstName.includes(searchedName) || lastName.includes(searchedName)) {
        newListArray.push(list[i]);
      }
    }

    if (newListArray.length > 0) {
      studentList.style.display = 'grid';
      linkList.style.display = 'block';
      noResultsMsg.textContent = '';
      showPage(newListArray, 1);
      addPagination(newListArray);

    } else {
      studentList.style.display = 'none';
      linkList.style.display = 'none';
      noResultsMsg.textContent = 'No results found';
    }
  });
};


// Call functions
showPage(data, 1);
addPagination(data);
addSearchBar(data);