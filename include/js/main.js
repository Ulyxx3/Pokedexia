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
    li.innerHTML = `${pokemon['nom']} <a href="pokemon.html?id=${pokemon['nom']}">lien</a> <img src="img/${pokemon['gif']}" height="20px">`
    ul.appendChild(li)
}