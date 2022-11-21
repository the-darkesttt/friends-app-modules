const usersList = document.querySelector('.users-list');

function createElement({fullName, picture, email, phone, gender, age}) {
    return `
    <li class='list-item'>
        <div class='user-top'>
            <img src='${picture}'>
            <h2 userData-name="${fullName}">${fullName}</h2>
            <p>${email}</p>
            <p>${phone}</p>
        </div>
        <div class='user-bottom'>
            <p data-gender='${gender}'>${gender}</p>
            <p data-age='${age}'>${age}</p>
        </div>
    </li>
    `;
}

export const generateUsers = (users) => {
    usersList.innerHTML = users.reduce((acc, user) => {
        return acc += createElement(user);
    }, '');
};
