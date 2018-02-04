export const getCollectionData = (url) => { //rbData
    // rbData = rbData || 'ORG';
    // fetch('/api/collections?option=' + rbData, {credentials: 'same-origin'}) // in order to send cookies too
    //     .then(function(response) {
    //         if (response.status >= 400) {
    //             throw new Error('Bad response from server');
    //         }
    //         return response.json();
    //     })
    // console.log('rbData', rbData);
    return fetch(url, {
        credentials: 'same-origin', // send cookies too
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
        // body: JSON.stringify({
        //     option: rbData || 'ORG' // TODO: remove default argument
        // })
    })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            return response.json();
        })
        // .then((resData) => {
        //     this.setState({ dataFromBackend: resData });
        //     // console.log('resData', resData);
        //     return resData;
        // })
        .catch((error) => {
            console.error(error);
        });
};