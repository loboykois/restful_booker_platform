import { Footer } from "./footer";
import { Header } from "./header";
export class ReservationPage {
  constructor(page) {
    this.header = new Header(page);
    this.footer = new Footer(page);
  }
}
