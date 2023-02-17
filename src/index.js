const baseUrl = "https://rickandmortyapi.com/";
const mainApp = document.getElementById("app");
const random = Math.floor(Math.random() * 42);

const charactersCount = document.querySelector(".text")

window
.fetch(`${baseUrl}/api/character?page=${random}`)
.then((respuesta) => respuesta.json())
.then((responseJson) => {
    charactersCount.textContent = `${charactersCount.textContent}: ${responseJson.info.count}`
    const cards = [];

    responseJson.results.forEach((item) => {
      const image = document.createElement("img");
      image.src = item.image;

      const name = document.createElement("a");
      name.textContent = item.name;
      name.className ="card__name"
      name.href = item.url
      name.setAttribute("target","__blank")

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
