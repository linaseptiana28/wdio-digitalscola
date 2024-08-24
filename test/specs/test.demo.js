describe("test saucedemo", () => {
    it("test 1 - login successfully", async () => {
        await browser.url("https://www.saucedemo.com/");
        // login
        const usernameTextbox = await browser.$("#user-name");
        const passwordTextbox = await browser.$("#password");
        const loginButton = await browser.$('//input[@type="submit"]');

        await usernameTextbox.addValue("standard_user");
        await passwordTextbox.addValue("secret_sauce");
        await loginButton.click();

        // dasbor
        await browser.pause(5000);
        await expect(browser).toHaveUrl(
            "https://www.saucedemo.com/inventory.html"
        );
        await expect(browser).toHaveTitle("Swag Labs");

        // add item to cart
        const addItemButton1 = await $(
            'button[data-test="add-to-cart-sauce-labs-backpack"]'
        );
        await addItemButton1.waitForClickable({ timeout: 1000 });
        await addItemButton1.click();

        // add item to cart
        const addItemButton2 = await $(
            'button[data-test="add-to-cart-sauce-labs-bike-light"]'
        );
        await addItemButton2.waitForClickable({ timeout: 1000 });
        await addItemButton2.click();

        // add item to cart
        const addItemButton3 = await $(
            'button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'
        );
        await addItemButton3.waitForClickable({ timeout: 1000 });
        await addItemButton3.click();

        const btnRemove1 = await $("#remove-sauce-labs-backpack");
        await expect(btnRemove1).toBeDisplayed();

        const btnRemove2 = await $("#remove-sauce-labs-bike-light");
        await expect(btnRemove2).toBeDisplayed();

        const btnRemove3 = await $("#remove-sauce-labs-bolt-t-shirt");
        await expect(btnRemove3).toBeDisplayed();

        // buka halaman keranjang
        const cartLink = await browser.$(".shopping_cart_link");
        await cartLink.waitForClickable({ timeout: 1000 });
        await cartLink.click();

        // Jeda selama 5 detik agar halaman keranjang tetap terbuka
        await browser.pause(5000);

        const cartItem1 = await $(
            '#item_4_title_link>div[data-test="inventory-item-name"]'
        );
        await expect(cartItem1).toBeDisplayed();
        await expect(cartItem1).toHaveText("Sauce Labs Backpack");

        const cartItem2 = await $(
            '#item_0_title_link>div[data-test="inventory-item-name"]'
        );
        await expect(cartItem2).toBeDisplayed();
        await expect(cartItem2).toHaveText("Sauce Labs Bike Light");

        const cartItem3 = await $(
            '#item_1_title_link>div[data-test="inventory-item-name"]'
        );
        await expect(cartItem3).toBeDisplayed();
        await expect(cartItem3).toHaveText("Sauce Labs Bolt T-Shirt");

        // Verifikasi bahwa halaman "Your Cart" tampil
        const cartTitle = await $(".title");
        await expect(cartTitle).toHaveText("Your Cart");

        // Hapus item pertama (Sauce Labs Backpack)
        const cartItems = await $$("div.cart_item");
        for (const item of cartItems) {
            const itemName = await item.$(".inventory_item_name").getText();
            if (itemName === "Sauce Labs Backpack") {
                const removeButton = await item.$("button.cart_button");
                await removeButton.click();
                await expect(item).not.toBeDisplayed();
            }
        }

        // Jeda selama 5 detik agar halaman keranjang tetap terbuka
        await browser.pause(5000);
    });
});
