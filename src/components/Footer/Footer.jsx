import './Footer.css';

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="libraryFooter">
            <p>&copy; {year} Crisi. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
