
//Node Modules
const eventEmitter = require('events');
const https = require('https');
const qs = require('querystring')

//Library checker
const Lib = (library, client) => {
    try {
        const lib = require.cache[require.resolve(library)]
        return lib && client instanceof lib.exports.Client
    }catch (err) {
        return(false)
    }
}

//Checks for Library Support
const isSupportedLib = client => Lib('discord.js', client) || Lib('eris', client);


class WBLAPI extends eventEmitter {
    /** Wolf Bots list API Instance
     * @param {string} token Your Wolf bots list API token
     * @param {any} [client] 
    */
    constructor(token) {
        super();
        this.token = token;
    }
    /**
     * @param {string} method The method (GET/POST)
     * @param {string} path  The API End point
     * @param {Object} [data]
     * @private
     * @returns {Promise<Object>}
    */
    _request(method, path, data) {
        return new Promise((resolve, reject) => {
        const response = {
            raw: '',
            body: null,
            status: null,
            headers: null
        }

        const options = {
            hostname: `api.wolfbotslist.tk`,
            path: `/api/${path}`,
            method,
            headers: {}
        }

        if (this.token) {
            options.headers.AuthToken = this.token;
        } else {
            console.warn('Warning: No WBL token has been provided.');
        }
        if (data && method === 'post') options.headers['content-type'] = 'application/json';
        if (data && method === 'get') options.path += `?${qs.encode(data)}`;
        const request = https.request(options, res => {
                response.status = res.statusCode;
                response.headers = res.headers;
                response.ok = res.statusCode >= 200 && res.statusCode < 300;
                response.statusText = res.statusMessage;
                res.on('data', chunk => {
                    response.raw += chunk;
                });
                res.on('end', () => {
                    response.body = res.headers['content-type'].includes('application/json') ? JSON.parse(response.raw) : response.raw;
                    if (response.ok) {
                        resolve(response);
                    } else {
                        const err = new Error(`${res.statusCode} ${res.statusMessage}`);
                        Object.assign(err, response);
                        reject(err);
                    }
                });
            });
        
                request.on('error', err => {
                reject(err);
                });
        
            if (data && method === 'post') request.write(JSON.stringify(data));
            request.end();
        });
    }

    /** Gets stats from WBL
     * @returns {Promise<Object>}
     */
    async getVotes() {
        const response = await this._request('get', 'getvotes')
        return response.body.Votes
    }
}

module.exports = WBLAPI