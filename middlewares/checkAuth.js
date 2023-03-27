// write a middle ware

function checkAuth(req,res,next) {
    
    if (!req.session.user) {

        res.status(403).send("FORBIDDEN"); // if have a respond, then no need for next()
        return
    }

    // the user is authenticated,
    // go to next thing
    next(); // handle the request to the next pipeline, next() is a callback

}

module.exports = checkAuth;
