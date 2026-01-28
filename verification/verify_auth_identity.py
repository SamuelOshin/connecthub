from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        try:
            # 1. Signup
            print("Navigating to Signup...")
            page.goto("http://localhost:3000/signup", timeout=30000)
            page.wait_for_load_state("networkidle")
            # Wait for content to render
            page.wait_for_selector("text=Create Account")
            page.screenshot(path="verification/signup.png")
            print("Signup screenshot taken.")

            # 2. Login
            print("Navigating to Login...")
            page.goto("http://localhost:3000/login")
            page.wait_for_load_state("networkidle")
            page.wait_for_selector("text=Welcome Back")
            page.screenshot(path="verification/login.png")
            print("Login screenshot taken.")

            # 3. OTP
            print("Navigating to OTP...")
            page.goto("http://localhost:3000/verify-otp")
            page.wait_for_load_state("networkidle")
            page.wait_for_selector("text=Check your inbox")
            page.screenshot(path="verification/otp.png")
            print("OTP screenshot taken.")

            # 4. Identity Intro
            print("Navigating to Identity Verification...")
            page.goto("http://localhost:3000/identity-verification")
            page.wait_for_load_state("networkidle")
            page.wait_for_selector("text=Let's verify it's you")
            page.screenshot(path="verification/identity_intro.png")
            print("Identity Intro screenshot taken.")

            # 5. Identity Scan
            # Click "Start Verification"
            print("Clicking Start Verification...")
            page.get_by_role("button", name="Start Verification").click()
            time.sleep(2) # Wait for transition and animation start
            page.screenshot(path="verification/identity_scan.png")
            print("Identity Scan screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")

        finally:
            browser.close()

if __name__ == "__main__":
    run()
