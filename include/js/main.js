// Remplir le menu avec les types de pokémon
let ul = document.querySelector('#liste-types')
for (let type of types) {
    let li = document.createElement("li")
    li.innerHTML = `<a href="type.html?id=${type}">${type}</a>`
    ul.appendChild(li)
}

// Remplir la liste de pokemon avec le nom, le lien vers sa page et une image
ul = document.querySelector('#liste-pokemon')
for (let pokemon of data) {
    let li = document.createElement("li")
    li.innerHTML = `<a class="pokemon-link" href="pokemon.html?id=${encodeURIComponent(pokemon['nom'])}">${pokemon['nom']} <img src="img/${pokemon['gif']}" height="25px" alt="${pokemon['nom']}"></a>`
    ul.appendChild(li)
}

// Ajouter un champ de recherche pour filtrer les pokémon par nom 06/01
let searchInput = document.createElement("input")
searchInput.type = "text"
searchInput.id = "search-input"
searchInput.placeholder = "Rechercher un Pokémon..."
let searchWrapper = document.createElement("div") //le div est nécessaire pour que je le centre comme un pirate
searchWrapper.id = "search-wrapper"
searchWrapper.appendChild(searchInput)
document.body.insertBefore(searchWrapper, ul)
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
