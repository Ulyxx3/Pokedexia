
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


// Remplir la liste de pokemon avec le nom, le lien vers sa page et une image
let listePokemonUl = document.querySelector('#liste-pokemon')

// Pagination: afficher 20 par 20
const itemsPerPage = 20
let currentCount = Math.min(itemsPerPage, data.length) // Commence à 20 ou moins

// Indicateur simple : "X/Y Pokémon affichés"
let statusDiv = document.createElement('span')
statusDiv.id = 'status'
statusDiv.style.marginLeft = '10px'
document.querySelector('#boutons').appendChild(statusDiv)

// Fonction pour mettre à jour l'indicateur
function updateStatus() {
    statusDiv.textContent = `${currentCount}/${data.length} Pokémon affichés`
}

// Fonction pour afficher les premiers 'count' Pokémon
function renderPokemonList(count) {
    listePokemonUl.innerHTML = '' // Vide la liste
    for (let i = 0; i < count && i < data.length; i++) {
        let pokemon = data[i]
        let li = document.createElement('li')
        li.innerHTML = `<a class="pokemon-link" href="pokemon.html?id=${encodeURIComponent(pokemon['nom'])}">${pokemon['nom']} <img src="img/${pokemon['gif']}" height="25px" alt="${pokemon['nom']}"></a>`
        listePokemonUl.appendChild(li)
    }
    updateButtons() // Met à jour les boutons
    updateStatus() // Met à jour l'indicateur
}

// Fonction pour activer/désactiver les boutons
function updateButtons() {
    const plusBtn = document.querySelector('.plus')
    const moinsBtn = document.querySelector('.moins')
    moinsBtn.disabled = currentCount <= itemsPerPage
    plusBtn.disabled = currentCount >= data.length
}

// Écouteurs pour les boutons
document.querySelector('.plus').addEventListener('click', () => {
    currentCount = Math.min(currentCount + itemsPerPage, data.length)
    renderPokemonList(currentCount)
})

document.querySelector('.moins').addEventListener('click', () => {
    currentCount = Math.max(currentCount - itemsPerPage, itemsPerPage)
    renderPokemonList(currentCount)
})

// Affichage initial
renderPokemonList(currentCount)

// Barre de recherche
let searchInput = document.createElement("input")
searchInput.type = "text"
searchInput.id = "search-input"
searchInput.placeholder = "Rechercher un Pokémon..."
let searchWrapper = document.createElement("div")
searchWrapper.id = "search-wrapper"
searchWrapper.appendChild(searchInput)
listePokemonUl.parentElement.insertBefore(searchWrapper, listePokemonUl) // Insère avant la liste

searchInput.addEventListener("input", function() {
    let filter = searchInput.value.toLowerCase()
    let pokemonLinks = document.querySelectorAll('.pokemon-link')
    pokemonLinks.forEach(function(link) {
        let text = link.textContent.toLowerCase()
        if (text.includes(filter)) {
            link.parentElement.style.display = ""
        } else {
            link.parentElement.style.display = "none"
        }   
    })
})
// Styliser la barre de recherche avec CSS ?

// Styles de base pour le champ de recherche (dev avec le cul)
// mettre la barre de recherche dans la nav bar tout le temps sauf dans pokemon.html et mettre les types dans un menu déroulant ?
