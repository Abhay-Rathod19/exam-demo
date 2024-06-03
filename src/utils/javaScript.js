export const ternary = (test, isTrue, isFalse) => {
    return test ? isTrue : isFalse;
}

export const objectKeys = (object) => {
    return Object.keys(object);
}

export const objectValues = (object) => {
    return Object.values(object);
}

export const setToLocalStorage = (key, dataValue) => {
    return localStorage.setItem(key, dataValue)
}

export const getFromLocalStorage = (key) => {
    return localStorage.getItem(key)
}

export const rmvFromLclStorage = (key) => {
    return localStorage.removeItem(key);
}