const baseUrl = "https://rickandmortyapi.com/";
const mainApp = document.getElementById("app");
const random = Math.floor(Math.random() * 42);
const charactersCount = document.querySelector(".text");

const callbackShowCards = (entries, observer) => {
  entries
    .filter((entry) => entry.isIntersecting)
    .forEach((entry) => { 
        const card = entry.target;
        card.classList.add("show");
        observer.unobserve(entry.target);

    });
};
const callbackLoadImage = (entries, observer) => {
  entries
    .filter((entry) => entry.isIntersecting)
    .forEach((entry) => {
      const img = entry.target;
      const src = img.dataset.src;
      img.setAttribute("src", src);
      observer.unobserve(entry.target);
    });
};
const observerLoadImage = new IntersectionObserver(callbackLoadImage);

const observerShowCards = new IntersectionObserver(callbackShowCards, {
  threshold: 0.5,
});

async function fetchData(urlApi) {
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
}

const requests = async (urlApi, random, charactersCount) => {
 
  try {
    const firstRequest = await fetchData(
      `${urlApi}/api/character?page=${random}`
    );
    showCount(firstRequest, charactersCount);
    crearCards(firstRequest);

    if (firstRequest.info.next == null) {
      const secondRequest = await fetchData(firstRequest.info.prev);
      crearCards(secondRequest);
    } else {
      const secondRequest = await fetchData(firstRequest.info.next);
      crearCards(secondRequest);
    }
  } catch (error) {
    console.log(error);
    const errorContainer = document.createElement("div");
    errorContainer.className = "errorContainer";
    const img = document.createElement("img");
    img.className = "errorContainer__img";
    img.src = "./src/assets/errorImage.png";
    img.alt = "Rick And Morty Image";
    const errorText = document.createElement("p");
    errorText.className = "errorContainer__p";
    errorText.textContent = "Ups! algo ha salido mal :c";
    errorContainer.append(img, errorText);
    mainApp.append(errorContainer);
  }
};

requests(baseUrl, random, charactersCount);

const showCount = (responseJson, charactersCount) => {
  charactersCount.textContent = `${charactersCount.textContent}: ${responseJson.info.count}`;
};

const crearCards = (responseJson) => {
  const cards = [];

  responseJson.results.forEach((item) => {
    const image = document.createElement("img");
    image.alt = `character${item.id}-image`;
    image.dataset.src = item.image;
    observerLoadImage.observe(image);

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
    observerShowCards.observe(card);
    card.append(image, description);
    cards.push(card);
  });
  mainApp.append(...cards);
};

  
    
  
