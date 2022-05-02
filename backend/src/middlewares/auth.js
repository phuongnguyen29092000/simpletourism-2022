// const httpStatus = require('http-status')
// const jwt = require('jsonwebtoken')
// const localStorage = require('localStorage')
// const { authService, userService } = require('../services')

// const auth = (...roles) => {
//     return async(req, res, next) => {
//         // const token = req.cookies.token
//         const token = localStorage.getItem('token');
//         if (!token) {
//             return res.status(httpStatus.UNAUTHORIZED).send("Unauthorization")
//         }

//         try {
//             const data = jwt.verify(token, process.env.JWT_SECRET)
//             req.userId = data.id
//             const user = await userService.getUserById(req.userId)
//             if (!user) res.status(httpStatus.FORBIDDEN).send("Token invalid")
//             if (!roles.includes(user.role)) {
//                 return res.status(httpStatus.UNAUTHORIZED).send("Unauthorization")
//             }
//             req.role = user.role
//             req.name = user.name
//             req.email = user.email
//             next();
//         } catch {
//             return res.status(httpStatus.FORBIDDEN).send("Forbidden")
//         }

//     }
// }

// module.exports = auth