class myClass {
    constructor() { }

    then(cb) {
        return new Promise((resolve, reject) => {
            // do something...
            let err = 'error';
            if (err) {
                reject(err);
            } else {
                resolve('data')
            }
        });
    }
}

module.exports = myClass;
