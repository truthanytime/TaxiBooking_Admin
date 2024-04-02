const generatePassword = (length) =>{
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=';
    const passwordArray = [];

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        passwordArray.push(characters[randomIndex]);
    }

    return passwordArray.join('');
}

export default generatePassword; 