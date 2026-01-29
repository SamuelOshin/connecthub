from playwright.sync_api import sync_playwright
import time

def verify(page, port):
    base_url = f"http://localhost:{port}"
    print(f"Trying {base_url}")

    try:
        # Screen 1: Sign Up
        print("Navigating to Sign Up...")
        page.goto(f"{base_url}/sign-up", timeout=30000) # Increased timeout
        print(f"Page title: {page.title()}")
        page.screenshot(path="verification/debug_signup.png")

        page.wait_for_selector("text=Create Account", timeout=10000)
        page.screenshot(path="verification/sign-up.png")
        print("Captured sign-up.png")

        # Screen 6: Login
        print("Navigating to Login...")
        page.goto(f"{base_url}/login", timeout=30000)
        page.wait_for_selector("text=Welcome Back", timeout=10000)
        page.screenshot(path="verification/login.png")
        print("Captured login.png")

        # Screen 5: Verify Email
        print("Navigating to Verify Email...")
        page.goto(f"{base_url}/verify-email", timeout=30000)
        page.wait_for_selector("text=Check your inbox", timeout=10000)
        page.screenshot(path="verification/verify-email.png")
        print("Captured verify-email.png")

        # Screen 2: Success
        print("Navigating to Success...")
        page.goto(f"{base_url}/success", timeout=30000)
        page.wait_for_selector("text=You're all set", timeout=10000)
        page.screenshot(path="verification/success.png")
        print("Captured success.png")

        # Screen 4: Identity Intro
        print("Navigating to Identity Intro...")
        page.goto(f"{base_url}/identity-verification", timeout=30000)
        page.wait_for_selector("text=Let's verify it's you", timeout=10000)
        page.screenshot(path="verification/identity-intro.png")
        print("Captured identity-intro.png")

        # Screen 3: Identity Scan
        print("Navigating to Identity Scan...")
        page.goto(f"{base_url}/identity-verification/scan", timeout=30000)
        page.wait_for_selector("text=Scanning face features", timeout=10000)
        time.sleep(2)
        page.screenshot(path="verification/identity-scan.png")
        print("Captured identity-scan.png")

        return True
    except Exception as e:
        print(f"Failed on port {port}: {e}")
        page.screenshot(path=f"verification/error_{port}.png")
        return False

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        if not verify(page, 3001):
            print("Retrying on port 3000")
            verify(page, 3000)

        browser.close()
