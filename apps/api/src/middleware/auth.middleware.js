const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri: "http://keycloak:8080/realms/task-manager/protocol/openid-connect/certs",
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      callback(err);
      return;
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid or missing authorization header",
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
      token,
      getKey,
      { algorithms: ["RS256"] },
      (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "Invalid or expired token",
          });
        }

        const clientId = process.env.KEYCLOAK_CLIENT_ID;
        const realmRoles = decoded.realm_access?.roles || [];
        const clientRoles = clientId && decoded.resource_access?.[clientId]?.roles || [];

        const allRoles = [...realmRoles, ...clientRoles];
        
        //console.log("Rôles extraits du token :", allRoles);
        req.user = {
          id: decoded.sub,
          email: decoded.email,
          username: decoded.preferred_username,
          roles: allRoles,
        };

        next();
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;