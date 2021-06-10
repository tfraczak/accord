export const validUrlToken = path => {
    const pattern = /^((https?:\/\/)?(accord\.com\/))?[\w]{10}$/;
    const isValid = path.match(pattern);
    if (isValid) return isValid[0].slice(-10);
    return null;
};

const splitName = (name, char) => {
    let newName = name.split(char).map(word => {
        for (let i=0; i < word.length; i++) {
            if (word[i] !== " ") return word[i];
        }
    }).join("").slice(0,5);
    return newName;
}

export const serverInitials = name => {
    let newName;
    if (name.includes(" ")) {
        newName = name.split(" ").map(word => word[0]).join("");
    } else if (name.includes("-")) {
        newName = splitName(name, "-");
    } else if (name.includes("/")) {
        newName = splitName(name, "/");
    } else if (name.includes("_")) {
        newName = splitName(name, "_");
    } else {
        newName = name[0];
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

export const extractDateTime = dateTime => {
    let dateObject = new Date(dateTime);
    
    // find the local time
    const timeOptions = { hour: 'numeric', minute: 'numeric' };
    let time = dateObject.toLocaleTimeString('en-US', timeOptions);
    
    // find the local date
    const dateOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };
    let date = dateObject.toLocaleDateString('en-US', dateOptions);
    
    const now = new Date();
    const dateObj = new Date(date);

    // today?
    if ((now.getDate() === dateObj.getDate()) && (now.getMonth() === dateObj.getMonth()) && (now.getYear() === dateObj.getYear())) {
        return `today at ${time}`;
    }

    // yesterday?
    if ((now.getDate() - dateObj.getDate() === 1) || (now.getMonth() - dateObj.getMonth() === 1) || (now.getYear() - dateObj.getYear() === 1)) {
        return `yesterday at ${time}`;
    }

    // more than a day ago
    return date;
};