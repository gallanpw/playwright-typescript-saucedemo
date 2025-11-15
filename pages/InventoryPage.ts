import { type Page, type Locator, expect } from '@playwright/test';

export class InventoryPage {
    
    readonly page: Page;
    // Locators
    readonly productsTitle: Locator;
    readonly addToCartButton: Locator; 
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsTitle = page.locator('.title');
        // Kita pakai 1 item spesifik: Sauce Labs Backpack
        this.addToCartButton = page.locator('#add-to-cart-sauce-labs-backpack'); 
        this.shoppingCartLink = page.locator('.shopping_cart_link');
    }

    // Fungsi untuk memverifikasi berada di halaman produk
    async verifyOnInventoryPage() {
        await expect(this.productsTitle).toHaveText('Products');
    }

    // Fungsi untuk menambahkan item
    async addItemToCart() {
        await this.addToCartButton.click();
        // Opsional: Verifikasi tombol berubah menjadi 'Remove'
        await expect(this.page.locator('#remove-sauce-labs-backpack')).toBeVisible();
    }

    // Fungsi untuk navigasi ke keranjang
    async gotoCart() {
        await this.shoppingCartLink.click();
    }
}