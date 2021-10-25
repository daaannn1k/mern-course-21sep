import jwt from "jsonwebtoken";
import config from "config";

const authMiddleware = (req, res, next) => {
  //req.method este o metoda/functie speciala care ajuta sa determinam daca este accesibil serverul. Daca e OPTIONS, atunci returnam next()

  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; //Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: "Not authorized user" });
    }

    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded;

    next();
  } catch (e) {
    res.status(401).json({ message: "Not authorized user" });
  }
};

export default authMiddleware;
