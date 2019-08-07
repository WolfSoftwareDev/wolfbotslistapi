module.exports.Votecount = (id, botid, token) => {
    var data = get('https://wolfbotslist/api/getvotes/' + id + '/' + botid + '/' + token)
    return(data)
}

function get(url){
    const http = new XMLHttpRequest()

    http.open("GET", url)
    http.send()

    http.onload = () => data = http.responseText
    return data
}