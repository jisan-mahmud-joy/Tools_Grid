import { useEffect } from "react";

export default function useSwipe(onLeft, onRight) {
  useEffect(() => {
    let startX = 0;

    const start = (e) => (startX = e.touches[0].clientX);

    const end = (e) => {
      let diff = e.changedTouches[0].clientX - startX;

      if (diff > 80) onRight?.();
      if (diff < -80) onLeft?.();
    };

    window.addEventListener("touchstart", start);
    window.addEventListener("touchend", end);

    return () => {
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", end);
    };
  }, []);
}