// Il faut impérativement 4 arguments : err, req, res, next
const arrorHandler = (err, req, res, next) => {
    console.error(err.stack); // Affiche la vraie erreur dans votre console serveur
    
    res.status(500).json({
        succes: false,
        message: err.message || "Une erreur interne est survenue"
    });
};

module.exports = arrorHandler;