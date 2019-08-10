const https = require('https');

async function Votecount(id, botid, token){
    var enddata;
    https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        enddata = data
        console.log(JSON.parse(data));
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
    return(enddata)
}

module.exports.Votecount = async (id, botid, token) => {
    var data = await Votecount(id, botid, token);
    return(data)
}