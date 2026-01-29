from playwright.sync_api import sync_playwright, expect

def verify_button_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 412, "height": 915}) # Mobile viewport as in screenshot
        page = context.new_page()

        # Test Login Page
        print("Navigating to Login Page...")
        page.goto("http://localhost:3001/login")

        # Wait for the button
        print("Waiting for Sign In button...")
        # locator for the button
        signin_button = page.get_by_role("button", name="Sign In")
        expect(signin_button).to_be_visible()

        # Take screenshot
        print("Taking screenshot of Login Page...")
        page.screenshot(path="verification/login_page.png")

        # Test Verify Email Page
        print("Navigating to Verify Email Page...")
        page.goto("http://localhost:3001/verify-email")

        # Wait for the button
        print("Waiting for Verify Account button...")
        verify_button = page.get_by_role("button", name="Verify Account")
        expect(verify_button).to_be_visible()

        # Take screenshot
        print("Taking screenshot of Verify Email Page...")
        page.screenshot(path="verification/verify_email_page.png")

        browser.close()
        print("Verification complete.")

if __name__ == "__main__":
    verify_button_layout()
