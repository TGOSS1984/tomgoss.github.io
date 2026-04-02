import Navbar from "./Navbar";
import Footer from "./Footer";

function PageLayout({ children }) {
  return (
    <div className="site-frame">
      <Navbar />
      <main className="site-main">{children}</main>
      <Footer />
    </div>
  );
}

export default PageLayout;