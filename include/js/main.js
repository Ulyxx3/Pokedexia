
// Remplir le menu avec les types de pokémon
let ul = document.querySelector('#liste-types');

if (ul && typeof types !== 'undefined') {
    for (let type of types) {
        let li = document.createElement("li");
        
        // On crée le lien et l'image
        // On ne met pas de style ici, le CSS met la taille (.dropdown-content img)
        li.innerHTML = `
            <a href="type.html?id=${type}">
                <img src="img/types/${type}.png" alt="${type}">
            </a>
        `;
        
        ul.appendChild(li);
    }
}

// ==========================================
// FONCTIONNALITÉ DE TRI (SORTING)
// ==========================================

// 1. Préparation des données (Nettoyage pour le tri)
// On ajoute des propriétés numériques temporaires pour faciliter le tri sans casser l'affichage
data.forEach((pokemon, index) => {
    // Sauvegarde de l'ordre original (ID)
    pokemon._id = index + 1;
    
    // Conversion "6,9 kg" -> 6.9 (Float)
    pokemon._poidsVal = parseFloat(pokemon.poids.replace(',', '.').replace(/[^\d.-]/g, ''));
    
    // Conversion "0,7 m" -> 0.7 (Float)
    pokemon._tailleVal = parseFloat(pokemon.taille.replace(',', '.').replace(/[^\d.-]/g, ''));
});

function createSortMenu() {
    // Sélection de la barre de navigation
    const navbarList = document.querySelector('#line');
    
    // Création du conteneur du menu déroulant (même structure HTML que pour les Types)
    const li = document.createElement('li');
    li.className = 'dropdown-container';
    
    li.innerHTML = `
        <a href="#" class="menu-title">Trier par ▼</a>
        <ul id="liste-tri" class="dropdown-content">
            <li data-sort="id-asc">Numéro (Croissant)</li>
            <li data-sort="id-desc">Numéro (Décroissant)</li>
            <li data-sort="name-asc">Nom (A-Z)</li>
            <li data-sort="name-desc">Nom (Z-A)</li>
            <li data-sort="weight-asc">Poids (Leger - Lourd)</li>
            <li data-sort="weight-desc">Poids (Lourd - Leger)</li>
            <li data-sort="height-asc">Taille (Petit - Grand)</li>
            <li data-sort="height-desc">Taille (Grand - Petit)</li>
        </ul>
    `;
    
    // Ajout à la navbar (avant ou après les types, ici on l'ajoute à la fin)
    navbarList.appendChild(li);

    // Ajout des écouteurs d'événements sur les options de tri
    const sortItems = li.querySelectorAll('li[data-sort]');
    sortItems.forEach(item => {
        // style du  curseur pour indiquer que c'est cliquable
        item.style.cursor = 'pointer'; 
        
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche le remontage en haut de page
            const sortType = e.target.getAttribute('data-sort');
            applySort(sortType);
        });
    });
}
// Trieur avec un switch (truc que j'ai trouvé sur la documentation javascript mozilla https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/switch)
function applySort(sortType) {
    switch (sortType) {
        case 'id-asc':
            data.sort((a, b) => a._id - b._id);
            break;
        case 'id-desc':
            data.sort((a, b) => b._id - a._id);
            break;
        case 'name-asc':
            data.sort((a, b) => a.nom.localeCompare(b.nom));
            break;
        case 'name-desc':
            data.sort((a, b) => b.nom.localeCompare(a.nom));
            break;
        case 'weight-asc':
            data.sort((a, b) => a._poidsVal - b._poidsVal);
            break;
        case 'weight-desc':
            data.sort((a, b) => b._poidsVal - a._poidsVal);
            break;
        case 'height-asc':
            data.sort((a, b) => a._tailleVal - b._tailleVal);
            break;
        case 'height-desc':
            data.sort((a, b) => b._tailleVal - a._tailleVal);
            break;
    }

    // Réinitialisation de l'affichage
    currentCount = itemsPerPage; 
    
    // refais la liste en suivant l'ordre du tri selon le type tri selectionné et selon la longueur d'affichage souhaitée
    createListItems();
    renderPokemonList(currentCount);
    
    // Si une recherche est active, on doit aussi réappliquer le filtre
    const searchVal = document.getElementById("search-input").value;
    if(searchVal) {
       // Déclenche l'événement input manuellement pour refiltrer
       document.getElementById("search-input").dispatchEvent(new Event('input'));
    }
}

// Lancer la création du menu
createSortMenu();

// ==========================================
// LISTE DE POKÉMON AVEC PAGINATION ET RECHERCHE
// ==========================================
// Remplir la liste de pokemon avec le nom, le lien vers sa page et une image

let listePokemonUl = document.querySelector('#liste-pokemon')

// Pagination: afficher 20 par 20
const itemsPerPage = 20
let currentCount = Math.min(itemsPerPage, data.length) // Commence à 20 ou moins

// Indicateur : "x/152 Pokémon affichés"
let statusDiv = document.createElement('span')
statusDiv.id = 'status'
statusDiv.style.marginLeft = '10px'
document.querySelector('#boutons').appendChild(statusDiv)

// Fonction pour mettre à jour l'indicateur
function updateStatus() {
    statusDiv.textContent = `${currentCount}/${data.length} Pokémon affichés`
}

// Fonction pour afficher les premiers 'count' Pokémon
// Crée tous les éléments de la liste (une seule fois ou après tri)
function createListItems() {
    // Supprime les anciens éléments
    while (listePokemonUl.firstChild) listePokemonUl.removeChild(listePokemonUl.firstChild);

    // Crée un <li> par Pokémon mais les marque cachés par défaut
    for (let i = 0; i < data.length; i++) {
        let pokemon = data[i];
        let li = document.createElement('li');
        li.classList.add('pokemon-hidden');
        // Ajoute le lien avec le nom et l'image
        li.innerHTML = `<a class="pokemon-link" href="pokemon.html?id=${encodeURIComponent(pokemon['nom'])}">${pokemon['nom']} <img src="img/${pokemon['gif']}" height="25px" alt="${pokemon['nom']}"></a>`;
        listePokemonUl.appendChild(li);
    }
}

// Affiche (via classes) les premiers 'count' éléments
function renderPokemonList(count) { 
    // Si les éléments n'existent pas encore ou ont changé, crée-les
    if (listePokemonUl.children.length !== data.length) {
        createListItems();
    }
// Met à jour la visibilité des éléments
    const items = listePokemonUl.children;
    for (let i = 0; i < items.length; i++) {
        if (i < count) {
            items[i].classList.remove('pokemon-hidden');
            items[i].classList.add('pokemon-visible');
        } else {
            items[i].classList.remove('pokemon-visible');
            items[i].classList.add('pokemon-hidden');
        }
    }

    updateButtons(); // Met à jour les boutons
    updateStatus(); // Met à jour l'indicateur
}

// Fonction pour activer/désactiver les boutons
function updateButtons() {
    const plusBtn = document.querySelector('.plus')
    const moinsBtn = document.querySelector('.moins')
    // Si les boutons n'existent pas sur cette page, rien à faire
    if (!plusBtn || !moinsBtn) return
    moinsBtn.disabled = currentCount <= itemsPerPage
    plusBtn.disabled = currentCount >= data.length
}

// Écouteurs pour les boutons
const plusBtn = document.querySelector('.plus')
const moinsBtn = document.querySelector('.moins')

if (plusBtn) { 
    plusBtn.addEventListener('click', () => {
        currentCount = Math.min(currentCount + itemsPerPage, data.length) // Ne dépasse pas la longueur totale
        renderPokemonList(currentCount)
    })
}

if (moinsBtn) {
    moinsBtn.addEventListener('click', () => {
        currentCount = Math.max(currentCount - itemsPerPage, itemsPerPage) // Ne descend pas en dessous de itemsPerPage (20)
        renderPokemonList(currentCount)
    })
}

// Affichage initial
renderPokemonList(currentCount)

// Barre de recherche
let searchInput = document.createElement("input") // Champ de saisie
searchInput.type = "text"
searchInput.id = "search-input" 
searchInput.placeholder = "Rechercher un Pokémon..." // Texte indicatif
let searchWrapper = document.createElement("div") // Conteneur pour la barre de recherche
searchWrapper.id = "search-wrapper" // Conteneur pour le style
searchWrapper.appendChild(searchInput) // Ajoute le champ au conteneur
listePokemonUl.parentElement.insertBefore(searchWrapper, listePokemonUl) // Insère avant la liste

// Écouteur pour la recherche
searchInput.addEventListener("input", function() { // À chaque modification du texte
    let filter = searchInput.value.toLowerCase(); // Texte recherché (se fais passer en minuscules)
    let pokemonLinks = document.querySelectorAll('.pokemon-link'); // Tous les liens de pokémon
    pokemonLinks.forEach(function(link) { // Pour chaque lien
        let text = link.textContent.toLowerCase(); // Texte du lien en minuscules
        const li = link.parentElement; // Affiche ou cache selon la correspondance
        if (text.includes(filter)) { // Si le texte du lien contient le texte recherché
            li.classList.remove('pokemon-hidden');
            li.classList.add('pokemon-visible');
        } else {
            li.classList.remove('pokemon-visible');
            li.classList.add('pokemon-hidden');
        }
    });
})

// PS : Le système de hidden/visible est réutilisé dans notre système de déroulement !
