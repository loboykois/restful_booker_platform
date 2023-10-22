export class Footer {
  #page;

  constructor(page) {
    this.#page = page;
    this.footer = page.locator(".footer");
  }

  async openAdminPanel() {
    await this.footer.locator("p > a:has-text('Admin panel')");
  }
}
