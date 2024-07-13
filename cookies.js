const setCookie = (res, name, value, days) => {
    const options = {
        httpOnly: true,
        maxAge: days * 24 * 60 * 60 * 1000 // days in milliseconds
    };
    res.cookie(name, value, options);
};

const readCookie = (req, name) => {
    return req.cookies[name];
};

const editCookie = (res, name, value, days) => {
    setCookie(res, name, value, days);
};

const deleteCookie = (res, name) => {
    res.clearCookie(name);
};

module.exports = {
    setCookie,
    readCookie,
    editCookie,
    deleteCookie
};