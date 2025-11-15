import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutPage {

    readonly page: Page;
    // Locators
    readonly checkoutButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;
    
    // Konfirmasi
    readonly COMPLETE_TEXT: string = "Thank you for your order!";

    constructor(page: Page) {
        this.page = page;
        // Cart Page Locators
        this.checkoutButton = page.locator('#checkout');
        // Checkout Info Locators
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        // Overview Locators
        this.finishButton = page.locator('#finish');
        // Complete Locators
        this.completeHeader = page.locator('.complete-header');
    }

    // Fungsi untuk memulai proses checkout dari halaman keranjang
    async startCheckout() {
        await this.checkoutButton.click();
    }

    // Fungsi untuk mengisi informasi data diri
    async fillUserInfo(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    // Fungsi untuk menyelesaikan pemesanan
    async finishOrder() {
        // Asumsi sudah di halaman "Checkout: Overview"
        await this.finishButton.click();
    }

    // Verifikasi pemesanan berhasil
    async verifyOrderSuccess() {
        await expect(this.completeHeader).toHaveText(this.COMPLETE_TEXT);
    }
}