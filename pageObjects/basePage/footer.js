export class Footer {
  constructor(page) {
    this.footer = page.locator(".footer");
  }

  async openAdminPanel() {
    await this.footer.locator("p > a:has-text('Admin panel')").click();
  }
}
