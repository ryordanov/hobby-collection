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
        body: JSON.stringify(data),
        // body: JSON.stringify({
        //     'ala': 'bala'
        // })
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

    // fetch('/api/save/2',{
    //     method: 'POST',
    //     body: JSON.stringify({
    //       'task': 'self.refs.task.value'
    //     }),
    //     headers: {"Content-Type": "application/json"}
    //   })
    //   .then(function(response){
    //       debugger
    //     return response.json()
    //   }).then(function(body){
    //     console.log(body);
    //     alert(self.refs.task.value)
    //   });
}