const pokemonName = document.querySelector(".pokemon__name") as HTMLSpanElement;
const pokemonId = document.querySelector(".pokemon__number") as HTMLSpanElement;
const pokemonSprite = document.querySelector(".pokemon__image") as HTMLImageElement;

const form = document.querySelector(".form") as HTMLFormElement;
const input = document.querySelector(".input__search") as HTMLInputElement;
const prevButton = document.querySelector(".btn-prev") as HTMLButtonElement;
const nextButton = document.querySelector(".btn-next") as HTMLButtonElement;

let searchPokemons: number = 1;

const fetchPokemon = async (pokemon: string | number) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon: string | number) => {
  pokemonName.innerHTML = "Loading..";
  pokemonId.innerHTML = "";
  pokemonSprite.style.display = "none";
  const data = await fetchPokemon(pokemon);

  if (data && data.id < 650) {
    input.value = "";
    pokemonSprite.style.display = "block";
    searchPokemons = data.id;

    pokemonName.innerHTML = data.name;
    pokemonId.innerHTML = data.id;
    pokemonSprite.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];

  } else {
    pokemonName.innerHTML = "Not found :(";
    pokemonSprite.style.display = "none";
    searchPokemons = 0;
    pokemonId.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

prevButton.addEventListener("click", () => {
  if (searchPokemons > 1) {
    renderPokemon(searchPokemons - 1);
  } else if (searchPokemons == 0) {
    searchPokemons = 1;
    renderPokemon(searchPokemons);
  }
});

nextButton.addEventListener("click", () => {
  if (searchPokemons < 649) {
    renderPokemon(searchPokemons + 1);
  }
});

renderPokemon(searchPokemons);
