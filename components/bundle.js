/* Components imports */
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import Nav from '../components/nav.js';

export default function Bundle({ children }) {
    return (
        <>
        <Header />

        {children}

        <Nav />

        <Footer />
        </>
    );
}