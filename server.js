var request = require('request');
module.exports.Votecount = (id, botid, token) => {
    request('https://wolfbotslist/api/getvotes/' + id + '/' + botid + '/' + token, function (error, response, body) {
        return(body)
    });
}