// Variables globales
let currentPokemon = null;
let isGuessed = false;

// Éléments du DOM
const imgElement = document.getElementById('pokemon-image'); 
const inputElement = document.getElementById('guess-input');
const messageElement = document.getElementById('result-message');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const dataListElement = document.getElementById('pokemon-list');

// 1. Initialisation : Remplir la liste d'autocomplétion
function initDataList() { // Remplir la datalist avec les noms des Pokémon
    data.forEach(poke => {
        const option = document.createElement('option');
        option.value = poke.nom;
        dataListElement.appendChild(option);
    });
}

// 2. Choisir un Pokémon aléatoire
function pickRandomPokemon() {
    const randomIndex = Math.floor(Math.random() * data.length); // Indice aléatoire
    currentPokemon = data[randomIndex]; // Sélectionner le Pokémon avec l'indice aléatoire
    
    // Reset de l'interface
    isGuessed = false;
    messageElement.classList.add('hidden'); // Cacher le message
    messageElement.className = 'hidden'; // Reset classes (success/error)
    nextBtn.classList.add('hidden'); // Cacher le bouton suivant
    inputElement.value = ''; // Vider l'input
    inputElement.disabled = false; // Réactiver l'input
    inputElement.focus(); // Met la sélection de l'utilisateur sur l'input https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/focus

    // Mise à jour de l'image  
    imgElement.src = `img/${currentPokemon.png}`;
    imgElement.classList.remove('revealed');
    imgElement.classList.add('silhouette');
}

// 3. Fonction pour normaliser le texte (enlever accents et minuscules)
function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

// 4. Vérifier la réponse
function checkGuess() { 
    if (isGuessed) return; // Empêcher de vérifier si déjà gagné

    const userGuess = normalizeString(inputElement.value); // Normaliser la réponse de l'utilisateur
    const correctName = normalizeString(currentPokemon.nom); // Normaliser le nom correct

    if (userGuess === correctName) { // Comparer les deux
        handleSuccess();
    } else {
        handleError();
    }
}

// Cas de victoire
function handleSuccess() { 
    isGuessed = true; // Marquer comme deviné
    
    // Révéler l'image
    imgElement.classList.remove('silhouette');
    imgElement.classList.add('revealed');

    // Message
    messageElement.textContent = `Bravo ! C'est bien ${currentPokemon.nom} !`;
    messageElement.className = 'success';
    messageElement.classList.remove('hidden');

    // Afficher la description du Pokémon
    const desc = document.createElement('p');
    desc.style.fontSize = "0.9rem";
    desc.style.color = "#000000ff";
    desc.textContent = currentPokemon.description;
    messageElement.appendChild(desc);

    // Activer bouton suivant
    nextBtn.classList.remove('hidden');
    inputElement.disabled = true;
}

// Cas d'erreur
function handleError() {
    // Message
    messageElement.textContent = `Ce n'est pas ${inputElement.value}... Essaie encore !`;
    messageElement.className = 'error';
    messageElement.classList.remove('hidden');
    
    // Animation de "secousse" sur l'input      
    inputElement.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(0)' }
    ], {
        duration: 300
    });
}

// Écouteurs d'événements
submitBtn.addEventListener('click', checkGuess);

// Valider avec la touche Entrée
inputElement.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkGuess();
});

nextBtn.addEventListener('click', pickRandomPokemon); // Pokémon suivant

// Lancement du jeu
initDataList();
pickRandomPokemon();