const userPerPageNum = 6;
let selectedPage = 1;
let pageNum;

export const paginationList = document.querySelector('.pagination-list');

function countPages(friendsCopy) {
    if (Number.isInteger(friendsCopy.length / userPerPageNum)) {
        pageNum = friendsCopy.length / userPerPageNum;
    } else {
        pageNum = Math.round(friendsCopy.length / userPerPageNum);
    }
}

export function createPaginationList(friendsCopy) {
    countPages(friendsCopy);

    paginationList.innerHTML = '';
    for (let i = 1; i <= pageNum; i++) {
        const paginationListElem = document.createElement('LI');
        const paginationLink = document.createElement('A');
        paginationLink.setAttribute('href', '#');
        paginationLink.dataset.pageNum = i;
        paginationLink.innerHTML = i;
        
        if (i == selectedPage) {
            paginationListElem.classList.add('selected-page');
        }

        paginationList.appendChild(paginationListElem);
        paginationListElem.appendChild(paginationLink);
    }
};

export function returnSelectedPage(friendsCopy) {
    const sliceStart = userPerPageNum * (selectedPage - 1);
    const sliceEnd = userPerPageNum + sliceStart;
    const slicedUsersArr = friendsCopy.slice(sliceStart, sliceEnd);
    return slicedUsersArr;
}

export function getSelectedPage(target) {
    selectedPage = target.dataset.pageNum;
}

export function setSelectedPage(value) {
    selectedPage = value;
}
