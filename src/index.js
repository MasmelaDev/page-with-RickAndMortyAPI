const baseUrl = "https://rickandmortyapi.com/";
const mainApp = document.getElementById("app");

window
  .fetch(`${baseUrl}/api/character`)
  .then((respuesta) => respuesta.json())
  .then((responseJson) => {
    const cards = [];

    responseJson.results.forEach((item) => {
      const image = document.createElement("img");
      image.src = item.image;

      const name = document.createElement("p");
      name.textContent = item.name;
      name.className ="card__name"

      const status = document.createElement("p")
      status.textContent = item.status
      status.className =`card__status ${item.status}` 

      const specie = document.createElement("p")
      specie.textContent = item.species
      specie.className ="card__specie"


      const description = document.createElement("div");
      description.append(name,status,specie)
      description.className ="card__description"
    
      const card = document.createElement("section");
      card.className ="card"
      card.append(image,description)
      cards.push(card)

    });
    mainApp.append(...cards)
  });
