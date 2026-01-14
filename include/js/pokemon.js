// Remplir le menu avec les types de pokémon
let ul = document.querySelector('#liste-types');

if (ul && typeof types !== 'undefined') { // Vérifie que la variable types est définie
    for (let type of types) { 
        let li = document.createElement("li"); // Crée un élément de liste pour chaque type
        
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
// Renvoie le pokémon en fontion de son nom (globalement la meme utilité que get_pokemon mais pour les évolutions)
// juste j'arrivais pas a utiliser get_pokemon pour les évolutions donc j'ai fait une autre fonction
function get_pokemonEvo(name, all_data) {
    for (let p of all_data) {
        if (p['nom'] === name) {
            return p;
        }
    }
    return null; // si le pokémon n'est pas trouvé
}

// Renvoie une chaîne de caractères avec chaque type de pokémon
// et un lien vers sa page
function format_types(types) {
    let str = ""
	for (let type of types) {
		str += ` <a href="type.html?id=${type}"><img src="img/types/${type}.png" alt="${type}"></img></a> `
	}
	return str
}

// Renvoie une chaîne de caractères avec chaque pokémon 
// et un lien vers sa page
function format_evolutions(evolutions) {
	str = "Évolutions : "
	for (let NomEvolution of evolutions) {
		let EvolutionPokemon = get_pokemonEvo(NomEvolution, data); // Récupère les données du pokémon d'évolution
		if(EvolutionPokemon) { 
			let gif = EvolutionPokemon['gif']; // Récupère le gif du pokémon d'évolution
			str += ` <a href="pokemon.html?id=${NomEvolution}"><img height="50px" src="img/${gif}" alt="${NomEvolution}"></img></a> `;
	}
	
	}
	return str;
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
document.querySelector(".pokemon-number").textContent = `n° ${data.indexOf(pokemon) + 1}` // Affiche le numéro du pokémon

// Système de CSS pour chaque page de pokémon
// Ajoute des classes au <html> pour que le CSS puisse cibler cette page Pokémon
if (pokemon) {
  // Normalise un type : convertit en minuscules et remplace les accents
  function normalize(text) {
    // convertit en minuscules, puis remplace é par e, puis remplace à et â par a
    return text.toLowerCase().replace(/é/g, 'e').replace(/[àâ]/g, 'a');
  }
  
  // Ajoute la classe 'pokemon-page' pour marquer une page de détail Pokémon
  document.documentElement.classList.add('pokemon-page');
  
  // Ajoute une classe par type (ex: 'type-feu', 'type-eau')
  pokemon.type.forEach(type => {
    document.documentElement.classList.add('type-' + normalize(type));
  });
}