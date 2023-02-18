const baseUrl = "https://rickandmortyapi.com/";
const mainApp = document.getElementById("app");
const random = Math.floor(Math.random() * 42);
const random2 = Math.floor(Math.random() * 42);
const charactersCount = document.querySelector(".text");

const showCount = (responseJson, charactersCount) => {
  charactersCount.textContent = `${charactersCount.textContent}: ${responseJson.info.count}`;
};

const callback = (entries, observer) => {
  entries
    .filter((entry) => entry.isIntersecting)
    .forEach((entry) => {
      if (entry.target.nodeName == "IMG") {
        const img = entry.target;
        const src = img.getAttribute("data-lazy");
        img.setAttribute("src", src);
        observer.unobserve(entry.target);
      }
      if (entry.target.nodeName == "SECTION") {
        const card = entry.target;
        card.classList.add("show");
      }
    });
};

const observer = new IntersectionObserver(callback);


const crearCards = (responseJson) => {
  const cards = [];

  responseJson.results.forEach((item) => {
    const image = document.createElement("img");
    image.alt = `character${item.id}-image`
    const loadingLazy = document.createAttribute("data-lazy")
    loadingLazy.value= item.image
    image.setAttributeNode(loadingLazy)
    observer.observe(image)

    const name = document.createElement("a");
    name.textContent = item.name;
    name.className = "card__name";
    name.href = item.url;
    name.setAttribute("target", "__blank");

    const status = document.createElement("p");
    status.textContent = item.status;
    status.className = `card__status ${item.status}`;

    const specie = document.createElement("p");
    specie.textContent = item.species;
    specie.className = "card__specie";

    const description = document.createElement("div");
    description.append(name, status, specie);
    description.className = "card__description";

    const card = document.createElement("section");
    card.className = "card";
    observer.observe(card)
    card.append(image, description);
    cards.push(card);
  });
  mainApp.append(...cards);
};

window
  .fetch(`${baseUrl}/api/character?page=${random}`)
  .then((respuesta) => respuesta.json())
  .then((responseJson) => {
    showCount(responseJson, charactersCount), crearCards(responseJson);
  });

window
  .fetch(`${baseUrl}/api/character?page=${random2}`)
  .then((respuesta) => respuesta.json())
  .then((responseJson) => {
    crearCards(responseJson);
  });
