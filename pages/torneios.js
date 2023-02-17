/* NextJS imports */
import React from 'react';

import { AuthContext } from './context/AuthContext';
import { TorneioContext } from './context/TorneioContext';

import { motion } from "framer-motion";

import { useForm } from 'react-hook-form';

/* Components imports */
import Bundle from '../components/bundle.js';

/* Skynexui imports */
import { Box, Image, Text, TextField } from '@skynexui/components';


export default function TorneioPage() {
    const { torneiosIn, timesIn, addPosition, torneioSingUp, hasTorneioIn, searchTorneio, hasTimeIn } = React.useContext(TorneioContext);
    const { user } = React.useContext(AuthContext);

    const [lista, setLista] = React.useState(null);
    const [esporte, setEsporte] = React.useState(null);

    const { register, handleSubmit } = useForm();

    const scaleUp = {
        hidden: { opacity: 0, scale: 0.5 },
        enter: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.5 },
    };

    function handleCadastro(data) {
        torneioSingUp(data, esporte, user?.cpf_usuario);
    }

    function CadTimes() {
        document.getElementById('timesoff').style.display = 'none';
        document.getElementById('timeson').style.display = 'block';
        document.getElementById('torneiosoff').style.display = 'block';
        document.getElementById('torneioson').style.display = 'none';
        document.getElementById('partidasoff').style.display = 'block';
        document.getElementById('partidason').style.display = 'none';
        document.getElementById('addTimes').style.display = 'flex';
        document.getElementById('telaTorneios').style.display = 'none';
        document.getElementById('telaPartidas').style.display = 'none';
    }


    function Torneios() {
        document.getElementById('timesoff').style.display = 'block';
        document.getElementById('timeson').style.display = 'none';
        document.getElementById('torneiosoff').style.display = 'none';
        document.getElementById('torneioson').style.display = 'block';
        document.getElementById('partidasoff').style.display = 'block';
        document.getElementById('partidason').style.display = 'none';
        document.getElementById('addTimes').style.display = 'none';
        document.getElementById('telaTorneios').style.display = 'flex';
        document.getElementById('telaPartidas').style.display = 'none';
    }

    function Partidas() {
        document.getElementById('timesoff').style.display = 'block';
        document.getElementById('timeson').style.display = 'none';
        document.getElementById('torneiosoff').style.display = 'block';
        document.getElementById('torneioson').style.display = 'none';
        document.getElementById('partidasoff').style.display = 'none';
        document.getElementById('partidason').style.display = 'block';
        document.getElementById('addTimes').style.display = 'none';
        document.getElementById('telaTorneios').style.display = 'none';
        document.getElementById('telaPartidas').style.display = 'flex';
    }

    function Futebol() {
        document.getElementById('futebolOff').style.display = 'none';
        document.getElementById('futebolOn').style.display = 'block';
        document.getElementById('voleiOff').style.display = 'block';
        document.getElementById('voleiOn').style.display = 'none';
        document.getElementById('basqueteOff').style.display = 'block';
        document.getElementById('basqueteOn').style.display = 'none';

        setEsporte("Futebol");
    }

    function Volei() {
        document.getElementById('futebolOff').style.display = 'block';
        document.getElementById('futebolOn').style.display = 'none';
        document.getElementById('voleiOff').style.display = 'none';
        document.getElementById('voleiOn').style.display = 'block';
        document.getElementById('basqueteOff').style.display = 'block';
        document.getElementById('basqueteOn').style.display = 'none';

        setEsporte("Volei");
    }

    function Basquete() {
        document.getElementById('futebolOff').style.display = 'block';
        document.getElementById('futebolOn').style.display = 'none';
        document.getElementById('voleiOff').style.display = 'block';
        document.getElementById('voleiOn').style.display = 'none';
        document.getElementById('basqueteOff').style.display = 'none';
        document.getElementById('basqueteOn').style.display = 'block';

        setEsporte("Basquete");
    }


    React.useEffect(() => {
        Futebol();
    }, []);

    React.useEffect(() => {
        hasTorneioIn(user?.cpf_usuario);
    }, [user]);

    async function ProcuraTorneio(valor) {
        if(valor != '') {
            setLista(await searchTorneio(valor));
        }
        else {
            setLista(null);
        }
    }

    return(
        <>
        <Bundle>

        <Box
        id="addTimes"
        styleSheet={{
            height: 'auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
            {torneiosIn}

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
                id="formTorneio"
                styleSheet={{
                    height: '445px',
                    width: '700px',
                    position: 'relative',
                    margin: '0',
                    backgroundColor: 'black',
                    borderRadius: '14px',
                }}
                >
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
                        Nome do torneio:
                        </Text>
                    
                        <p id="nome"></p>
                    </Box>
                
                    <input 
                    {... register('nomeTorneio')}
                    id="nomeTorneio"
                    name="nomeTorneio"
                    type="text"
                    placeholder="Nome do torneio"
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
                    {... register('descTorneio')}
                    id="descTorneio"
                    name="descTorneio"
                    type="text"
                    placeholder="Escreva uma descrição para seu torneio que ajude a entender mais sobre ele."
                    rows="4"
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
                            margin: '25px 50px 20px 70px',
                        }}
                        >
                        Esporte:
                        </Text>
                    
                        <Image 
                        id='futebolOff'
                        src='image/Fut_OFF.png'
                        styleSheet={{
                            weight: '35px',
                            height: '35px',
                            display: 'block',
                            margin: '18px 10px 18px 0',
                            opacity: '0.6',
                            transition: '0.3s',
                            hover: {
                                opacity: '1'
                            }
                        }}
                        onClick={Futebol}
                        />
                        <Image 
                        id='futebolOn'
                        src='image/Fut_ON.png'
                        styleSheet={{
                            weight: '35px',
                            height: '35px',
                            display: 'none',
                            margin: '18px 10px 18px 0',
                        }}
                        />

                        <Image 
                        id='voleiOff'
                        src='image/Volei_OFF.png'
                        styleSheet={{
                            weight: '35px',
                            height: '35px',
                            display: 'block',
                            margin: '18px 10px',
                            opacity: '0.6',
                            transition: '0.3s',
                            hover: {
                                opacity: '1'
                            }
                        }}
                        onClick={Volei}
                        />
                        <Image 
                        id='voleiOn'
                        src='image/Volei_ON.png'
                        styleSheet={{
                            weight: '35px',
                            height: '35px',
                            display: 'none',
                            margin: '18px 10px',
                        }}
                        />

                        <Image 
                        id='basqueteOff'
                        src='image/Basquete_OFF.png'
                        styleSheet={{
                            weight: '35px',
                            height: '35px',
                            display: 'block',
                            margin: '18px 10px',
                            opacity: '0.6',
                            transition: '0.3s',
                            hover: {
                                opacity: '1'
                            }
                        }}
                        onClick={Basquete}
                        />
                        <Image 
                        id='basqueteOn'
                        src='image/Basquete_ON.png'
                        styleSheet={{
                            weight: '35px',
                            height: '35px',
                            display: 'none',
                            margin: '18px 10px',
                        }}
                        />

                        <select 
                            {... register('chave')}
                            name="chave" 
                            id="chave"
                            required
                        >
                            <option value="Eliminatória">Eliminatória</option>
                        </select>
                    </Box>
                
                    <input 
                        id="cadastreTorneio"
                        name="cadastreTorneio"
                        type="submit"
                        value="Cadastre seu torneio"
                    />
                </Box>
                </motion.main>
            </form>

            <Box
            id="ProcuraTorneio"
            styleSheet={{
                margin: '20px',
                display: 'flex',
                flexDirection: 'row',
            }}
            >
                <Text
                tag="p"
                styleSheet={{
                    width: '380px',
                    color: 'white',
                    margin: '4px 20px 20px 20px',
                    fontFamily: 'inherit',
                    fontSize: '20px',
                    textAlign: 'center',
                    textIndent: '0',
                }}
                >
                    Procure torneios: 
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
                    onChange={function (e) {
                      const valor = e.target.value;
                      ProcuraTorneio(valor);
                    }}
                />
            </Box>

            <Box
            id="timesEncontrados"
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
            }}
            >
                {lista}
            </Box>
        </Box>

        <Box
        id="telaTorneios"
        styleSheet={{
            height: 'auto',
            width: '100%',
            display: 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
            torneio
        </Box>

        <Box
        id="telaPartidas"
        styleSheet={{
            height: 'auto',
            width: '100%',
            display: 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
            pertidas
        </Box>
        
        </Bundle>

        <style jsx>{`
        button#buttonAddTime {
            position:relative;
            transition: 0.6s;
            background-color: #008037;
            height: 150px;
            width: 350px;
            border: none;
            border-radius: 14px;
            z-index: 0;
        }

        button#buttonAddTime:hover {
            cursor: pointer;
            transform: translateY(-14px);
        }

        button#buttonAddTime:focus {
            background-color: #00662c;
            transform: translateY(-14px);
            outline: 0;
        }

        button#buttonTorneio {
            position:relative;
            transition: 0.6s;
            background-color: #ffde59;
            height: 150px;
            width: 350px;
            border: none;
            border-radius: 14px;
            z-index: 0;
        }

        button#buttonTorneio:hover {
            cursor: pointer;
            transform: translateY(-14px);
        }

        button#buttonTorneio:focus {
            background-color: #d4b745;
            transform: translateY(-14px);
            outline: 0;
        }

        button#buttonPartida {
            position:relative;
            transition: 0.6s;
            background-color: #00c2cb;
            height: 150px;
            width: 350px;
            border: none;
            border-radius: 14px;
            z-index: 0;
        }

        button#buttonPartida:hover {
            cursor: pointer;
            transform: translateY(-14px);
        }

        button#buttonPartida:focus {
            background-color: #00a3ab;
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
            margin: 3% 70px 5 % 70px;
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

        select {
            height: 34px;
            width: 300px;
            border: 0;
            resize: none;
            border-radius: 5px;
            padding: 6px 8px;
            margin-top: 18px;
            margin-left: 35px;
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

        form {
            position: relative;
            margin: 15px 0 0 0;
        }

        #slide {
            position: relative;
            margin: 0 0 20px 0;
            list-style: none;
            display: grid;
            grid-auto-flow: column;
            grid-auto-columns: 1fr;
            justify-content: center;
            align-items: center;
            transition: 0.6s;
        }

        #item-slide {
            width: 900px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
        `}</style>
        </>
    )
}