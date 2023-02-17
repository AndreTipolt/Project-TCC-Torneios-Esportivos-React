/* NextJS imports */
import Link from 'next/link';
import { useRouter } from 'next/router';

/* Skynexui - UI para WEB e MOBILE */
import { Box, Image } from '@skynexui/components';


export default function Nav() {
    /* Declarando Variáveis */
    const router = useRouter();
    const url = router.pathname;

    let margin1 = '1vh  auto 0 auto';
    let transform1 = 'translateY(-3.8vh)';
    let img1 = 'image/Perfil_OFF.png';
    let margin2 = '1vh  auto 0 auto';
    let transform2 = 'translateY(-3.8vh)';
    let img2 = 'image/Time_OFF.png';
    let margin3 = '1vh  auto 0 auto';
    let transform3 = 'translateY(-3.8vh)';
    let img3 = 'image/Home_OFF.png';
    let margin4 = '1vh  auto 0 auto';
    let transform4 = 'translateY(-3.8vh)';
    let img4 = 'image/Trofeu_PDR_OFF.png';
    let margin5 = '1vh  auto 0 auto';
    let transform5 = 'translateY(-3.8vh)';
    let img5 = 'image/Config_OFF.png';
    let margin6 = '1vh  auto 0 auto';
    let transform6 = 'translateY(-3.8vh)';
    let img6 = 'image/Sobre_OFF.png';


    if (url == '/perfil') {
        margin1 = '-2.8vh  auto 0 auto';
        transform1 = 'translateY(0)';
        img1 = 'image/Perfil_ON.png';
    }
    else if (url == '/times' || url == '/verTime') {
        margin2 = '-2.8vh  auto 0 auto';
        transform2 = 'translateY(0)';
        img2 = 'image/Time_ON.png';
    }
    else if (url == '/princ') {
        margin3 = '-2.8vh  auto 0 auto';
        transform3 = 'translateY(0)';
        img3 = 'image/Home_ON.png';
    }
    else if (url == '/torneios' || url == '/verTorneio') {
        margin4 = '-2.8vh  auto 0 auto';
        transform4 = 'translateY(0)';
        img4 = 'image/Trofeu_PDR_ON.png';
    }
    else if (url == '/config') {
        margin5 = '-2.8vh  auto 0 auto';
        transform5 = 'translateY(0)';
        img5 = 'image/Config_ON.png';
    }
    else if (url == '/sobre') {
        margin6 = '-2.8vh  auto 0 auto';
        transform6 = 'translateY(0)';
        img6 = 'image/Sobre_ON.png';
    }


    return (
        <>    
        <Box
        styleSheet={{
            display: 'flex',
            flexDirection: 'row',
            height: '13vh',
            position: 'sticky',
            bottom: '0',
            width: '100%',
            backgroundColor: 'rgb(0,0,0,0.97)'
        }}
        >
            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'row',
                margin: '0 auto 0 auto',
                height: '18vh',
                width: '50vw',
                position: 'sticky',
                bottom: '0'
            }}
            >
                <Link href="/perfil">
                    <Image 
                    src={img1}
                    styleSheet={{
                        height: '11vh',
                        width: '11vh',
                        margin: margin1,
                        disabled: {},
                        focus: {},
                        transition: '0.6s',
                        hover: {
                            cursor: 'pointer',
                            transform: 'scale(1.15)',
                            transform: transform1
                        }
                    }} 
                    />
                </Link>

                <Link href="/times">
                    <Image 
                    src={img2}
                    styleSheet={{
                        height: '11vh',
                        width: '11vh',
                        margin: margin2,
                        disabled: {},
                        focus: {},
                        transition: '0.6s',
                        hover: {
                            cursor: 'pointer',
                            transform: 'scale(1.15)',
                            transform: transform2 
                        }
                    }} 
                    />
                </Link>

                <Link href="/princ">
                    <Image 
                    src={img3}
                    styleSheet={{
                        height: '11vh',
                        width: '11vh',
                        margin: margin3,
                        disabled: {},
                        focus: {},
                        transition: '0.6s',
                        hover: {
                            cursor: 'pointer',
                            transform: 'scale(1.15)',
                            transform: transform3
                        }
                    }} 
                    />
                </Link>

                <Link href="/torneios">
                    <Image 
                    src={img4}
                    styleSheet={{
                        height: '11vh',
                        width: '11vh',
                        margin: margin4,
                        disabled: {},
                        focus: {},
                        transition: '0.6s',
                        hover: {
                            cursor: 'pointer',
                            transform: 'scale(1.15)',
                            transform: transform4
                        }
                    }} 
                    />
                </Link>

                <Link href="/">
                    <Image 
                    src={img5}
                    styleSheet={{
                        height: '11vh',
                        width: '11vh',
                        margin: margin5,
                        disabled: {},
                        focus: {},
                        transition: '0.6s',
                        hover: {
                            cursor: 'pointer',
                            transform: 'scale(1.15)',
                            transform: transform5
                        }
                    }} 
                    />
                </Link>
            </Box>
            
            <Link href="/sobre">
                <Image 
                src={img6}
                styleSheet={{
                    position: 'absolute',
                    height: '10vh',
                    width: '10vh',
                    right: '1.3vh',
                    margin: margin6,
                    disabled: {},
                    focus: {},
                    transition: '0.6s',
                    hover: {
                        cursor: 'pointer',
                        transform: 'scale(1.15)',
                        transform: transform6
                    }
                }} 
                />
            </Link>
        </Box>
        </>
    );
}