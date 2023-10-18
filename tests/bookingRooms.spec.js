import { test, expect } from "@playwright/test";
import { SingleRoom } from "../pageObjects/rooms/singleRoom";

test.describe("Booking room tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to single room booking when single room context chosen", async ({
    page,
  }) => {
    const singleRoom = new SingleRoom(page);

    await singleRoom.room.navigateOnSingleRoom();
  });
});
