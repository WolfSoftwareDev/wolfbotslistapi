module.exports.getVotes = (id, botid, token) => {
    var data = fetchAsync('https://wolfbotslist/api/getvotes/' + id + '/' + botid + '/' + token)
    return(data)
}

async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
