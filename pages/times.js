/* NextJS imports */
import React from 'react';

import { TimeContext } from './context/TimeContext';
import { AuthContext } from './context/AuthContext';

import { motion } from "framer-motion";

import { useForm } from 'react-hook-form';

import InputMask from 'react-input-mask';

/* Skynexui imports */
import { Box, Image, Text, TextField } from '@skynexui/components';

/* Components imports */
import Bundle from '../components/bundle.js';


export default function TimePage() {
    const scaleUp = {
        hidden: { opacity: 0, scale: 0.5 },
        enter: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.5 },
    };

    const { register, handleSubmit } = useForm();

    const { timesIn, inTime, timeSingUp, hasTimeIn, searchTime } = React.useContext(TimeContext);
    const { user } = React.useContext(AuthContext);

    const [texto, setTexto] = React.useState('');
    const [lista, setLista] = React.useState('');

    async function handleCadastro(data) {
        const fd = new FormData();
        fd.append('myfile', data.escudoCad[0]);

        await fetch(`http://localhost:3000/api/uploadTime`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: fd,
        })
        .then(response => {
            response.json().then(data => ({
                data: data,
                status: response.status
            })
        ).then(res => {
            timeSingUp(data, user?.cpf_usuario, res.data);
        })})
        .catch((err) => {
            if(err.response) {
                console.log(err.response)
            }
            else {
                console.log("Erro, tente mais tarde.")
            }
        })
    }

    function PagTimes() {
        document.getElementById('cadTime').style.display = 'none';
        document.getElementById('times').style.display = 'flex';
        document.getElementById('timesoff').style.display = 'none';
        document.getElementById('timeson').style.display = 'block';
        document.getElementById('cadtimeoff').style.display = 'block';
        document.getElementById('cadtimeon').style.display = 'none';
    }


    function CadTimes() {
        document.getElementById('cadTime').style.display = 'flex';
        document.getElementById('times').style.display = 'none';
        document.getElementById('timesoff').style.display = 'block';
        document.getElementById('timeson').style.display = 'none';
        document.getElementById('cadtimeoff').style.display = 'none';
        document.getElementById('cadtimeon').style.display = 'block';
    }

    async function ProcuraTime(valor) {
        if(valor != '') {
            setLista(await searchTime(valor));
        }
        else {
            setLista(null);
        }
    }

    const buttonTimes = React.useRef(null);
    const buttonCadTimes = React.useRef(null);

    React.useEffect(() => {
        if (buttonTimes.current) {
            buttonTimes.current.focus();
        }
    }, []);

    React.useEffect(() => {
        mudarTexto();
    }, [timesIn]);

    async function mudarTexto() {
        await hasTimeIn(user?.cpf_usuario);

        if (timesIn == undefined) {
            setTexto('Você ainda não está em nenhum time, Crie um agora ou');
        }
        else {
            setTexto('');
        }
    }

    return(
        <>
        <Bundle>
        <Box
        styleSheet={{
            height: 'auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >

            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'row',
                height: '150px',
                transform: 'translateY(-28px)',
            }}
            >
                <button
                    id='buttonTime'
                    type='button'
                    ref={buttonTimes}
                    onClick={PagTimes}
                >
                    <Image 
                    id='timesoff'
                    src='image/Time_OFF_Black.png'
                    styleSheet={{
                        display: 'none',
                        height: '130px',
                        transform: 'translateY(14px)',
                        margin: '15px auto'
                    }}
                    />

                    <Image 
                    id='timeson'
                    src='image/Time_ON_Black.png'
                    styleSheet={{
                        display: 'block',
                        height: '130px',
                        transform: 'translateY(14px)',
                        margin: '15px auto'
                    }}
                    />
                </button>

                <button
                    id='buttonCadTime'
                    type="button"
                    ref={buttonCadTimes}
                    onClick={CadTimes}
                >
                    <Image 
                    id='cadtimeoff'
                    src='image/Time_Cad_OFF_Black.png'
                    styleSheet={{
                        display: 'block',
                        height: '130px',
                        transform: 'translateY(14px)',
                        margin: '15px auto'
                    }}
                    />

                    <Image 
                    id='cadtimeon'
                    src='image/Time_Cad_ON_Black.png'
                    styleSheet={{
                        display: 'none',
                        height: '130px',
                        transform: 'translateY(14px)',
                        margin: '15px auto'
                    }}
                    />
                </button>
            </Box>

        <Box
        id="times"
        styleSheet={{
            height: 'auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
            {timesIn}
            <Text
            tag="p"
            styleSheet={{
                color: 'white',
                margin: '20px auto',
                fontFamily: 'inherit',
                fontSize: '20px',
                textAlign: 'center',
                textIndent: '0',
            }}
            >
                {texto}
            </Text>

            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'row',
            }}
            >
                <Text
                tag="p"
                styleSheet={{
                    width: '380px',
                    color: 'white',
                    margin: '0px 20px 20px 20px',
                    fontFamily: 'inherit',
                    fontSize: '20px',
                    textAlign: 'center',
                    textIndent: '0',
                }}
                >
                    Procure times: 
                </Text>

                <TextField
                    styleSheet={{
                        height: '34px',
                        width: '80%',
                        border: '0',
                        resize: 'none',
                        borderRadius: '5px',
                        padding: '6px 8px',
                        margin: '0px 70px 20px 70px',
                        fontSize: '18px',
                        fontFamily: 'inherit',
                    }}
                    onChange={function (event) {
                      const valor = event.target.value;
                      ProcuraTime(valor);
                    }}
                />
            </Box>

            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
            }}
            >
                {lista}
            </Box>
        </Box>

        <Box
        id="cadTime"
        styleSheet={{
            display: 'none',
            height: 'auto',
            width: '100%',
            margin: '15px',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
            {/* Form de Cadastro de Times */}
            <form onSubmit={handleSubmit(handleCadastro)}>
            <motion.main
            variants={scaleUp}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ type: 'linear', delay: 0.2, duration: 0.6 }}
            >
                <Box
                styleSheet={{
                    height: '453px',
                    width: '700px',
                    position: 'relative',
                    margin: '0 0 10px 0',
                    backgroundColor: 'black',
                    borderRadius: '14px',
                }}
                >
                    <Box
                    styleSheet={{
                        margin: '0 10% 0 10%',
                        display: 'flex',
                        flexDirection: 'row',
                        width: '80%',
                    }}
                    >
                        <Text
                        tag="p"
                        styleSheet={{
                            color: 'white',
                            fontFamily: 'inherit',
                            fontSize: '16px',
                            margin: '25px 0 0 0',
                            width: '130px',
                        }}
                        >
                            Escudo do time:
                        </Text>
                        <input 
                            {... register('escudoCad')}
                            id="escudoCad"
                            name="escudoCad"
                            type="file"
                            required
                        />
                    </Box>
                    <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                    >
                        <Text
                        tag="p"
                        styleSheet={{
                            color: 'white',
                            fontFamily: 'inherit',
                            fontSize: '16px',
                            margin: '25px 70px'
                        }}
                        >
                        Nome do time:
                        </Text>

                        <p id="nometime"></p>
                    </Box>

                    <input 
                        {... register('nomeTimeCad')}
                        id="nomeTimeCad"
                        name="nomeTimeCad"
                        type="text"
                        placeholder="Nome do time"
                        required
                    />   

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
                            margin: '25px 70px'
                        }}
                        >
                        Descrição:
                        </Text>

                        <p id="desc"></p>
                    </Box>

                    <textarea 
                        {... register('descCad')}
                        id="descCad"
                        name="descCad"
                        type="text"
                        placeholder="Escreva uma descrição para seu time que chame atenção."
                        rows="4"
                        required
                    />     

                    <input 
                        id="cadastreTime"
                        name="cadastreTime"
                        type="submit"
                        value="Cadastre seu time"
                    />
                </Box>
                </motion.main>
            </form>

            </Box>
        </Box>
        
        </Bundle>

        <style jsx>{`
        button#buttonTime {
            position:relative;
            transition: 0.6s;
            background-color: #008037;
            height: 150px;
            width: 350px;
            border: none;
            border-radius: 14px;
            z-index: 0;
        }

        button#buttonTime:hover {
            cursor: pointer;
            transform: translateY(-14px);
        }

        button#buttonTime:focus {
            background-color: #00662c;
            transform: translateY(-14px);
            outline: 0;
        }

        button#buttonCadTime {
            position:relative;
            transition: 0.6s;
            background-color: #ffde59;
            height: 150px;
            width: 350px;
            border: none;
            border-radius: 14px;
            z-index: 0;
        }

        button#buttonCadTime:hover {
            cursor: pointer;
            transform: translateY(-14px);
        }

        button#buttonCadTime:focus {
            background-color: #d4b745;
            transform: translateY(-14px);
            outline: 0;
        }

        input[type='text'] {
            height: 34px;
            width: 80%;
            border: 0;
            resize: none;
            border-radius: 5px;
            padding: 6px 8px;
            margin-left: 70px;
            margin-right: 70px;
            font-size: 18px;
            font-family: inherit;
        }

        input[type='file'] {
            height: 34px;
            width: auto;
            border: 0;
            resize: none;
            margin: 23px 0 8px 25px;
            color: white;
            font-size: 18px;
            font-family: inherit;
        }

        input[type='submit'] {
            width: 15vw;
            height: 40px;
            margin: 5% 70px;
            background-color: inherit;
            color: #00c2cb;
            disabled: {};
            focus: {};
            font-family: inherit;
            font-size: 18px;
            border: 4px solid #00c2cb;
            border-radius: 3px;
            transition: 0.2s;
            cursor: pointer;
        }

        input[type='submit']:hover {
            background-color: #00c2cb;
            color: black;
        } 

        input[type='submit']:focus {
            background-color: #00a3ab;
            color: black;
            border: 4px solid #00a3ab;
        }

        textarea {
            height: 102px;
            width: 80%;
            border: 0;
            resize: none;
            border-radius: 5px;
            padding: 6px 8px;
            margin-left: 70px;
            margin-right: 70px;
            font-size: 18px;
            font-family: inherit;
        }

        p {
            color: white;
            margin: 0;
            font-size: 16px;
            padding: 0;
        }
        `}</style>
        </>
    )
}