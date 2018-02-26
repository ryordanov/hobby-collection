export const getRequestToAPI = (url) => {
    return fetch(url, {
        credentials: 'same-origin', // send cookies too
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'sessionID': 'dimitrichka'
        }
    })
        .then((response) => {
            // if (response.status >= 400) {
            //     throw new Error('Bad response from server');
            // }
            if (response.status === 401) {
                storage.removeItem('loggedin');
            }
            return response.json();
        })
        .catch((error) => {
            console.error(error);
        });
};

export const postRequestToAPI = (url, data) => {
    return fetch(url, {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'sessionID': 'dimitrichka'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then((response) => {
            // if (response.status >= 400) {
            //     throw new Error('Bad response from server');
            // }
            if (response.status === 401) {
                storage.removeItem('loggedin');
            }
            return response.json();
        })
        .catch((error) => {
            console.error(error);
        });
};
