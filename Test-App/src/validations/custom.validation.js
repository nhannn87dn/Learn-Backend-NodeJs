const password = (value, helpers) => {
    if(!value.match(/\d/) || !value.match(/a-zA-Z/)){
        return helpers.message('Password invalid');
    }
    return value;
}

const passwordStrong = (value, helpers) => {
    if(!value.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/)){
        return helpers.message('Password invalid');
    }
    return value;
}

/* Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character */
const passwordVeryStrong = (value, helpers) => {
    if(!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)){
        return helpers.message('Password invalid');
    }
    return value;
}

/* only match yyyy-mm-dd */
const dateFormat =  (value, helpers) => {
    if(!value.match(/^(\d{4}-\d{2}-\d{2})/)){
        return helpers.message(`${value} is Incorrect format allowed yyyy-mm-dd`);
    }
    return value;
}



const objectId =  (value, helpers) => {
    if(!value.match(/[0-9a-fA-F]{24}/)){
        return helpers.message(`${value} non-Objectid`);
    }
    return value;
}

module.exports = {
    password,
    passwordStrong,
    passwordVeryStrong,
    objectId,
    dateFormat
}