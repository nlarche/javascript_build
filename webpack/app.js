// Commun 
require('./components/commun/commun.js');
require('./components/commun/constant/constant.js');
require('./components/commun/navigation/navigation.js');
require('./components/commun/service/comptes-services.js');
require('./components/commun/service/contexte-service.js');
require('./components/commun/service/tva-service.js');
require('./components/commun/service/journaux-service.js');
require('./components/commun/service/compte-comptable-service.js');
require('./components/commun/service/mots-cles-services.js');
require('./components/commun/service/filtre-service.js');
require('./components/commun/ng-draggable/ng-draggable.js');
require('./components/commun/select-complex/select-complex.js');
require('./components/commun/select-complex-mobile/select-complex-mobile.js');


// Home 
require('./components/home/home.js');
require('./components/cgus/cgus.js');


// Banque 
require('./components/banque/banque.js');
require('./components/banque/banque-msg.js');
require('./components/banque/service/banques-services.js');
require('./components/banque/service/bk-rsa-crypt.js');
require('./components/banque/ajout/ajout-commun.js');
require('./components/banque/ajout/ajout-banque-controller.js');
require('./components/banque/ajout/bi/ajout-banque-srv.js');
require('./components/banque/ajout/bk/ajout-banque-srv.js');
require('./components/banque/admin/actions-utilisateurs/actions-utilisateurs.js');
require('./components/banque/admin/admin-banque.js');
require('./components/banque/admin/admin-banque-srv.js');


// Ventilation 
require('./components/ventilation/ventilation.js');
require('./components/ventilation/select-affectation/select-affectation.js');
require('./components/ventilation/ventilation-msg.js');
// Consultation
require('./components/ventilation/consultation/consultation.js');
require('./components/ventilation/consultation/filtre-consultation.js');
require('./components/ventilation/consultation/repartition-operation.js');
require('./components/ventilation/consultation/ajout-compte.js');
require('./components/ventilation/consultation/consultation-navigation.js');
require('./components/ventilation/consultation/consultation-mot-cle.js');
require('./components/ventilation/consultation/consultation-mobile.js');
// Depense pro 
require('./components/ventilation/depense-pro/depense-pro.js');
require('./components/ventilation/depense-pro/depense-pro-mobile.js');
require('./components/ventilation/depense-pro/filtre-depense-pro.js');
require('./components/ventilation/depense-pro/depense-pro-service.js');

// Export 
require('./components/export-comptable/export-comptable.js');
require('./components/export-comptable/export-comptable-services.js');

// mots clés 
require('./components/mots-cles/mots-cles.js');
require('./components/mots-cles/mots-cles-popup.js');

// parametre 
require('./components/parametre/parametre.js');
require('./components/comparatif/comparatif.js');
require('./components/comparatif/comparatif-factory.js');

// Opération divers 
require('./components/od/operation-divers.js');

// Application compta rapide 
require('./cr.js');