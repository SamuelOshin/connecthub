from playwright.sync_api import sync_playwright

def verify_button_color():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create a context with light color scheme preference
        context = browser.new_context(viewport={"width": 1280, "height": 800}, color_scheme="light")
        page = context.new_page()

        print("Navigating to Landing Page...")
        page.goto("http://localhost:3001/")

        # Wait for the buttons to be visible
        print("Waiting for buttons...")
        page.wait_for_selector("text=Log In")
        page.wait_for_selector("text=Learn More")

        # Take screenshot of the Hero section (which includes Header)
        print("Taking screenshot...")
        page.screenshot(path="verification/landing_page_buttons.png")

        browser.close()
        print("Verification complete.")

if __name__ == "__main__":
    verify_button_color()
