const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => { 
        //console.log("Rôles requis par la route :", allowedRoles);
        //console.log("Rôles reçus dans req.user :", req.user?.roles);

        const userRoles = req.user?.roles || [];

        const authorized = allowedRoles.some(role =>
            userRoles.includes(role)
        );

        if (!authorized) {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        next();
    };
};

module.exports = roleMiddleware;