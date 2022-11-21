export function sendRequest (url) { 
    return fetch(url).then(response => {
        return response.json();
    }).catch(err => {
        alert('Something went wrong, try again!');
        console.error(err);
        location.reload();
    });
}

export function createFriendsCopy(friends) {
    const temp = [];
    friends.forEach(friend => {
        temp.push({
          fullName: `${friend.name.first} ${friend.name.last}`,
          picture: friend.picture.large,
          email: friend.email,
          phone: friend.phone,
          gender: friend.gender,
          age: friend.dob.age,
        });
    })
    return temp;
}
