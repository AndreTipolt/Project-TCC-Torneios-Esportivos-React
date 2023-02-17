/* NextJS imports */
import Link from 'next/link';

/* Skynexui - UI para WEB e MOBILE */
import { Image } from '@skynexui/components';


export default function Header() {
    return (
        <>
        <header>
            <Link href="/">
                {/* Logo */}
                <Image
                src="image/PDR_Sports.png"
                styleSheet={{
                    margin: '0 auto 0 auto',
                    height: '50px',
                    cursor: 'pointer',
                }}
                />
            </Link>
        </header>

        <style jsx>{`
        header {
            position: relative;
            height: 150px;
            background-color: black;
            padding: 50px 0 0 0;
            z-index: 1;
        }
        `}</style>
        </>
    )
}