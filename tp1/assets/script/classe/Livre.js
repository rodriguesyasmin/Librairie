import { livres } from "../livres.js";

export class Livre {
  constructor(el) {
    this._elLivre = el;
    this._conteneurLivre = document.querySelector("[data-detail]");
    this.init();
  }
  init() {
    // Ajouter un auditeur d'événements
    this._elLivre.addEventListener("click", () =>
      this.injecterpopoup(this._elLivre.dataset.titre)
    );
  }
  /**
   * Fonction qui sert à appeler la methode qui injecte le popup
   * @param {*} titreClicado
   */
  injecterpopoup(titre) {
    for (let i = 0; i < livres.length; i++) {
      if (livres[i].titre === titre) {
        this.popUp(livres[i]);
      }
    }
  }
  /**
   * Fonction qui sert à injecter un popup.
   */
  popUp(livre) {
    console.log(livre);
    console.log('dans popup');
    this._conteneurLivre.innerHTML = "";
    this._conteneurLivre.classList.remove("invisible");
    this._conteneurLivre.classList.add("visible");

    let livreHTML = `<div data-panneau class="visible">
    <div class="close">X</div>
            <img   src="${livre.image}" alt="">
            <h2>${livre.titre}</h2>
            <h3>${livre.auteur}</h3>
            <small>${livre.editeur} </small>
            <small>${livre.pages} pages</small>
            <p>${livre.description} </p>      

        </div>`;

    this._conteneurLivre.insertAdjacentHTML("beforeend", livreHTML);
  }
}
