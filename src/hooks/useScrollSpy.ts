import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      // Check if we're at the bottom of the page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50 // 50px buffer
      ) {
        if (sectionIds.length > 0) {
          setActiveSection(sectionIds[sectionIds.length - 1]);
          return;
        }
      }

      let currentSection = "";

      // Check each section's position
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is within the viewport (above the offset line)
          // The loop continues, so 'currentSection' will eventually capture the *last* section
          // that satisfies this condition (which is the one currently closest to the top but still started above the offset).
          if (rect.top <= offset) {
            currentSection = id;
          }
        }
      }

      // If we found a section that crossed the line, set it.
      if (currentSection) {
        setActiveSection(currentSection);
      } else if (sectionIds.length > 0 && !activeSection) {
        // Only default to first if no section is active yet (initial load at top)
        // If we scroll up past the first one, it might be better to keep first one or clear.
        // Usually keeping the first one is safe for "Introduction" content.
        setActiveSection(sectionIds[0]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset, activeSection]);

  return activeSection;
}
