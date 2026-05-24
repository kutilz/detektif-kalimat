import os
import time
from playwright.sync_api import sync_playwright

def run_qa():
    # Define directories
    convo_dir = r"C:\Users\Ilyas\.gemini\antigravity\brain\2d28bd42-63ed-464f-8a53-0af59d99cae5"
    screenshot_dir = os.path.join(convo_dir, "screenshots")
    os.makedirs(screenshot_dir, exist_ok=True)

    print(f"Screenshots will be saved to: {screenshot_dir}")

    with sync_playwright() as p:
        # Launch Chromium browser
        browser = p.chromium.launch(headless=True)
        
        # Define viewports
        viewports = {
            "desktop": {"width": 1280, "height": 800},
            "mobile": {"width": 375, "height": 812}
        }

        for mode, vp in viewports.items():
            print(f"\n--- Testing {mode} ({vp['width']}x{vp['height']}) ---")
            context = browser.new_context(viewport=vp)
            page = context.new_page()
            page.on("pageerror", lambda err: print(f"[{mode.upper()} ERROR] {err}"))
            page.on("console", lambda msg: print(f"[{mode.upper()} CONSOLE {msg.type}] {msg.text}"))

            # 1. Open Landing/Cover Page
            print("Opening application cover...")
            page.goto("http://localhost:5173/")
            page.wait_for_timeout(2000)  # Wait for animations
            page.screenshot(path=os.path.join(screenshot_dir, f"1_cover_{mode}.png"))

            # 2. Click Mulai Belajar to go to Menu
            print("Navigating to Menu...")
            page.click(".btn-main")
            page.wait_for_timeout(1500)
            page.screenshot(path=os.path.join(screenshot_dir, f"2_menu_{mode}.png"))

            # 3. Go to Materi
            print("Navigating to Materi slides...")
            page.click(".card-materi")
            page.wait_for_timeout(1000)
            
            # Take screenshot of Slide 1
            page.screenshot(path=os.path.join(screenshot_dir, f"3_materi_slide1_{mode}.png"))

            # Go through slide 2 to 8
            for i in range(2, 9):
                print(f"Clicking next slide ({i})...")
                page.click(".btn-nav-next")
                page.wait_for_timeout(1000)
                page.screenshot(path=os.path.join(screenshot_dir, f"3_materi_slide{i}_{mode}.png"))
            
            # Go back to Menu from Materi
            print("Returning to menu...")
            page.click(".btn-back")
            page.wait_for_timeout(1000)

            # 4. Go to Latihan (Quiz)
            print("Navigating to Latihan...")
            page.click(".card-latihan")
            page.wait_for_timeout(1000)

            # Check if User Identity Form is shown
            if page.locator(".identity-screen").is_visible():
                print("Filling User Identity form...")
                page.screenshot(path=os.path.join(screenshot_dir, f"4_identity_{mode}.png"))
                # Input identity and start
                page.fill(".identity-field-input >> nth=0", "Detektif Budi")
                page.screenshot(path=os.path.join(screenshot_dir, f"4_identity_filled_{mode}.png"))
                page.click(".identity-btn-start")
                page.wait_for_timeout(1500)

            # 5. Answer Quiz Questions
            print("Starting quiz walkthrough...")
            question_num = 1
            while True:
                # Check if hasil screen is visible
                if page.locator(".hasil-content").is_visible():
                    print("Hasil/Results screen reached!")
                    page.screenshot(path=os.path.join(screenshot_dir, f"5_hasil_{mode}.png"))
                    break

                if question_num > 15:  # Infinite loop safety
                    print("Safety limit reached, stopping quiz loop.")
                    try:
                        html_content = page.locator("#root").inner_html()
                        dump_path = os.path.join(os.path.dirname(__file__), f"dom_dump_{mode}.html")
                        with open(dump_path, "w", encoding="utf-8") as f_dump:
                            f_dump.write(html_content)
                        print(f"DOM HTML dumped to: {dump_path}")
                    except Exception as html_err:
                        print("Failed to write HTML dump:", html_err)
                    break

                print(f"Processing question {question_num}...")
                page.wait_for_timeout(500)
                page.screenshot(path=os.path.join(screenshot_dir, f"quiz_q{question_num}_{mode}.png"))

                # Handle based on question type
                # A. Token type
                if page.locator(".word-token").first.is_visible():
                    print("Question type: Token. Clicking first token...")
                    page.click(".word-token >> nth=0")
                
                # B. Scramble type
                elif page.locator(".scramble-chip").first.is_visible():
                    print("Question type: Scramble. Drag-and-drop/Ordering. Clicking Periksa...")
                    # Since we can't easily drag in automated headless, we just click 'Periksa' to submit current order
                    page.click(".btn-check")

                # C. Drag type (SPO placement)
                elif page.locator(".word-chip.available").first.is_visible():
                    print("Question type: Drag (SPO). Placing tokens via click...")
                    # Tap-to-place fallback: click first word then click S zone, second word to P zone, third to O zone
                    try:
                        words = page.locator(".word-chip.available").all()
                        if len(words) >= 3:
                            # Subjek
                            page.click(".word-chip.available >> nth=0")
                            page.click(".s-zone")
                            page.wait_for_timeout(200)
                            # Predikat
                            page.click(".word-chip.available >> nth=0")
                            page.click(".p-zone")
                            page.wait_for_timeout(200)
                            # Objek
                            page.click(".word-chip.available >> nth=0")
                            page.click(".o-zone")
                            page.wait_for_timeout(200)
                        
                        page.click(".btn-check")
                    except Exception as e:
                        print("Error placing SPO words:", e)
                        page.click(".btn-check")

                # D. Sandbox type
                elif page.locator(".sandbox-input").is_visible():
                    print("Question type: Sandbox. Typing a sentence...")
                    page.fill(".sandbox-input", "Ibu memasak nasi")
                    page.wait_for_timeout(800)
                    page.screenshot(path=os.path.join(screenshot_dir, f"quiz_q{question_num}_sandbox_filled_{mode}.png"))
                    page.click("#btn-check-sandbox")

                # Wait for feedback popup and dismiss it
                page.wait_for_timeout(1000)
                if page.locator(".feedback-overlay.show").is_visible() or page.locator(".feedback-overlay").is_visible():
                    print("Feedback overlay visible, dismissing...")
                    page.screenshot(path=os.path.join(screenshot_dir, f"quiz_q{question_num}_feedback_{mode}.png"))
                    page.click(".feedback-overlay")
                    page.wait_for_timeout(1000)

                question_num += 1

            context.close()

        browser.close()
    print("QA Run Completed Successfully!")

if __name__ == "__main__":
    run_qa()
