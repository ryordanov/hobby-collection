export const getCollectionDataFromBackend = (url) => {
    return fetch(url, {
        credentials: 'same-origin', // send cookies too
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        if (response.status >= 400) {
            throw new Error('Bad response from server');
        }
        return response.json();
    })
    .catch((error) => {
        console.error(error);
    });
};

export const sendCollectionDataToBackend = (url, data) => {
    return fetch(url, {
        credentials: 'same-origin',
        headers: {"Content-Type": "application/json"},
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then((response) => {
        if (response.status >= 400) {
            throw new Error('Bad response from server');
        }
        return response.json();
    })
    .catch((error) => {
        console.error(error);
    });
}