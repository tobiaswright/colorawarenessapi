const request = require('request');

const getData = (data) => {
    const url = 'https://api.github.com/repos/'+data.repository.owner.name+'/'+data.repository.name+'/contents/'+data.commits[0].modified[0]
    
    const opts = {
        url: url,
        headers: {
            'User-Agent': 'tobiaswright-colorawarenessapi',
            'accept': 'application/vnd.github.VERSION.raw'
        }
    }

    const promise = new Promise((resolve, reject) => {
        request(opts, function (err, res, body) {

            resolve(body)
        });
    });
    
    return promise
};

const formatData = (data) => {
    const promise = new Promise((resolve, reject) => {
        resolve(JSON.stringify(JSON.parse(data)))
    });
    
    return promise
}

module.exports = function (context, data) {
    // context.log(data);
    // context.done();
    getData(data)
    .then(formatData)
    .then(data => {
        context.log(data);
        context.done();
    })
}
