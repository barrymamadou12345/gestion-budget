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
let modifUser = "";
addUser.classList.remove('btnr2');
addUser.textContent = 'Executer';
addUser.classList.add('btnr1');
let nom1 ;
let nom2 ;
let nom3 ;
let nom4 ;
let nom5 ;
let nom6 ;
let nom7 ;
let SOMME = 0 ;// mon Compteur

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
  
  bidget.forEach((user, index) => {
    listItem = document.createElement('tr');
    nom1 = ` ${user.prenom}`;
    nom2 = ` ${user.nom}`;
    nom3 = ` ${user.somme}`;
    nom4 = ` ${user.time}`;
    nom7 = ` ${user.transfert}`;
    nom5 = `<td> <button onclick="editUser(${index})">Modifier</button> </td> `;
    nom6 = `<td>  <div class="bouton2" onclick="deleteUser(${index})">Supprimer</div> </td> `;
    listItem.innerHTML = ` 
    <td class="prenom">${nom1}</td> <td class="nom">${nom2}</td> <td class="somme">${nom3}</td> 
    <td class="time">${nom4}</td> <td id="transfert2">${nom7}</td> ${nom5} ${nom6}`;

    listItem.classList.add('style');
    userList.appendChild(listItem);
    localStorage.setItem('moyen', JSON.stringify(bidget));// localStorage
  });
}

let logique ; 
let argent ;
let retirer ;

function calcul() {
  logique = bidget.filter((a) => { // Mon calcule
    let hey = a.transfert ;
    if (hey === 'Dépot') {
      argent = parseInt(a.somme)
      SOMME += argent
      return argent
    }if (hey === 'Retrait') {
      retirer = parseInt(a.somme)
      if (SOMME >= retirer ) {  
        retirer -= SOMME
      } 
    }
  })
  if(retirer > SOMME) {
    document.querySelector('#reponse').textContent =`
    Votre Solde est de : ${SOMME} FCFA !
    Vous ne Pouvez pas Retirer une Somme de ${retirer} qui est Superieur à Votre Solde `; 
  }
};
calcul();

document.querySelector('#money').textContent = SOMME ;
console.log('Mon Compteur = ', SOMME);

bidget.forEach(() => {
  affichageUser();
 // calcul()
  localStorage.setItem('moyen', JSON.stringify(bidget));// localStorage
});

function saveUser(event) { //Ajouter un utilisateur
  event.preventDefault();
  const prenom = document.querySelector("#prenom").value;
  const nom = document.querySelector("#nom").value;
  const somme = document.querySelector("#somme").value;
  const time = document.querySelector("#time").value;
  let transfert = document.querySelector("#transfert").value;

  if(modifUser !== "") {
    bidget[modifUser] = createUser(prenom, nom, somme, time, transfert);
    modifUser = "";
  }else {
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
