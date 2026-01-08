// Remplir le menu avec les types de pokémon
let ul = document.querySelector('#liste-types')
for (let type of types) {
	let li = document.createElement("li")
	li.innerHTML = `<a href="type.html?id=${type}"><img src="img/types/${type}.png" alt="${type}"></img></a>` // Ajout de l'image du type
	ul.appendChild(li)
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
// Ce code est identique à celui de main.js
document.querySelector("title").textContent += id
document.querySelector("h1").textContent = id
let pokemons = get_pokemons(data, id)
ul = document.querySelector('#liste-pokemon')
for (let pokemon of pokemons) {
	let li = document.createElement("li")
	li.innerHTML = `${pokemon['nom']} <a href="pokemon.html?id=${pokemon['nom']}">lien</a> <img src="img/${pokemon['gif']}" height="20px">`
	ul.appendChild(li)
}