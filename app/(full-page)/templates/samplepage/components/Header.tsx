import Link from 'next/link';
export default function SiteHeader() {
    return (
        <header className="siteHeader">
            <div className="siteHeader__logoContainer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="siteHeader__logoText">D-Code</span>
            </div>
            <nav className="siteHeader__navigation">
                <Link href="/" className="siteHeader__navLink">
                    Home
                </Link>
                <Link href="/services" className="siteHeader__navLink">
                    Services
                </Link>
                <Link href="/about" className="siteHeader__navLink">
                    About
                </Link>
                <Link href="/contact" className="siteHeader__navLink">
                    Contact Us
                </Link>
            </nav>
        </header>
    );
}
