/* NextJS imports */
import React from 'react';
import Link from 'next/link';
import Router from 'next/router'


import { useForm } from 'react-hook-form';


import { motion } from "framer-motion";

/* Skynexui imports */
import { Box, Text } from '@skynexui/components';


import { AuthContext } from './context/AuthContext';


export default function FormLogin() {
    const scaleUp = {
        hidden: { opacity: 0, scale: 0.5 },
        enter: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.5 },
    }


    const { register, handleSubmit } = useForm();
    const { erro, isAuthenticated, singIn } = React.useContext(AuthContext);


    React.useEffect(() => {
        if (isAuthenticated) {
            Router.push('/princ');
        }

        document.getElementById('user').innerText = erro;
    }, [erro])


    /* Função acionada quando o botão Login é pressionado */
    async function handleSingIn(data) {
        await singIn(data);
    }


    return (
        <>
        {/* Form de Login */}
        <Box
        styleSheet={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            /*backgroundImage: "url('image/grass.png')",*/
            backgroundPosition: 'bottom',
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat'
        }}
        >
        <motion.main
        variants={scaleUp}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: 'linear', delay: 0.2, duration: 0.6 }}
        >
        <Box
        styleSheet={{
            height: '385px',
            width: '700px',
            position: 'relative',
            margin: '0',
            backgroundColor: 'black',
            borderRadius: '14px',
        }}
        >
            <form onSubmit={handleSubmit(handleSingIn)} >
            <Box
            styleSheet={{
                margin: '0',
                display: 'flex',
                flexDirection: 'row'
            }}
            >
                <Text
                tag="p"
                styleSheet={{
                    color: 'white',
                    fontFamily: 'inherit',
                    fontSize: '16px',
                    margin: '25px 10%'
                }}
                >
                Usuário:
                </Text>

                <p id="user"></p>
            </Box>

            <input 
                {... register('usuario')}
                id="usuario"
                name="usuario"
                type="text"
                required
                placeholder="Usuário"
            />

            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >

                <Text
                tag="p"
                styleSheet={{
                    color: 'white',
                    fontFamily: 'inherit',
                    fontSize: '16px',
                    margin: '25px 10%'
                }}
                >
                Senha:
                </Text>

                <p id="pass"></p>
            </Box>

            <input 
                {... register('password')}
                id="password"
                name="password"
                type="password"
                required
                placeholder="Senha"
            />

            <input 
                id="login"
                name="login"
                type="submit"
                value="Login"
            />

            </form>

            {/* Direcionar para o Cadastro */}
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <Text
                    tag="p"
                    styleSheet={{
                        color: 'white',
                        fontFamily: 'inherit',
                        fontSize: '16px',
                        padding: '10px 10px 25px 10%'
                    }}
                >
                Ainda não possui uma conta PDR's Sports?
                </Text>

                <Link href="cadastro">
                <Text
                    tag="a"
                    styleSheet={{
                        color: '#008037',
                        textDecoration: 'underline',
                        fontFamily: 'inherit',
                        fontSize: '16px',
                        margin: '10px 0',
                        cursor: 'pointer'
                    }}
                >
                Crie aqui
                </Text>
                </Link>
            </Box>
        </Box>
        </motion.main>
        </Box>
        
                
        <style jsx>{`
        input[type='text'] {
            height: 34px;
            width: 80%;
            border: 0;
            resize: none;
            border-radius: 5px;
            padding: 6px 8px;
            margin-left: 10%;
            margin-right: 10%;
            font-size: 18px;
            font-family: inherit;
        }

        input[type='password'] {
            height: 34px;
            width: 80%;
            border: 0;
            resize: none;
            border-radius: 5px;
            padding: 6px 8px;
            margin-left: 10%;
            margin-right: 10%;
            font-size: 18px;
            font-family: inherit;
        }

        input[type='submit'] {
            width: 15vw;
            height: 40px;
            margin: 5% 10%;
            background-color: inherit;
            color: #ffde59;
            disabled: {};
            focus: {};
            font-family: inherit;
            font-size: 18px;
            border: 4px solid #ffde59;
            border-radius: 3px;
            transition: 0.2s;
            cursor: pointer;
        }

        input[type='submit']:hover {
            background-color: #ffde59;
            color: black;
        } 

        input[type='submit']:focus {
            background-color: #d4b745;
            color: black;
            border: 4px solid #d4b745;
        }

        p {
            color: white;
            margin: 25px;
            font-size: 16px;
            padding: 0;
        }
        `}</style>
        </>
    );
}