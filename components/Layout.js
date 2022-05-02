import Footer from './NavFooter/Footer';
import Navbar from './NavFooter/Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
