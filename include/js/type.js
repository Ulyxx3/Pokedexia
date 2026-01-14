// Remplir le menu avec les types de pokémon
let ul = document.querySelector('#liste-types');

if (ul && typeof types !== 'undefined') {
    for (let type of types) {
        let li = document.createElement("li");
        
        // On crée le lien et l'image
        // Note : On ne met pas de style ici, le CSS s'occupe de la taille (.dropdown-content img)
        li.innerHTML = `
            <a href="type.html?id=${type}">
                <img src="img/types/${type}.png" alt="${type}">
            </a>
        `;
        
        ul.appendChild(li);
    }
}

// Renvoie un tableau avec les pokémon du type id
function get_pokemons(data, id) {
	let pokemons = []
	for (let pokemon of data) {
		for (let type of pokemon["type"]) {
			if (type === id) {
				pokemons.push(pokemon)
	  		}
		}
	}
	return pokemons
}

// Trouver le type de pokémon à montrer en fonction du paramètre dans l'URL
let queryString = window.location.search
let urlParams = new URLSearchParams(queryString)
let id = urlParams.get('id')

// Remplir la page
document.querySelector("title").textContent += id
document.querySelector(".type-image").innerHTML = `<img src="img/types/${id}.png" height="50px" alt="${id}">`
document.querySelector("h2").textContent = desc_types[types.indexOf(id)]

let pokemons = get_pokemons(data, id)

let listePokemonUl = document.querySelector('#liste-pokemon')

// Pagination: afficher 20 par 20
const itemsPerPage = 20
let currentCount = Math.min(itemsPerPage, pokemons.length) // Commence à 20 ou moins

// Indicateur simple : "X/(nb de pokémon du type concerné) Pokémon affichés" (ajouté seulement si #boutons existe)
let statusDiv = document.createElement('span')
statusDiv.id = 'status'
statusDiv.style.marginLeft = '10px'
const boutonsContainer = document.querySelector('#boutons')
if (boutonsContainer) {
    boutonsContainer.appendChild(statusDiv)
}

// Fonction pour mettre à jour l'indicateur
function updateStatus() {
    if (!statusDiv.parentElement) return
    statusDiv.textContent = `${currentCount}/${pokemons.length} Pokémon affichés`
}

// Fonction pour afficher les premiers 'count' Pokémon
// Crée tous les éléments de la liste (une seule fois ou après tri)
function createListItems() {
    // Supprime les anciens éléments
    while (listePokemonUl.firstChild) listePokemonUl.removeChild(listePokemonUl.firstChild);

    // Crée un <li> par Pokémon du type mais les marque cachés par défaut
    for (let i = 0; i < pokemons.length; i++) {
        let pokemon = pokemons[i];
        let li = document.createElement('li');
        li.classList.add('pokemon-hidden');
        li.innerHTML = `<a class="pokemon-link" href="pokemon.html?id=${encodeURIComponent(pokemon['nom'])}">${pokemon['nom']} <img src="img/${pokemon['gif']}" height="25px" alt="${pokemon['nom']}"></a>`;
        listePokemonUl.appendChild(li);
    }
}

// Affiche (via classes) les premiers 'count' éléments
function renderPokemonList(count) { 
    // Si les éléments n'existent pas encore ou ont changé, crée-les
    if (listePokemonUl.children.length !== pokemons.length) {
        createListItems();
    }

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

    // Si le nombre total de pokemons est inférieur ou égal à une page, masquer les boutons
    if (pokemons.length <= itemsPerPage) {
        plusBtn.style.display = 'none'
        moinsBtn.style.display = 'none'
        return
    } else {
        plusBtn.style.display = ''
        moinsBtn.style.display = ''
    }

    moinsBtn.disabled = currentCount <= itemsPerPage
    plusBtn.disabled = currentCount >= pokemons.length
}

// Écouteurs pour les boutons
const plusBtn = document.querySelector('.plus')
const moinsBtn = document.querySelector('.moins')

if (plusBtn) {
    plusBtn.addEventListener('click', () => {
        currentCount = Math.min(currentCount + itemsPerPage, pokemons.length)
        renderPokemonList(currentCount)
    })
}

if (moinsBtn) {
    moinsBtn.addEventListener('click', () => {
        currentCount = Math.max(currentCount - itemsPerPage, itemsPerPage)
        renderPokemonList(currentCount)
    })
}

// Affichage initial
renderPokemonList(currentCount)