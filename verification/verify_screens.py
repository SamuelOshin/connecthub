from playwright.sync_api import sync_playwright

def verify_screens():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # 1920x1080 for desktop view
        context = browser.new_context(viewport={"width": 1920, "height": 1080})
        page = context.new_page()

        try:
            # Discover Screen
            print("Navigating to /discover...")
            page.goto("http://localhost:3000/discover", timeout=60000)
            page.wait_for_selector("text=Discovery Settings", state="visible")
            page.screenshot(path="verification/discover.png")
            print("Captured discover.png")

            # Matches Screen
            print("Navigating to /matches...")
            page.goto("http://localhost:3000/matches")
            page.wait_for_selector("text=New Matches", state="visible")
            page.screenshot(path="verification/matches.png")
            print("Captured matches.png")

            # Messages Screen
            print("Navigating to /messages...")
            page.goto("http://localhost:3000/messages")
            page.wait_for_selector("text=Messages", state="visible")
            page.screenshot(path="verification/messages.png")
            print("Captured messages.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_screens()
