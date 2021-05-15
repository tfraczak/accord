export const validUrlToken = path => {
    const pattern = /^((https?:\/\/)?(accord\.com\/))?[\w]{10}$/;
    const isValid = path.match(pattern);
    if (isValid) return isValid[0].slice(-10);
    return null;
};

export const serverInitials = name => {
    let newName;
    if (name.includes(" ")) {
        newName = name.split(" ").map(word => word[0]).join("");
    } else if (name.includes("-")) {
        newName = name.split("-").map(word => {
            for (let i=0; i < word.length; i++) {
                if (word[i] !== " ") return word[i];
            }
        }).join("-");
    }
    return newName;
};

export const convertToSnakeCase = obj => {
    const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    let newObj = {};
    let keys = Object.keys(obj);
    let values = Object.values(obj);
    let convertedKeys = keys.map(key => camelToSnakeCase(key));
    for(let i = 0; i < keys.length; i++) { newObj[convertedKeys[i]] = values[i] }
    return newObj;
};