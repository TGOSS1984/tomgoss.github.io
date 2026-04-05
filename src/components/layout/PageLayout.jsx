import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RouteLoader from "./RouteLoader";
import { RouteLoadingProvider } from "../../context/RouteLoadingContext";
import { introConfig } from "../../config/introConfig";

function shouldShowIntroForPath(path) {
  if (typeof window === "undefined") return false;
  if (!introConfig.enabled) return false;
  if (path !== "/") return false;

  if (introConfig.displayMode === "every-visit") {
    return true;
  }

  if (introConfig.displayMode === "session") {
    return window.sessionStorage.getItem(introConfig.storageKey) !== "true";
  }

  if (introConfig.displayMode === "first-visit") {
    return window.localStorage.getItem(introConfig.storageKey) !== "true";
  }

  return false;
}

function PageLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const suppressInitialLoader = useMemo(() => {
    return shouldShowIntroForPath(location.pathname);
  }, [location.pathname]);

  const [isLoading, setIsLoading] = useState(!suppressInitialLoader);

  useEffect(() => {
    if (suppressInitialLoader) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, [suppressInitialLoader]);

  const handleNavigateStart = (path) => {
    const suppressRouteLoader = shouldShowIntroForPath(path);

    if (!suppressRouteLoader) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    setTimeout(() => {
      navigate(path);
    }, 180);

    if (!suppressRouteLoader) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1150);
    }
  };

  return (
    <RouteLoadingProvider value={{ isLoading }}>
      <div className="site-frame">
        <Navbar onNavigateStart={handleNavigateStart} />
        <RouteLoader isLoading={isLoading} />
        <main className="site-main">{children}</main>
        <Footer />
      </div>
    </RouteLoadingProvider>
  );
}

export default PageLayout;