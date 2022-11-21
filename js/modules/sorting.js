const allRadioBtns = document.querySelectorAll('input[type="radio"]');
const ageRadioBtns = document.querySelectorAll('input[name="age"]');
const alphabetRadioBtns = document.querySelectorAll('input[name="alphabet"]');

export const sortingFunctions = {
    sortByInput: function (friendsCopy, searchValue) {
        if (searchValue !== '') {
    
            const filteredFriends = friendsCopy.filter(({fullName}) => {
                fullName = fullName.toLowerCase();
                if (fullName.search(searchValue) !== -1) return true;
            });
            friendsCopy = [...filteredFriends];
            
        } else {
            friendsCopy = [...friendsCopy];
        }
        
        return friendsCopy;
    },
    sortByGender: function (friendsCopy, gender) {
    
        switch(gender) {
            case 'male':
            case 'female':
                return friendsCopy.filter(friend => friend.gender === gender);
            case 'all':
            default:
                return friendsCopy;
        }
    },
    sortByAge: function (friendsCopy, age) {
        if (age) {
    
            friendsCopy.sort(({age: a}, {age: b}) => b - a)
            if (age === "ageUp") friendsCopy.reverse();
    
        } else {
            ageRadioBtns.forEach(radioBtn => {
                radioBtn.checked = false;
            });
        }
    },
    sortByName: function (friendsCopy, alpha) {
        if (alpha) {
    
            friendsCopy.sort(({ fullName: a }, { fullName: b}) =>  a > b ? 1 : -1);
            if (alpha === "ZA") friendsCopy.reverse();
    
        } else {
            alphabetRadioBtns.forEach(radioBtn => {
                radioBtn.checked = false;
            });
        }
    },
    resetRadioBtns: function () {
        allRadioBtns.forEach(radioBtn => {
            radioBtn.checked = false;
        });
    },
}
