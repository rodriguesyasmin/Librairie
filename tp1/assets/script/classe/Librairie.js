import { livres } from "../livres.js";
import { Livre } from "./Livre.js";

export class Librairie {
  constructor(el) {
    this._conteneur = el;
    this._elFiltre = document.querySelectorAll("[data-filtre]");
    this.init();
  }

  // Initialise la bibliothèque
  init() {
    this.injecterLivre();
    // Ajouter un auditeur d'événements pour chaque élément de filtre
    for (let i = 0; i < this._elFiltre.length; i++) {
      this._elFiltre[i].addEventListener(
        "click",
        this.filtrerLivres.bind(this)
      );
    }
  }

  injecterLivre() {
    for (let i = 0; i < 12; i++) {
      this.insererLivre(livres[i]);
    }
  }

  /**
   * Fonction qui sert à inserer les livres
   * @param {*} livre
   */
  insererLivre(livre) {
    let livreHTML = `<div data-panneau data-titre="${livre.titre}" class="panneau-livre">
        <img class="livres"  src="${livre.image}" alt="">
        <h2>${livre.titre}</h2>
        <div class="btn-ajouter">
          <small>${livre.prix} $</small>
          <button> Ajouter </button>
        </div>
      </div>`;

    this._conteneur.insertAdjacentHTML("beforeend", livreHTML);
    const novoElemento = this._conteneur.lastElementChild;
    new Livre(novoElemento);
  }

  /**
   * Fonction qui sert a filter les livres par categorie
   * @param {*} e
   */
  filtrerLivres(e) {
    const categorie = e.target.dataset.filtre;

    this._conteneur.innerHTML = "";

    for (let i = 0; i < livres.length; i++) {
      if (categorie === "Tous") {
        this.insererLivre(livres[i]);
      } else if (categorie === "Nouveautés" && livres[i].nouveaute == true) {
        this.insererLivre(livres[i]);
      } else if (
        categorie !== "Tous" &&
        categorie !== "Nouveautés" &&
        categorie === livres[i].categorie
      ) {
        this.insererLivre(livres[i]);
      }
    }

    // Supprime la classe active du filltre précedemment actif
    const filtroAtivo = document.querySelector("[data-filtre].active");
    if (filtroAtivo) {
      filtroAtivo.classList.remove("active");
    }
    // Ajouter la classe "active" au filtre sélectionné
    e.target.classList.add("active");
  }
}
