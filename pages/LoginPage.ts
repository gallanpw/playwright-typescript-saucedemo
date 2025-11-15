import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
    // Deklarasi properti untuk Locator
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly inventoryUrl: string;
    readonly errorMessage: Locator;

    // Constructor untuk inisialisasi Page dan Locators
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.inventoryUrl = 'https://www.saucedemo.com/inventory.html';
        this.errorMessage = page.locator('.error-message-container.error');
    }

    // Fungsi untuk navigasi ke halaman login
    async gotoLoginPage() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    // Fungsi untuk melakukan proses login
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Assertion untuk memverifikasi login berhasil
    async verifyLoginSuccess() {
        // Memverifikasi navigasi ke halaman inventory
        await expect(this.page).toHaveURL(this.inventoryUrl);
        // Memverifikasi elemen khas halaman setelah login ada (misalnya, judul "Products")
        await expect(this.page.locator('.title')).toHaveText('Products');
    }

    // Assertion untuk memverifikasi login gagal
    async verifyLoginFailure(expectedMessage: string) { // NEW
        // Memverifikasi URL tetap di halaman login
        await expect(this.page).toHaveURL('https://www.saucedemo.com/');
        // Memverifikasi pesan error muncul dan teksnya sesuai
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }
}