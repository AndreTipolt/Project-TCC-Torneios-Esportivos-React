/* Skynexui - UI para WEB e MOBILE */
import { Box, Text, Image } from '@skynexui/components';

/* Framer-Motion - Animações */
import { motion } from "framer-motion";


export default function Caracteristicas () {
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
        {/* Características */}
        <Box
        styleSheet={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'inherit',
            height: '80vh'
        }}
        >
            {/* Conectar */}
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
                    margin: '15vh 0vw 15vh 10vw',
                    borderRadius: '12px'
                }}
                >
                    {/* Img Conectar */}
                    <motion.main
                    variants={scaleUp}
                    initial="hidden"
                    whileInView="enter"
                    viewport={{ once: true }}
                    transition={{ type: 'linear', delay: 0.2, duration: 0.6 }}
                    >
                        <Image
                        src="image/conectese.png"
                        styleSheet={{
                            height: '25vh',
                            width: '25vh',
                            margin: '1.2vh auto',
                            borderRadius: '5vw'
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
                            padding: '0 0 2vh 0',
                            fontFamily: 'inherit',
                            fontSize: '3.5vh',
                            textAlign: 'center'
                        }}
                        >
                        Conecte-se
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
                        com outros jogadores
                        </Text>
                    </motion.main>
                </Box>
            </motion.main>

            {/* Montar Times */}
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
                    margin: '15vh 0vw 15vh 10vw',
                    borderRadius: '12px'
                }}
                >
                    {/* Img Prancheta */}
                    <motion.main
                    variants={scaleUp}
                    initial="hidden"
                    whileInView="enter"
                    viewport={{ once: true }}
                    transition={{ type: 'linear', delay: 0.2, duration: 0.6 }}
                    >
                        <Image
                        src="image/prancheta.png"
                        styleSheet={{
                            height: '25vh',
                            width: '25vh',
                            margin: '1.2vh auto',
                            borderRadius: '5vw'
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
                            padding: '0 0 2vh 0',
                            fontFamily: 'inherit',
                            fontSize: '3.5vh',
                            textAlign: 'center'
                        }}
                        >
                        Monte
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
                        seu time
                        </Text>
                    </motion.main>
                </Box>
            </motion.main>

            {/* Organizar Torneios */}
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
                    margin: '15vh 0vw 15vh 10vw',
                    borderRadius: '12px'
                }}
                >
                    {/* Img Troféu */}
                    <motion.main
                    variants={scaleUp}
                    initial="hidden"
                    whileInView="enter"
                    viewport={{ once: true }}
                    transition={{ type: 'linear', delay: 0.2, duration: 0.6 }}
                    >
                        <Image
                        src="image/Trofeu_PDR_OFF.png"
                        styleSheet={{
                            height: '25vh',
                            width: '25vh',
                            margin: '1.2vh auto',
                            borderRadius: '5vw'
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
                            padding: '0 0 2vh 0',
                            fontFamily: 'inherit',
                            fontSize: '3.5vh',
                            textAlign: 'center'
                        }}
                        >
                        Organize
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
                        Torneios Esportivos
                        </Text>
                    </motion.main>
                </Box>
            </motion.main>   
        </Box>

        <motion.main
        variants={box}
        initial="hidden"
        whileInView="enter"
        viewport={{ once: true }}
        transition={{ type: 'linear', duration: 0.5 }}
        >
            <hr />
        </motion.main>

        {/* Citação */}
        <Box
        styleSheet={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'inherit'
        }}
        >
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
                    height: 'auto',
                    width: '80vw',
                    margin: '15vh 0 15vh 10vw',
                    borderRadius: '12px'
                }}
                >
                    <Text
                    tag="p"
                    styleSheet={{
                        color: 'white',
                        padding: '7vh 4vw',
                        fontFamily: 'inherit',
                        fontSize: '2.5vh',
                        textAlign: 'justify',
                        textIndent: '16px'
                    }}
                    >
                    " Contemporaneamente, existe uma dificuldade em encontrar pessoas para praticar juntas um 
                    esporte. Há alguns anos, quando parávamos em uma quadra encontrávamos pessoas prontas para uma 
                    partida, mas hoje, por diversas mudanças sociais, não é mais tão simples assim, principalmente 
                    se você tem interesse em esportes além do futebol, que é o mais difundido no nosso país. Por 
                    isso, pensando em incentivar pessoas de todas as idades a se juntarem para praticar o que 
                    gostam, concebemos a ideia do projeto. "
                    </Text>
                </Box>
            </motion.main>  
        </Box>

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