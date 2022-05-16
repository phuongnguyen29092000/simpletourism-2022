const auth = (req, res, next) => {
    console.log(req.userProfile);
    if (!req.userProfile) {
        res.status(401).send("fail")
    } else {
        next();
    }
};

module.exports = auth