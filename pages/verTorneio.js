import React from 'react'
import { useRouter } from 'next/router';

import { TorneioContext } from './context/TorneioContext';
import { AuthContext } from './context/AuthContext';

/* Skynexui imports */
import { Box, Image, Text, TextField } from '@skynexui/components';

/* Components imports */
import Bundle from '../components/bundle.js';

export default function verTornPage() {
    const { torneio, position, addPosition, setAddPosition, chaveamento, trazerTorneio, timesIn, hasTimeIn, buscarNotificacoes, searchTimesForTorneio, gerarChaveamento } = React.useContext(TorneioContext);
    const { user } = React.useContext(AuthContext);

    const [lista, setLista] = React.useState(null);

    const router = useRouter();

    React.useEffect(() => {
        if (router.query.codTorneio != undefined) {
            trazerTorneio(router.query.codTorneio);
            hasTimeIn(router.query.codTorneio);
            gerarChaveamento(router.query.codTorneio)
            buscarNotificacoes(router.query.codTorneio);
        }
    }, [router])

    const buttonTimes = React.useRef(null);
    const buttonChaves = React.useRef(null);
    const buttonNotificacoes = React.useRef(null);

    React.useEffect(() => {
        window.addEventListener("click", function() {
            if(addPosition != null) {
                setAddPosition(null)
            }
        }, false)
    })

    React.useEffect(() => {
        if (buttonTimes.current) {
            buttonTimes.current.focus();
        }
    }, [])

    React.useEffect(() => {
        if (torneio != null) {
            if (torneio.fk_cpf_usuario != user.cpf_usuario) {
                document.getElementById('buttonNotificacoes').style.display = 'none';
            }
        }
    }, [torneio])

    React.useEffect(() => {
        if (position != null) {
            if (torneio != null) {
                if (torneio.fk_cpf_usuario != user.cpf_usuario) {
                    document.getElementById('butoesTorneio').style.display = 'none';
                }
            }
        }
    }, [position])

    function pagTimes() {
        document.getElementById('timesoff').style.display = 'none';
        document.getElementById('timeson').style.display = 'block';
        document.getElementById('torneiosoff').style.display = 'block';
        document.getElementById('torneioson').style.display = 'none';
        document.getElementById('notificacoesoff').style.display = 'block';
        document.getElementById('notificacoeson').style.display = 'none';
        document.getElementById('pagTimes').style.display = 'flex';
        document.getElementById('pagChaveamento').style.display = 'none';
        document.getElementById('pagNotificacoes').style.display = 'none';
    }

    function pagChaves() {
        document.getElementById('timesoff').style.display = 'block';
        document.getElementById('timeson').style.display = 'none';
        document.getElementById('torneiosoff').style.display = 'none';
        document.getElementById('torneioson').style.display = 'block';
        document.getElementById('notificacoesoff').style.display = 'block';
        document.getElementById('notificacoeson').style.display = 'none';
        document.getElementById('pagTimes').style.display = 'none';
        document.getElementById('pagChaveamento').style.display = 'flex';
        document.getElementById('pagNotificacoes').style.display = 'none';
    }

    function pagNotificacoes() {
        document.getElementById('timesoff').style.display = 'block';
        document.getElementById('timeson').style.display = 'none';
        document.getElementById('torneiosoff').style.display = 'block';
        document.getElementById('torneioson').style.display = 'none';
        document.getElementById('notificacoesoff').style.display = 'none';
        document.getElementById('notificacoeson').style.display = 'block';
        document.getElementById('pagTimes').style.display = 'none';
        document.getElementById('pagChaveamento').style.display = 'none';
        document.getElementById('pagNotificacoes').style.display = 'flex';
    }

    async function ProcuraTime(valor) {
        if(valor != '') {
            setLista(await searchTimesForTorneio(valor, router.query.codTorneio));
        }
        else {
            setLista(null);
        }
    }

    return(
        <>
        <Bundle>

        <Box
        styleSheet={{
            height: 'auto',
            display: 'flex',
            flexDirection: 'row'
        }}
        >
            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                width: '30vw',
                backgroundColor: 'black'
            }}
            >
                <Text
                tag="p"
                styleSheet={{
                    color: 'white',
                    margin: '10px auto 18px auto',
                    fontFamily: 'inherit',
                    fontSize: '20px',
                    textAlign: 'center',
                    textIndent: '0'
                }}
                >
                {torneio?.perfil_nome_torneio}
                </Text>

                <Text
                tag="p"
                styleSheet={{
                    color: 'white',
                    margin: '10px auto 18px auto',
                    fontFamily: 'inherit',
                    fontSize: '20px',
                    textAlign: 'center',
                    textIndent: '0'
                }}
                >
                {torneio?.descricao_torneio}
                </Text>
            </Box>

            <Box
            styleSheet={{
                height: 'auto',
                width: '70vw',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
                <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '150px',
                    transform: 'translateY(-28px)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    <button
                        id='buttonTimes'
                        type='button'
                        ref={buttonTimes}
                        onClick={pagTimes}
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
                        id='buttonChaves'
                        type="button"
                        ref={buttonChaves}
                        onClick={pagChaves}
                    >
                        <Image 
                        id='torneiosoff'
                        src='image/Trofeu_PDR_Black_OFF.png'
                        styleSheet={{
                            display: 'block',
                            height: '130px',
                            transform: 'translateY(14px)',
                            margin: '15px auto'
                        }}
                        />

                        <Image 
                        id='torneioson'
                        src='image/Trofeu_PDR_Black_ON.png'
                        styleSheet={{
                            display: 'none',
                            height: '130px',
                            transform: 'translateY(14px)',
                            margin: '15px auto'
                        }}
                        />
                    </button>

                    <button
                        id='buttonNotificacoes'
                        type="button"
                        ref={buttonNotificacoes}
                        onClick={pagNotificacoes}
                    >
                        <Image 
                        id='notificacoesoff'
                        src='image/Calendario_OFF.png'
                        styleSheet={{
                            display: 'block',
                            height: '130px',
                            transform: 'translateY(14px)',
                            margin: '15px auto'
                        }}
                        />

                        <Image 
                        id='notificacoeson'
                        src='image/Calendario_ON.png'
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
                id="pagTimes"
                styleSheet={{
                    height: 'auto',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                    {position}

                    {addPosition}

                    {timesIn}

                    <Box
                    id="ProcuraTime"
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
                                margin: '0px 70px 20px 50px',
                                fontSize: '18px',
                                fontFamily: 'inherit',
                            }}
                            onChange={function (e) {
                              const valor = e.target.value;
                              ProcuraTime(valor);
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
                id="pagChaveamento"
                styleSheet={{
                    height: 'auto',
                    width: '100%',
                    display: 'none',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                    {chaveamento}
                </Box>

                <Box
                id="pagNotificacoes"
                styleSheet={{
                    height: 'auto',
                    width: '100%',
                    display: 'none',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                    {/*notificacoes*/}
                </Box>
            </Box>
        </Box>

        </Bundle>

        <style jsx>{`
        button {
            position:relative;
            transition: 0.6s;
            
            height: 150px;
            width: 350px;
            border: none;
            border-radius: 14px;
            z-index: 0;
        }

        button:hover {
            cursor: pointer;
            transform: translateY(-14px);
        }

        button:focus {
            transform: translateY(-14px);
            outline: 0;
        }

        #buttonTimes {
            background-color: #008037;
        }

        #buttonTimes:focus {
            background-color: #00662c;
        }

        #buttonChaves {
            background-color: #ffde59;
        }

        #buttonChaves:focus {
            background-color: #d4b745;
        }

        #buttonNotificacoes {
            background-color: #00c2cb;
        }

        #buttonNotificacoes:focus {
            background-color: #00a3ab;
        }
        `}</style>
        </>
    )
}