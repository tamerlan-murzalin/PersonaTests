// components/Layout.js
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="hc-site">
      <Header />
      <div className="hc-main">{children}</div>
      <Footer />
    </div>
  );
}