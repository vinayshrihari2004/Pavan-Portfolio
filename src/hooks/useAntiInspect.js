{/*import { useEffect } from "react";

export function useAntiInspect() {
  useEffect(() => {
    // 1. Prevent default right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // 2. Prevent key combinations for inspect / view source
    const handleKeyDown = (e) => {
      // F12
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        return;
      }

      const ctrlOrCmd = e.ctrlKey || e.metaKey;

      if (ctrlOrCmd) {
        // Ctrl+Shift+I (DevTools), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspect Element)
        if (
          e.shiftKey &&
          (e.key === "I" ||
            e.key === "i" ||
            e.key === "J" ||
            e.key === "j" ||
            e.key === "C" ||
            e.key === "c")
        ) {
          e.preventDefault();
          return;
        }

        // Ctrl+U (View Source), Ctrl+S (Save Page)
        if (
          e.key === "U" ||
          e.key === "u" ||
          e.key === "S" ||
          e.key === "s"
        ) {
          e.preventDefault();
          return;
        }
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
} */}