"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const pokemonName = document.querySelector(".pokemon__name");
const pokemonId = document.querySelector(".pokemon__number");
const pokemonSprite = document.querySelector(".pokemon__image");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const prevButton = document.querySelector(".btn-prev");
const nextButton = document.querySelector(".btn-next");
let searchPokemons = 1;
const fetchPokemon = (pokemon) => __awaiter(void 0, void 0, void 0, function* () {
    const APIResponse = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = yield APIResponse.json();
        return data;
    }
});
const renderPokemon = (pokemon) => __awaiter(void 0, void 0, void 0, function* () {
    pokemonName.innerHTML = "Loading..";
    pokemonId.innerHTML = "";
    pokemonSprite.style.display = "none";
    const data = yield fetchPokemon(pokemon);
    if (data && data.id < 650) {
        input.value = "";
        pokemonSprite.style.display = "block";
        searchPokemons = data.id;
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonSprite.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    }
    else {
        pokemonName.innerHTML = "Not found :(";
        pokemonSprite.style.display = "none";
        searchPokemons = 0;
        pokemonId.innerHTML = "";
    }
});
form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});
prevButton.addEventListener("click", () => {
    if (searchPokemons > 1) {
        renderPokemon(searchPokemons - 1);
    }
    else if (searchPokemons == 0) {
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
