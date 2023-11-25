
// nouveau 0

/* Exercice React-Js !
  Des Recherches sur des conceptes :
  Composants Reutilisables ,
  Props ,
  States , 
  JSX ,
  Houks ,
  DOM ,
  DOM Virtuel ;
*//////////////

////////////////////////////////////////////
/* Faire une application de gestion de Budjet ;
  Prenom, Nom, Somme, date et heure, type de transaction (dépot ou retrait)
 l'utilisateur définit le budget dans un formulaire.
  Afficher le budget dans un tableau.
  Depot ajoute , Retrait Soustrait ;
  lister tous les transactions 
  Récupérer la date et l'heure
  Recherche en temps reel (LES NOMS)
  Plus de 5 elements on fait la  Pagination !
  Afficher sous forme de card le budget total.
  --------------Déployer--------
  Charte Js 
*/
///////////////////////////////////////


// Récupérer les éléments du DOM
const userForm = document.querySelector('#userForm');
const userList = document.querySelector('#userList');
const addUser = document.querySelector('#addUser');
const smsPrenom = document.querySelector('#smsPrenom');
const smsNom = document.querySelector('#smsNom');
const smsSomme = document.querySelector('#smsSomme');
let modifUser = "";
addUser.classList.remove('btnr2');
addUser.textContent = 'Executer';
addUser.classList.add('btnr1');
let nom1;
let nom2;
let nom3;
let nom4;
let nom5;
let nom6;
let nom7;
let SOMME = 0;// mon Compteur

let bidget = JSON.parse(localStorage.getItem('moyen')) || []; //TableauBidget .

function createUser(prenom, nom, somme, time, transfert) { //Créer l'objet d'un Utilisateur
  return { prenom, nom, somme, time, transfert };
}
function resetForm() { //Effacer le Formulaire
  userForm.reset();
  modifUser = "";
}

function affichageUser() { //Afficher la liste des utilisateurs
  userList.innerHTML = "";

  bidget.forEach((index) => {
    nom5 = `<td> <button onclick="editUser(${index})"><i class="fa-solid fa-pen-to-square"></i></button> </td> `;
    nom6 = `<td>  <div class="bouton2" onclick="deleteUser(${index})"><i class="fa-solid fa-trash-can"></i></div> </td> `;
    localStorage.setItem('moyen', JSON.stringify(bidget));// localStorage
  });
}
let logique;
let argent;
let retire;

function calcul() {
  logique = bidget.filter((a) => { // Mon calcule
    let hey = a.transfert;
    if (hey === 'Dépot') {
      argent = parseInt(a.somme)
      SOMME += argent
    } if (hey === 'Retrait') {
      retire = parseInt(a.somme)
      SOMME -= retire;
    }
  })
};

calcul();
document.querySelector('#money').textContent = SOMME;
bidget.forEach(() => {
  affichageUser();
  localStorage.setItem('moyen', JSON.stringify(bidget));// localStorage
});

function saveUser(event) {
  event.preventDefault();
  const prenom = document.querySelector("#prenom").value;
  const nom = document.querySelector("#nom").value;
  const somme = document.querySelector("#somme").value;
  const time = document.querySelector("#time").value;
  let transfert = document.querySelector("#transfert").value;

  // Vérifier si la somme est un nombre positif
  if (isNaN(somme) || somme < 0) {
    smsSomme.textContent = "La somme doit être un nombre positif.";
    return;
  } else {
    smsSomme.textContent = "";
  }

  // Vérifier si le prénom et le nom ne contiennent que du texte
  if (!/^[a-zA-Z]+$/.test(prenom)) {
    smsPrenom.textContent = "Le prénom ne doit contenir que du texte";
    return;
  } else {
    smsPrenom.textContent = "";
  }
  if (!/^[a-zA-Z]+$/.test(nom)) {
    smsNom.textContent = "Le Nom ne doit contenir que du texte";
    return;
  } else {
    smsNom.textContent = "";
  }

  // Vérifier si c'est une opération de retrait
  if (transfert === 'Retrait') {
    // Convertir la somme en nombre
    const sommeValue = parseInt(somme);

    // Vérifier si le solde est suffisant
    if (sommeValue > SOMME) {
      // Afficher un message d'erreur
      smsSomme.textContent = `Impossible ! Vérifiez votre solde.`;
      return; // Sortir de la fonction pour éviter l'ajout de la transaction
    }
  }

  if (modifUser !== "") {
    bidget[modifUser] = createUser(prenom, nom, somme, time, transfert);
    modifUser = "";
  } else {
    bidget.unshift(createUser(prenom, nom, somme, time, transfert));
  }
  
  calcul();
  resetForm();
  affichageUser();
  location.reload();
  addUser.classList.remove('btnr2');
  addUser.textContent = 'Ajouter';
  addUser.classList.add('btnr1');
}


// Ecouter le Click sur le boutton Ajouter
userForm.addEventListener("submit", saveUser);

function editUser(modifier) { //Modifier un Utilisateur
  addUser.classList.remove('btnr1');
  addUser.textContent = 'Modifier';
  addUser.classList.add('btnr2');
  const unique = bidget[modifier];
  document.querySelector("#prenom").value = unique.prenom;
  document.querySelector("#nom").value = unique.nom;
  document.querySelector("#somme").value = unique.somme;
  document.querySelector("#time").value = unique.time;
  document.querySelector("#transfert").value = unique.transfert;
  modifUser = modifier;
}

function deleteUser(index) {//Supprimer un Utilisateur
  bidget.splice(index, 1);
  localStorage.setItem('moyen', JSON.stringify(bidget));// localStorage
  affichageUser();
  location.reload();
  calcul()
}

let pageActuelle = 1;
document.getElementById('pageActuelle').textContent = pageActuelle;
const elementsParPage = 4;

function genererTableau(utilisateurs) {
  const table = document.getElementById('userList');
  table.innerHTML = '';

  let debutIndex = (pageActuelle - 1) * elementsParPage;
  let finIndex = debutIndex + elementsParPage;

  utilisateurs.slice(debutIndex, finIndex).forEach((utilisateur, index) => {
    const row = table.insertRow();
    const cellPrenom = row.insertCell(0);
    const cellNom = row.insertCell(1);
    const cellSomme = row.insertCell(2);
    const cellDate = row.insertCell(3);
    const cellType = row.insertCell(4);
    const cellModif = row.insertCell(5);
    const cellSupr = row.insertCell(6);

    cellPrenom.innerHTML = utilisateur.prenom;
    cellNom.innerHTML = utilisateur.nom;
    cellSomme.innerHTML = utilisateur.somme;
    cellDate.innerHTML = utilisateur.time;
    cellType.innerHTML = utilisateur.transfert;
    nom5 = `<td> <button onclick="editUser(${index})"><i class="fa-solid fa-pen-to-square"></i></button> </td> `;
    nom6 = `<td>  <div class="bouton2" onclick="deleteUser(${index})"><i class="fa-solid fa-trash-can"></i></div> </td> `;
    cellModif.innerHTML = nom5;
    cellSupr.innerHTML = nom6;
  });
}

const boutonPrecedent = document.getElementById('boutonPrecedent');
const boutonSuivant = document.getElementById('boutonSuivant');

boutonPrecedent.addEventListener('click', () => {
  if (pageActuelle > 1) {
    pageActuelle -= 1;
    document.getElementById('pageActuelle').textContent = pageActuelle;
    genererTableau(bidget);
  }
});

boutonSuivant.addEventListener('click', () => {
  const totalPages = Math.ceil(bidget.length / elementsParPage);
  if (pageActuelle < totalPages) {
    pageActuelle += 1;
    document.getElementById('pageActuelle').textContent = pageActuelle;
    genererTableau(bidget);
  }
});

function init() {
  const rechercher = document.getElementById('rechercher');
  rechercher.addEventListener('input', () => {
    filtrerUtilisateurs(rechercher.value);
  });
  const totalPages = Math.ceil(bidget.length / elementsParPage);
  document.getElementById('totalPages').textContent = totalPages;
  genererTableau(bidget);
}


// Fonction pour filtrer les utilisateurs en fonction de la recherche
function filtrerUtilisateurs(recherche) {
  const resultatFiltre = bidget.filter((a) =>
    a.prenom.toLowerCase().includes(recherche.toLowerCase())
  );
  genererTableau(resultatFiltre);
}

// Appel de la fonction d'initialisation au chargement de la page
window.onload = init;


