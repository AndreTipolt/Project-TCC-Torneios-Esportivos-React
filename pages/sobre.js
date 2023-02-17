/* Skynexui - UI para WEB e MOBILE */
import { Box, Text, Image } from '@skynexui/components';

/* Framer-Motion - Animações */
import { motion } from "framer-motion";

/* Components imports */
import Bundle from '../components/bundle.js';
import Caracteristicas from '../components/caracteristicas';

export default function SobrePage() {
    /* Animação dos Texts */
    const slide = {
        hidden: { opacity: 0, x: -50, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
    }

    /* Animação das Images */
    const scaleUp = {
        hidden: { opacity: 0, scale: 0.5 },
        enter: { opacity: 1, scale: 1 },
    }

    /* Animação das Box */
    const box = {
        hidden: { opacity: 0, x: 0, y: 200 },
        enter: { opacity: 1, x: 0, y: 0 },
    }

    return (
    <>
    <Bundle>
    
    <Caracteristicas />

    <motion.main
    variants={box}
    initial="hidden"
    whileInView="enter"
    viewport={{ once: true }}
    transition={{ type: 'linear', duration: 0.5 }}
    >
        <hr />
    </motion.main>

    <Box
    styleSheet={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'inherit',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10vw'
    }}
    >
        {/* Membro 1 */}
        <motion.main
        variants={box}
        initial="hidden"
        whileInView="enter"
        viewport={{ once: true }}
        transition={{ type: 'linear', duration: 0.5 }}
        >
            <Box
            styleSheet={{
                backgroundColor: '#000',
                height: '50vh',
                width: '20vw',
                margin: '15vh auto',
                borderRadius: '12px',
                padding: '15px'
            }}
            >
                {/* Img Membro 1 */}
                <motion.main
                variants={scaleUp}
                initial="hidden"
                whileInView="enter"
                viewport={{ once: true }}
                transition={{ type: 'linear', delay: 0.2, duration: 0.6 }}
                >
                    <Image
                    src="image/ftandre.png"
                    styleSheet={{
                        height: '20vh',
                        width: '20vh',
                        margin: '1.2vh auto',
                        borderRadius: '30vw'
                    }}
                    />
                </motion.main>
                <motion.main
                variants={slide}
                initial="hidden"
                whileInView="enter"
                viewport={{ once: true }}
                transition={{ type: 'linear' }}
                >
                    <Text
                    tag="h1"
                    styleSheet={{
                        color: 'white',
                        padding: '15px 0 2vh 0',
                        fontFamily: 'inherit',
                        fontSize: '3.5vh',
                        textAlign: 'center'
                    }}
                    >
                        André Tipolt
                    </Text>
                </motion.main>
                <motion.main
                variants={slide}
                initial="hidden"
                whileInView="enter"
                viewport={{ once: true }}
                transition={{ type: 'linear' }}
                >
                    <Text
                    tag="p"
                    styleSheet={{
                        color: 'white',
                        padding: '3.5vh 0 0 0',
                        fontFamily: 'inherit',
                        fontSize: '2.5vh',
                        textAlign: 'center',
                        textIndent: '0'
                    }}
                    >
                        Banco de Dados
                    </Text>
                </motion.main>
            </Box>
        </motion.main>

        {/* Membro 2 */}
        <motion.main
        variants={box}
        initial="hidden"
        whileInView="enter"
        viewport={{ once: true }}
        transition={{ type: 'linear', duration: 0.5 }}
        >
            <Box
            styleSheet={{
                backgroundColor: '#000',
                height: '50vh',
                width: '20vw',
                margin: '15vh auto',
                borderRadius: '12px',
                padding: '15px'
            }}
            >
                {/* Img Membro 2 */}
                <motion.main
                variants={scaleUp}
                initial="hidden"
                whileInView="enter"
                viewport={{ once: true }}
                transition={{ type: 'linear', delay: 0.2, duration: 0.6 }}
                >
                    <Image
                    src="image/ftgean.png"
                    styleSheet={{
                        height: '20vh',
                        width: '20vh',
                        margin: '1.2vh auto',
                        borderRadius: '30vw'
                    }}
                    />
                </motion.main>
                <motion.main
                variants={slide}
                initial="hidden"
                whileInView="enter"
                viewport={{ once: true }}
                transition={{ type: 'linear' }}
                >
                    <Text
                    tag="h1"
                    styleSheet={{
                        color: 'white',
                        padding: '15px 0 2vh 0',
                        fontFamily: 'inherit',
                        fontSize: '3.5vh',
                        textAlign: 'center'
                    }}
                    >
                    Gean Ordonho 
                    </Text>
                </motion.main>
                <motion.main
                variants={slide}
                initial="hidden"
                whileInView="enter"
                viewport={{ once: true }}
                transition={{ type: 'linear' }}
                >
                    <Text
                    tag="p"
                    styleSheet={{
                        color: 'white',
                        padding: '3.5vh 0 0 0',
                        fontFamily: 'inherit',
                        fontSize: '2.5vh',
                        textAlign: 'center',
                        textIndent: '0'
                    }}
                    >
                    Design Web
                    </Text>
                </motion.main>
            </Box>
        </motion.main>

        {/* Membro 3 */}
        <motion.main
        variants={box}
        initial="hidden"
        whileInView="enter"
        viewport={{ once: true }}
        transition={{ type: 'linear', duration: 0.5 }}
        >
            <Box
            styleSheet={{
                backgroundColor: '#000',
                height: '50vh',
                width: '20vw',
                margin: '15vh auto',
                borderRadius: '12px',
                padding: '15px'
            }}
            >
                {/* Img Membro 3 */}
                <motion.main
                variants={scaleUp}
                initial="hidden"
                whileInView="enter"
                viewport={{ once: true }}
                transition={{ type: 'linear', delay: 0.2, duration: 0.6 }}
                >
                    <Image
                    src="image/ftjoao.png"
                    styleSheet={{
                        height: '20vh',
                        width: '20vh',
                        margin: '1.2vh auto',
                        borderRadius: '30vw'
                    }}
                    />
                </motion.main>
                <motion.main
                variants={slide}
                initial="hidden"
                whileInView="enter"
                viewport={{ once: true }}
                transition={{ type: 'linear' }}
                >
                    <Text
                    tag="h1"
                    styleSheet={{
                        color: 'white',
                        padding: '15px 0 2vh 0',
                        fontFamily: 'inherit',
                        fontSize: '3.5vh',
                        textAlign: 'center'
                    }}
                    >
                    João Pedro
                    </Text>
                </motion.main>
                <motion.main
                variants={slide}
                initial="hidden"
                whileInView="enter"
                viewport={{ once: true }}
                transition={{ type: 'linear' }}
                >
                    <Text
                    tag="p"
                    styleSheet={{
                        color: 'white',
                        padding: '3.5vh 0 0 0',
                        fontFamily: 'inherit',
                        fontSize: '2.5vh',
                        textAlign: 'center',
                        textIndent: '0'
                    }}
                    >
                    Documentação
                    </Text>
                </motion.main>
            </Box>
        </motion.main>   
    </Box>

    <Box
    styleSheet={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'inherit',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10vw'
    }}
    >
        {/* Membro 4 */}
        <motion.main
        variants={box}
        initial="hidden"
        whileInView="enter"
        viewport={{ once: true }}
        transition={{ type: 'linear', duration: 0.5 }}
        >
            <Box
            styleSheet={{
                backgroundColor: '#000',
                height: '50vh',
                width: '20vw',
                margin: '0 auto 15vh auto',
                borderRadius: '12px',
                padding: '15px'
            }}
            >
                {/* Img Membro 4 */}
                <motion.main
                variants={scaleUp}
                initial="hidden"
                whileInView="enter"
                viewport={{ once: true }}
                transition={{ type: 'linear', delay: 0.2, duration: 0.6 }}
                >
                    <Image
                    src="image/ftotavio.jpeg"
                    styleSheet={{
                        height: '20vh',
                        width: '20vh',
                        margin: '1.2vh auto',
                        borderRadius: '30vw'
                    }}
                    />
                </motion.main>
                <motion.main
                variants={slide}
                initial="hidden"
                whileInView="enter"
                viewport={{ once: true }}
                transition={{ type: 'linear' }}
                >
                    <Text
                    tag="h1"
                    styleSheet={{
                        color: 'white',
                        padding: '15px 0 2vh 0',
                        fontFamily: 'inherit',
                        fontSize: '3.5vh',
                        textAlign: 'center'
                    }}
                    >
                        Otávio Augusto
                    </Text>
                </motion.main>
                <motion.main
                variants={slide}
                initial="hidden"
                whileInView="enter"
                viewport={{ once: true }}
                transition={{ type: 'linear' }}
                >
                    <Text
                    tag="p"
                    styleSheet={{
                        color: 'white',
                        padding: '3.5vh 0 0 0',
                        fontFamily: 'inherit',
                        fontSize: '2.5vh',
                        textAlign: 'center',
                        textIndent: '0'
                    }}
                    >
                        Design Mobile
                    </Text>
                </motion.main>
            </Box>
        </motion.main>

        {/* Membro 5 */}
        <motion.main
        variants={box}
        initial="hidden"
        whileInView="enter"
        viewport={{ once: true }}
        transition={{ type: 'linear', duration: 0.5 }}
        >
            <Box
            styleSheet={{
                backgroundColor: '#000',
                height: '50vh',
                width: '20vw',
                margin: '0 auto 15vh auto',
                borderRadius: '12px',
                padding: '15px'
            }}
            >
                {/* Img Membro 5 */}
                <motion.main
                variants={scaleUp}
                initial="hidden"
                whileInView="enter"
                viewport={{ once: true }}
                transition={{ type: 'linear', delay: 0.2, duration: 0.6 }}
                >
                    <Image
                    src="image/fttarcisio.jpg"
                    styleSheet={{
                        height: '20vh',
                        width: '20vh',
                        margin: '1.2vh auto',
                        borderRadius: '30vw'
                    }}
                    />
                </motion.main>
                <motion.main
                variants={slide}
                initial="hidden"
                whileInView="enter"
                viewport={{ once: true }}
                transition={{ type: 'linear' }}
                >
                    <Text
                    tag="h1"
                    styleSheet={{
                        color: 'white',
                        padding: '15px 0 2vh 0',
                        fontFamily: 'inherit',
                        fontSize: '3.5vh',
                        textAlign: 'center'
                    }}
                    >
                    Tarcísio Pereira
                    </Text>
                </motion.main>
                <motion.main
                variants={slide}
                initial="hidden"
                whileInView="enter"
                viewport={{ once: true }}
                transition={{ type: 'linear' }}
                >
                    <Text
                    tag="p"
                    styleSheet={{
                        color: 'white',
                        padding: '3.5vh 0 0 0',
                        fontFamily: 'inherit',
                        fontSize: '2.5vh',
                        textAlign: 'center',
                        textIndent: '0'
                    }}
                    >
                    Programação
                    </Text>
                </motion.main>
            </Box>
        </motion.main>
    </Box>

    </Bundle>

    <style jsx>{`
    hr {
        height: 1px;
        width: 80vw;
        color: white;
        padding: 0;
        margin: 0 10vw;
    }
    `}</style>

    </>
    );
}