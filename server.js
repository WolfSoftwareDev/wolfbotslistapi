//var client = new HttpClient();

module.exports.getVotes = (id, botid, token) => {
    // client.get('https://wolfbotslist/api/getvotes/' + id + '/' + botid + '/' + token, function(res){
    //     console.log(res)
    // });
    var data = fetchAsync('https://wolfbotslist/api/getvotes/' + id + '/' + botid + '/' + token)
    return(data)
}

// var HttpClient = function() {
//     this.get = function(aUrl, aCallback) {
//         var anHttpRequest = new XMLHttpRequest();
//         anHttpRequest.onreadystatechange = function() { 
//             if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
//                 aCallback(anHttpRequest.responseText);
//         }

//         anHttpRequest.open( "GET", aUrl, true );            
//         anHttpRequest.send( null );
//     }
// }


async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}