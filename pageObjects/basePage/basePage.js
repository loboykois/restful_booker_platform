import { Footer } from "../basePage/footer/footer";

export class BasePage {
  #page;

  constructor(page) {
    this.#page = page;
    this.footer = new Footer(page);
  }
}
