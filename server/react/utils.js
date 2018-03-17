export const getRequestToAPI = (url, historyRouter) => {
    return fetch(url, {
        credentials: 'same-origin', // send cookies too
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (response.status === 401) {
                sessionStorage.removeItem('loggedin');
                historyRouter.push('/login');
            }
            return response.json();
        })
        .catch((error) => {
            console.error(error);
        });
};

export const postRequestToAPI = (url, data, historyRouter) => {
    return fetch(url, {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.status === 200 && response.url.indexOf('api/login')) {
                sessionStorage.setItem('loggedin', 'true');
            } else if (response.status === 401 || response.url.indexOf('api/logout')) {
                sessionStorage.removeItem('loggedin');
                // historyRouter.push('/login');
                // return {response: response.statusText};
            }
            return response.json();
        })
        .catch((error) => {
            console.error(error);
        });
};
