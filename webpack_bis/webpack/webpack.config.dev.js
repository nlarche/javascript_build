var config = {};
// a remplacer par le chemin complet du repertoire webapp du projet static en local
config.STATIC_DIRECTORY = 'path external deps';
// a remplacer par votre IP
config.IP = 'localhost';
// a remplacer par l'URL de votre serveur tomcat
config.SERVER_URL = 'http://' + config.IP + ':8080/app/';

module.exports = config;
