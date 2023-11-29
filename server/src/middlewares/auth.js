import jwt from 'jsonwebtoken'

// authorization
const handleRequestPayload = (req, res, next) => {
  const privateKey = process.env.PRIVATE_KEY;
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");
  try {
    const decoded = jwt.verify(token, privateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

export default handleRequestPayload;
