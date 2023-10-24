import { test, expect } from "@playwright/test";
import { BasePage } from "../pageObjects/basePage/basePage";

test.describe("Booking rooms Api test", () => {
  // requests & response interception

  test.describe("should catch all", () => {
    test("requests when page is loaded", async ({ page }) => {
      page.on("request", (request) =>
        console.log(
          ">>: " + request.method(),
          request.resourceType(),
          request.url()
        )
      );

      await page.goto("/");
    });

    test("responses when page is loaded", async ({ page }) => {
      page.on("response", (response) =>
        console.log("<<: ", response.status(), response.url())
      );

      await page.goto("/");
    });
  });

  // modify response

  test.describe("should display", () => {
    test("empty Rooms field when an empty response is returned", async ({
      page,
    }) => {
      const basePage = new BasePage(page);
      const roomInfoBlock = await basePage.getRoomInfoBlock();

      await basePage.sendPageWithoutRooms();

      await expect(roomInfoBlock).toBeHidden();
    });
  });
});
