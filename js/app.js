import { sendRequest, createFriendsCopy } from './modules/data_processing.js';
import { generateUsers } from './modules/generating_html.js';
import { paginationList, createPaginationList, returnSelectedPage, getSelectedPage, setSelectedPage } from './modules/pagination.js';
import { sortingFunctions } from './modules/sorting.js';

const sortBar = document.querySelector('.sort-bar');
const searchBar = document.querySelector('.sort-bar__search');

// get data

const requestUsersNum = 24;
const requestURL = `https://randomuser.me/api/?results=${requestUsersNum}&exc=location,login,registered,cell,id,nat`;

let initialFriendsArr = [];

sendRequest(requestURL)
.then((serverData) => {
  initialFriendsArr = serverData.results;
  initialFriendsArr = createFriendsCopy(initialFriendsArr);
  generateUsers(returnSelectedPage(initialFriendsArr));
  createPaginationList(initialFriendsArr);
})
.catch((err) => {
    console.error(err);
});

// sorting bar 

let friendsArrCopy;

const sortingState = {
    'searchInputValue': '',
    'selectedGender': '',
    'selectedAgeDirection': '',
    'selectedAlphabetDirection': '',
    'resetSorting': '',
}

let { searchValue, gender, age, alpha, reset } = sortingState;

function handleSorting(friends) {
    friends = sortingFunctions.sortByInput(friends, searchValue);
    friends = sortingFunctions.sortByGender(friends, gender);
    sortingFunctions.sortByAge(friends, age);
    sortingFunctions.sortByName(friends, alpha)
    friends = resetToInitial(friends);

    createPaginationList(friends);
    friends = returnSelectedPage(friends);
    
    generateUsers(friends);
}

sortBar.addEventListener('click', ({target}) => {
    friendsArrCopy = [...initialFriendsArr];

    if (target.name === 'gender') {
        gender = target.value;
        setSelectedPage(1);
    }

    if (target.name === 'age') {
        age = target.value;
        alpha = null;
    }

    if (target.name === 'alphabet') {
        alpha = target.value;
        age = null;
    }

    if (target.value !== 'reset') {
        reset = false;
    }

    if (target.value === 'reset') {
        reset = true;
    }
    
    handleSorting(friendsArrCopy);
})

// sorting functions

searchBar.addEventListener('input', ({target}) => {
    friendsArrCopy = [...initialFriendsArr];
    searchValue = target.value.trim().toLowerCase();
    handleSorting(friendsArrCopy);
});

function resetToInitial(friendsCopy) {
    if (reset) {
        gender = null;
        age = null;
        alpha = null;
        searchBar.value = '';
        resetRadioBtns();

        friendsCopy = [...initialFriendsArr];
    }
    return friendsCopy;
}

// pagination

paginationList.addEventListener('click', ({target}) => {
    friendsArrCopy = [...initialFriendsArr];
    if (target.tagName === 'A') {
        getSelectedPage(target);
    }
    handleSorting(friendsArrCopy);
});
