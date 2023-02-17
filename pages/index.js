/* Skynexui - UI para WEB e MOBILE */
import { Box, Text, Image } from '@skynexui/components';

/* Framer-Motion - Animações */
import { motion } from "framer-motion";

/* Components imports */
import BotaoVazado from '../components/botaovazado.js';
import Caracteristicas from '../components/caracteristicas';
import Footer from '../components/footer.js';


export default function HomePage() {
    /* Animação dos Texts */
    const mainSlide = {
        hidden: { opacity: 0, x: -200, y: 0 },
        enter: { opacity: [0, 0.7, 1], x: [-200, 25, 0], y: 0 },
    };

    /* Animação dos Buttons */
    const scaleUp = {
        hidden: { opacity: 0, scale: 0.5 },
        enter: { opacity: 1, scale: 1 },
    };

    return(
        <>
        {/* Apresentação */}
        <Box
        styleSheet={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'black',
            textAlign: 'center',
            height: '100vh',
            justifyContent: 'center',
            
        }}
        >
            <Box
            styleSheet={{
                width: '50vw'
            }}
            >
                <motion.main
                variants={mainSlide}
                initial="hidden"
                animate="enter"
                transition={{ type: 'linear' }}
                >
                    <Text
                    tag="h1"
                    styleSheet={{
                        color: 'white',
                        margin: '27vh 0 14vh 0',
                        fontFamily: 'inherit',
                        fontWeight: '600',
                        fontSize: '6vh',
                        textAlign: 'center'
                    }}
                    >
                    Pratique esportes conosco
                    </Text>
                </motion.main>

                <motion.main
                variants={mainSlide}
                initial="hidden"
                animate="enter"
                transition={{ type: 'linear' }}
                >
                    <Text
                    tag="p"
                    styleSheet={{
                        color: 'white',
                        margin: '0 0 14vh 0',
                        fontFamily: 'inherit',
                        fontSize: '3vh',
                        textAlign: 'center',
                        textIndent: '0'
                    }}
                    >
                    Crie seu perfil. Monte seu time. Vença Torneios.
                    </Text>
                </motion.main>

                <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
                >
                    <motion.main
                    variants={scaleUp}
                    initial="hidden"
                    animate="enter"
                    transition={{ type: 'linear', delay: 0.2, duration: 0.6 }}
                    >
                        <BotaoVazado 
                        link="cadastro"
                        corPrincipal="#008037"
                        corSecundaria="#00662c"
                        margin="0 6.8vw 0 6.8vw"
                        >
                        Cadastre-se
                        </BotaoVazado>
                    </motion.main>

                    <motion.main
                    variants={scaleUp}
                    initial="hidden"
                    animate="enter"
                    transition={{ type: 'linear', delay: 0.2, duration: 0.6 }}
                    >
                        <BotaoVazado 
                        link="login"
                        corPrincipal="#ffde59" 
                        corSecundaria="#d4b745"
                        >
                        Login
                        </BotaoVazado>
                    </motion.main>
                </Box>
            </Box>
            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'black',
                textAlign: 'center',
                height: '100vh',
                justifyContent: 'center',
                
            }}
            >
                {/* Img Logo */}
                <Image
                src="image/logoIndex.png"
                styleSheet={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain'
                }}
                />
            </Box>
        </Box>
        
        <Caracteristicas />

        <Footer />
        </>
    )
};