
const jwt = require('jsonwebtoken');

//code for JWT token

function verifyToken(req, res, next) {
const token = req.headers.token;
console.log(token,"ryrrrryrryryy")
const secretKey = 'mahadev'
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
 const decoded = jwt.verify(token, secretKey);
 req.userId = decoded.userId;
 next();
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = verifyToken;