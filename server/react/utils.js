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
                if (historyRouter) historyRouter.push('/login');
            }
            return response.json();
        })
        .catch((error) => {
            console.error(error);
            sessionStorage.removeItem('loggedin');
            if (historyRouter) historyRouter.push('/login');
        });
};

export const postRequestToAPI = (url, data , historyRouter) => {
    return fetch(url, {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.status === 200 && response.url.indexOf('api/login') > -1) {
                sessionStorage.setItem('loggedin', 'true');
            } else if (response.status === 401 || response.url.indexOf('api/logout') > -1) {
                sessionStorage.removeItem('loggedin');
                // if (historyRouter) historyRouter.push('/login');
                // return {response: response.statusText};
            }
            return response.json();
        })
        .catch((error) => {
            console.error(error);
            sessionStorage.removeItem('loggedin');
            if (historyRouter) historyRouter.push('/login');
        });
};

export const buildUrl = (rootUrl, uri, queryParams) => {
    // let rootUrl = '/add';

    if (rootUrl[0] !== '/') {
        rootUrl = '/' + rootUrl;
    }

    if (uri && Array.isArray(uri)) {
        uri.forEach(element => {
            if (element !== undefined && element !== null) {
                rootUrl += `/${encodeURIComponent(element)}`;
            }
        });
    } else if (uri && typeof uri === 'object') {
        for (let key in uri) {
            if (uri.hasOwnProperty(key)) {
                rootUrl += `/${encodeURIComponent(uri[key])}`;
            }
        }
    }

    if (queryParams && typeof queryParams === 'object') {
        rootUrl += '?';
        for (let key in queryParams) {
            if (queryParams.hasOwnProperty(key)) {
                rootUrl += `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}&`;
            }
        }
        rootUrl = rootUrl.slice(0, -1); // remove last ampersand
    }
    return rootUrl;
};

export const concatQueryParams = (query) => {
    let queryString = query.substring(1).split('&');
    let queryParams = {};
    queryString.forEach(element => {
        let keyValue = element.split('=');
        queryParams[keyValue[0]] = keyValue[1];
    });
    return queryParams;
};

export function setNestedValue(obj, pathKeys, value) {
    if (typeof pathKeys == 'string') {
        pathKeys = pathKeys.split('.');
    }
    if (pathKeys.length > 1) {
        setNestedValue(obj[pathKeys.shift()], pathKeys, value);
    } else {
        obj[pathKeys[0]] = value;
    }
}

export function formatLabel(value) {
    return value.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
