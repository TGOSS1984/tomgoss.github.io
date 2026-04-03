import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RouteLoader from "./RouteLoader";
import { RouteLoadingProvider } from "../../context/RouteLoadingContext";

function PageLayout({ children }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigateStart = (path) => {
    setIsLoading(true);

    setTimeout(() => {
      navigate(path);
    }, 180);

    setTimeout(() => {
      setIsLoading(false);
    }, 1150);
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