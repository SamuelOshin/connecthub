import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";

      // Check each section's position
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is within the viewport (with some offset)
          // or we are near the bottom of the page
          if (rect.top <= offset) {
            currentSection = id;
          }
        }
      }

      // If we're at the very top, maybe reset or set to first?
      // But typically we want the last one that passed the threshold.

      if (currentSection) {
        setActiveSection(currentSection);
      } else if (sectionIds.length > 0) {
        // Default to first if nothing triggered (e.g. at top)
        setActiveSection(sectionIds[0]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
