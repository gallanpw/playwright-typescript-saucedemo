import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// --- MEMUAT VARIABEL LINGKUNGAN DARI .env ---
require('dotenv').config();

// Data Kredensial Positif
const VALID_USERNAME = process.env.SAUCEDEMO_USERNAME_VALID || 'default_user';
const VALID_PASSWORD = process.env.SAUCEDEMO_PASSWORD_VALID || 'default_pass';

// Data Checkout
const FIRST_NAME = process.env.SAUCEDEMO_FIRST_NAME || 'default_first_name';
const LAST_NAME = process.env.SAUCEDEMO_LAST_NAME || 'default_last_name';
const POSTAL_CODE = process.env.SAUCEDEMO_POSTAL_CODE || 'default_postal_code';

test.describe('E2E Checkout Scenarios', () => {

    test('should successfully checkout an item from login to order completion', async ({ page }) => {
        // 1. Inisialisasi Page Objects
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const checkoutPage = new CheckoutPage(page);
        
        // A. LOGIN
        await test.step('Login with valid credentials', async () => {
            await loginPage.gotoLoginPage();
            await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
            await loginPage.verifyLoginSuccess();
        });
        
        // B. TAMBAH ITEM KE KERANJANG
        await test.step('Add item and navigate to cart', async () => {
            await inventoryPage.addItemToCart();
            await inventoryPage.gotoCart();
        });
        
        // C. CHECKOUT: ISI DATA DIRI
        await test.step('Start checkout and fill user information', async () => {
            await checkoutPage.startCheckout();
            await checkoutPage.fillUserInfo(FIRST_NAME, LAST_NAME, POSTAL_CODE);
        });
        
        // D. CHECKOUT: FINISH
        await test.step('Finish the order process', async () => {
            await checkoutPage.finishOrder();
        });
        
        // E. VERIFIKASI KEBERHASILAN
        await test.step('Verify successful order completion', async () => {
            await checkoutPage.verifyOrderSuccess();
        });
    });
});