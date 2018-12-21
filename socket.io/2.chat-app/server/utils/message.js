const setMessage =  (from, msg) => {
    return {
        from,     // es6 similar to from:from
        msg,
        createdAt: new Date().toLocaleTimeString
    }
};

const setLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        createdAt: new Date().toLocaleTimeString,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`
    }
};

module.exports.setMessage = setMessage ;
module.exports.setLocationMessage = setLocationMessage ;

