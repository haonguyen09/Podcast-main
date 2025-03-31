function getObjectFromLocalStorage(key) {
    let jsonString = localStorage.getItem(key);
    return jsonString ? JSON.parse(jsonString) : {};
}


function saveObjectToLocalStorage(key, obj) {
    let jsonString = JSON.stringify(obj);
    localStorage.setItem(key, jsonString);
}

function updateObjectInLocalStorage(key, newData) {
    let obj = getObjectFromLocalStorage(key);
    Object.assign(obj, newData);
    saveObjectToLocalStorage(key, obj);
}

export {
    getObjectFromLocalStorage,
    saveObjectToLocalStorage,
    updateObjectInLocalStorage
}