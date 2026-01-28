from playwright.sync_api import sync_playwright

def verify_mobile_responsiveness():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Mobile Context
        mobile_context = browser.new_context(viewport={"width": 375, "height": 667})
        mobile_page = mobile_context.new_page()

        print("Checking Mobile View...")

        # About Page Mobile
        print("Navigating to /about (Mobile)")
        mobile_page.goto("http://localhost:3000/about")
        mobile_page.wait_for_load_state("networkidle")
        mobile_page.screenshot(path="verification/about_mobile.png", full_page=True)

        # Check Menu
        print("Opening Mobile Menu")
        mobile_page.click("button[aria-label='Toggle menu']")
        mobile_page.wait_for_timeout(500) # Wait for animation
        mobile_page.screenshot(path="verification/mobile_menu_open.png")

        # Help Page Mobile
        print("Navigating to /help (Mobile)")
        mobile_page.goto("http://localhost:3000/help")
        mobile_page.wait_for_load_state("networkidle")
        mobile_page.screenshot(path="verification/help_mobile.png", full_page=True)

        # Blog Page Mobile
        print("Navigating to /blog (Mobile)")
        mobile_page.goto("http://localhost:3000/blog")
        mobile_page.wait_for_load_state("networkidle")
        mobile_page.screenshot(path="verification/blog_mobile.png", full_page=True)

        # Tablet Context
        tablet_context = browser.new_context(viewport={"width": 768, "height": 1024})
        tablet_page = tablet_context.new_page()

        print("Checking Tablet View...")

        # About Page Tablet
        print("Navigating to /about (Tablet)")
        tablet_page.goto("http://localhost:3000/about")
        tablet_page.wait_for_load_state("networkidle")
        tablet_page.screenshot(path="verification/about_tablet.png", full_page=True)

        browser.close()
        print("Mobile/Tablet verification complete.")

if __name__ == "__main__":
    verify_mobile_responsiveness()
