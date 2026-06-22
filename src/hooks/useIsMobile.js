import { useEffect, useState } from "react";

// 820px mirrors the breakpoint the site's own navigation switches to its
// mobile (hamburger) layout at — see .nav-desktop / .nav-mobile in
// globals.css — so "mobile" means the same thing everywhere on the site.
const MOBILE_QUERY = "(max-width: 820px)";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(MOBILE_QUERY).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event) => setIsMobile(event.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}

export default useIsMobile;