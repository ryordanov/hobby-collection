// function saveItem(id){
//     $.ajax({
//         url: "/save/" + id,
//         type: "POST",
//         data: {idToSave: 'item:' + id}, //send this to server
//         success: function(returned) {
//              console.log(returnet); // here can get the return of route
//         },
//         error: function() {

//         }
//     });
// }

function saveAjax(id) {
    var xhr = new XMLHttpRequest();

    var newStrItems = document.getElementsByClassName("editableItems")[id].value;

    xhr.open('POST', '/save/id');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {      //onreadystatechange        //if (this.readyState === 4) {
        var jsonResponse = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && jsonResponse.id !== id && jsonResponse.items !== undefined) {
            alert('Something went wrong when modifying id [' + id +']. Database is not getting updated after submitting. ' + jsonResponse.items);
        }
        else if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
        else {
            deColorify(id);
            document.getElementsByClassName("editableItems")[id].value = jsonResponse.items;
        }
    };
    xhr.send(encodeURI('itemIdToUpdate=' + id + '&itemValueToUpdate=' + newStrItems));
}

function colorify(id) {
    var pressedButton = document.getElementsByClassName("btnPendingSaveGreen")[id];
    //pressedButton.className += " btnPendingSaveYellow";
    pressedButton.classList.add("btnPendingSaveYellow");
    
}

function deColorify(id) {
    var pressedButton = document.getElementsByClassName("btnPendingSaveGreen")[id];
    //pressedButton.className -= " btnPendingSaveYellow";
    pressedButton.classList.remove("btnPendingSaveYellow");
    

}
function updateList(action) {
    
    window.location.href=action
}