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

// Renvoie le pokémon en fontion de l'URL
function get_pokemon(data) {
	let queryString = window.location.search
	let urlParams = new URLSearchParams(queryString)
	let id = urlParams.get('id')
	for (let pokemon of data) {
		if (pokemon['nom'] === id) {
			return pokemon
		}
	}
}

// Renvoie une chaîne de caractères avec chaque type de pokémon
// et un lien vers sa page
function format_types(types) {
	let str = "Types : "
	for (let type of types) {
		str += ` (<a href="type.html?id=${type}"><img src="img/types/${type}.png" alt="${type}"></img></a>) `
	}
	return str
}

// Renvoie une chaîne de caractères avec chaque pokémon
// et un lien vers sa page
function format_evolutions(evolutions) {
	str = "Évolutions : "
	for (let evolution of evolutions) {
		str += ` (<a href="pokemon.html?id=${evolution}"><img src="img/${evolution}.gif" alt="${evolution}"></img></a>) `
	}
	return str
}

// Remplir les informations sur le pokemon
let pokemon = get_pokemon(data)
document.querySelector("title").textContent += pokemon['nom']
document.querySelector("h1").textContent = pokemon['nom']
document.querySelector("p#description").textContent = pokemon["description"]
document.querySelector("div#image img").setAttribute("src", "img/" + pokemon["png"])
document.querySelector("#taille").textContent = "Taille : " + pokemon["taille"]
document.querySelector("#poids").textContent = "Poids : " + pokemon["poids"]
document.querySelector("#noms").textContent = `Anglais : ${pokemon['nom_en']} ; Japonais : ${pokemon['nom_ja'][1]} (${pokemon['nom_ja'][0]})`
document.querySelector("#types").innerHTML = format_types(pokemon["type"])
document.querySelector("#evolutions").innerHTML = format_evolutions(pokemon["evolutions"])


// Système de CSS pour chaque page de pokémon
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
if (id) {
  document.documentElement.classList.add('pokemon-page');
  document.documentElement.dataset.pokemon = id.toLowerCase();
}