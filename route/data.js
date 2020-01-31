const fs = require('fs');
const path = '.';

function pathConcat(pathname) {
    return path + '/' + pathname;
}

function fileReader(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, 'utf8', function (e, d) {

            if (e) reject(e);

            else resolve(JSON.parse(d));
        });
    });
}

function universalMethod(req, res) {
    let path = pathConcat('api' + req.url + '/' + req.method.toLowerCase() + '.json');
    fileReader(path)
        .then(response => {
            res.json(response)
        });
}

function getActionUser(req, res) {
    let path = pathConcat('api/users/');
    let users = [];
    fs.readdir(path, function(err, items) {
        switch (req.params.requestParam) {
            case 'first': {
                let p = fileReader(path + items[0] + '/get.json');
                users.push(p);
                break;
            }
            case 'last': {
                let p = fileReader(path + items[items.length - 1] + '/get.json');
                users.push(p);
                break;
            }
            case 'all': {
                for ( let key in items) {
                    let p = fileReader(path + items[key] + '/get.json');
                    users.push(p);
                }
                break;
            }
            default: {
                let p = fileReader(path + req.params.requestParam + '/get.json');
                users.push(p);
                break;
            }
        }
        Promise.all(users).then(results => res.json(results));
    })
}

function getAllUsers(req, res) {
    let path = pathConcat('api/users/');
    let users = [];
    fs.readdir(path, function(err, items) {
        for ( let key in items) {
            let p = fileReader(path + items[key] + '/get.json');
            users.push(p);
        }
        Promise.all(users).then(results => {
            res.json(results)
        })
    })
}

module.exports = {
    universalMethod,
    getActionUser,
    getAllUsers
};