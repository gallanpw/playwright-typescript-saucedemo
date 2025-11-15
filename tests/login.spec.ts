import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // Sesuaikan path

// --- MEMUAT VARIABEL LINGKUNGAN DARI .env ---
require('dotenv').config();

// Data login positif yang benar untuk SauceDemo
const VALID_USERNAME = process.env.SAUCEDEMO_USERNAME_VALID || 'default_user';
const VALID_PASSWORD = process.env.SAUCEDEMO_PASSWORD_VALID || 'default_pass';
const INVALID_USERNAME = process.env.SAUCEDEMO_USERNAME_INVALID || 'wrong_user';
const INVALID_PASSWORD = process.env.SAUCEDEMO_PASSWORD_INVALID || 'wrong_password';
const EXPECTED_ERROR_MESSAGE = 'Epic sadface: Username and password do not match any user in this service';

test.describe('Login Scenarios', () => {

    test('should successfully log in with valid credentials (Positive Scenario)', async ({ page }) => {
        // 1. Inisialisasi Page Object
        const loginPage = new LoginPage(page);
        
        // 2. Navigasi ke halaman login
        await loginPage.gotoLoginPage();
        
        // 3. Lakukan login dengan kredensial yang valid
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
        
        // 4. Verifikasi bahwa login berhasil (berhasil masuk ke halaman inventory)
        await loginPage.verifyLoginSuccess();
    });

    // --- Skenario Negatif ---
  
    // 1. Input Wrong Password
    test('should fail login when using correct username but wrong password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        
        // Gunakan Username VALID dan Password INVALID
        await loginPage.login(VALID_USERNAME, INVALID_PASSWORD);
        
        // Verifikasi kegagalan
        await loginPage.verifyLoginFailure(EXPECTED_ERROR_MESSAGE);
    });
    
    // 2. Input Wrong Username
    test('should fail login when using wrong username but correct password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        
        // Gunakan Username INVALID dan Password VALID
        await loginPage.login(INVALID_USERNAME, VALID_PASSWORD);
        
        // Verifikasi kegagalan
        await loginPage.verifyLoginFailure(EXPECTED_ERROR_MESSAGE);
    });
});