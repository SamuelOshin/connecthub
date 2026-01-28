from playwright.sync_api import sync_playwright

def verify_pages():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Verify About Page
        print("Navigating to /about")
        page.goto("http://localhost:3000/about")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/about_page.png", full_page=True)
        print("Screenshot saved to verification/about_page.png")

        # Verify Help Page
        print("Navigating to /help")
        page.goto("http://localhost:3000/help")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/help_page.png", full_page=True)
        print("Screenshot saved to verification/help_page.png")

        # Verify Blog Page
        print("Navigating to /blog")
        page.goto("http://localhost:3000/blog")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/blog_page.png", full_page=True)
        print("Screenshot saved to verification/blog_page.png")

        browser.close()

if __name__ == "__main__":
    verify_pages()
