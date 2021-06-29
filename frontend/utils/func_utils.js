export const validUrlToken = path => {
    const pattern = /^((https?:\/\/)?(accord\.com\/))?[\w\-]{10}$/;
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
    if (name) {
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
    }

    return "";
    
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

export const printTime = (createdAt, expiration) => {
    createdAt = new Date(createdAt);
    let expiryTime = (expiration * 3600 * 1000) + createdAt.getTime();
    expiryTime = new Date(expiryTime);
    let now = new Date();
    let timeLeft = (expiryTime - now)/1000;
    if (timeLeft <= 0) return "EXPIRED";
    return formatTime(timeLeft);
};

const prependZeroes = string => {
    if (string.length < 2) return "0".concat(string);
    return string;
}

const formatTime = diffTime => {
    let days = diffTime/86400;
    let hours = (days - Math.floor(days)) * 24;
    let minutes = (hours - Math.floor(hours)) * 60;
    let seconds = prependZeroes(Math.floor((minutes - Math.floor(minutes)) * 60).toString());
    minutes = prependZeroes(Math.floor(minutes).toString());
    hours = prependZeroes(Math.floor(hours).toString());
    days = prependZeroes(Math.floor(days).toString());

    return `${days}:${hours}:${minutes}:${seconds}`;
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
        return `Today at ${time}`;
    }

    // yesterday?

    now.setMilliseconds(0);
    now.setSeconds(0);
    now.setMinutes(0);
    now.setHours(0);
    dateObj.setMilliseconds(0);
    dateObj.setSeconds(0);
    dateObj.setMinutes(0);
    dateObj.setHours(0);

    if (now.getTime() - dateObj.getTime() === 1000*60*60*24) {
        return `Yesterday at ${time}`;
    }

    // more than a day ago
    return date;
};

export const membersAlphaAsc = (m1, m2) => {
    if (m1.localUsername && m2.localUsername) {
        if (m1.localUsername < m2.localUsername) return -1;
        if (m2.localUsername <= m1.localUsername) return 1;
    }
    if (m1.localUsername && !m2.localUsername) {
        if (m1.localUsername < m2.username) return -1;
        if (m2.username <= m1.localUsername) return 1;
    }
    if (!m1.localUsername && m2.localUsername) {
        if (m1.username < m2.localUsername) return -1;
        if (m2.localUsername <= m1.username) return 1;
    }
    if (!m1.localUsername && !m2.localUsername) {
        if (m1.username < m2.username) return -1;
        if (m2.username <= m1.username) return 1;
    }
};

export const limitChars = (string, limit) => {
    if (string.length < limit) return string;
    return string.slice(0,limit) + "...";
};