import React from 'react';
import { useRouter } from 'next/router';

import { TimeContext } from './context/TimeContext';
import { AuthContext } from './context/AuthContext';

/* Skynexui imports */
import { Box, Image, Text } from '@skynexui/components';

/* Components imports */
import Bundle from '../components/bundle.js';

export default function verTimePage() {
    const { time, inTime, searchTime, trazerTime, hasJogadorIn, jogadoresIn, buscarNotificacoes, notificacoes } = React.useContext(TimeContext);
    const { user } = React.useContext(AuthContext);

    const router = useRouter()

    React.useEffect(() => {
        if (router.query.codTime != undefined) {
            trazerTime(router.query.codTime, user.cpf_usuario);
            hasJogadorIn(router.query.codTime);
            buscarNotificacoes(router.query.codTime);
        }
    }, [router])

    const buttonJogadores = React.useRef(null);
    const buttonCalendario = React.useRef(null);
    const buttonNotificacoes = React.useRef(null);

    React.useEffect(() => {
        if (buttonJogadores.current) {
            buttonJogadores.current.focus();
        }
    }, [])

    React.useEffect(() => {
        if (time != null) {
            if (time.funcao_usuario != 'A') {
                document.getElementById('buttonNotificacoes').style.display = 'none';
            }
        }
    }, [time])

    function pagJogadores() {
        document.getElementById('jogadoresoff').style.display = 'none';
        document.getElementById('jogadoreson').style.display = 'block';
        document.getElementById('calendariooff').style.display = 'block';
        document.getElementById('calendarioon').style.display = 'none';
        document.getElementById('torneiosoff').style.display = 'block';
        document.getElementById('torneioson').style.display = 'none';
        document.getElementById('pagJogadores').style.display = 'flex';
        document.getElementById('pagCalendario').style.display = 'none';
        document.getElementById('pagNotificacoes').style.display = 'none';
    }

    function pagCalendario() {
        document.getElementById('jogadoresoff').style.display = 'block';
        document.getElementById('jogadoreson').style.display = 'none';
        document.getElementById('calendariooff').style.display = 'none';
        document.getElementById('calendarioon').style.display = 'block';
        document.getElementById('torneiosoff').style.display = 'block';
        document.getElementById('torneioson').style.display = 'none';
        document.getElementById('pagJogadores').style.display = 'none';
        document.getElementById('pagCalendario').style.display = 'flex';
        document.getElementById('pagNotificacoes').style.display = 'none';
    }

    function pagNotificacoes() {
        document.getElementById('jogadoresoff').style.display = 'block';
        document.getElementById('jogadoreson').style.display = 'none';
        document.getElementById('calendariooff').style.display = 'block';
        document.getElementById('calendarioon').style.display = 'none';
        document.getElementById('torneiosoff').style.display = 'none';
        document.getElementById('torneioson').style.display = 'block';
        document.getElementById('pagJogadores').style.display = 'none';
        document.getElementById('pagCalendario').style.display = 'none';
        document.getElementById('pagNotificacoes').style.display = 'flex';
    }

    return(
        <>
        <Bundle>

        <Box
        styleSheet={{
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'row'
        }}
        >
            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                height: '120vh',
                width: '30vw',
                backgroundColor: 'black',
            }}
            >
                {/* Foto do time */}
                <Box 
                styleSheet={{
                    height: '25vh',
                    width: '25vh',
                    margin: '50px auto 10px auto',
                    borderRadius: '30vw',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} 
                >
                    <Image
                    src={`../../upload/times/${time?.equipe.nome_img}`}
                    styleSheet={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'contain'
                    }}
                    />
                </Box>

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
                {time?.equipe.perfil_nome_time}
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
                {time?.equipe.descricao_time}
                </Text>
            </Box>

            <Box
            styleSheet={{
                height: '100vh',
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
                        id='buttonJogadores'
                        type='button'
                        ref={buttonJogadores}
                        onClick={pagJogadores}
                    >
                        <Image 
                        id='jogadoresoff'
                        src='image/Time_OFF_Black.png'
                        styleSheet={{
                            display: 'none',
                            height: '130px',
                            transform: 'translateY(14px)',
                            margin: '15px auto'
                        }}
                        />

                        <Image 
                        id='jogadoreson'
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
                        id='buttonCalendario'
                        type="button"
                        ref={buttonCalendario}
                        onClick={pagCalendario}
                    >
                        <Image 
                        id='calendariooff'
                        src='image/Calendario_OFF.png'
                        styleSheet={{
                            display: 'block',
                            height: '130px',
                            transform: 'translateY(14px)',
                            margin: '15px auto'
                        }}
                        />

                        <Image 
                        id='calendarioon'
                        src='image/Calendario_ON.png'
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
                        id='torneiosoff'
                        src='image/Time_Cad_OFF_Black.png'
                        styleSheet={{
                            display: 'block',
                            height: '130px',
                            transform: 'translateY(14px)',
                            margin: '15px auto'
                        }}
                        />

                        <Image 
                        id='torneioson'
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
                id="pagJogadores"
                styleSheet={{
                    height: 'auto',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                    {jogadoresIn}
                </Box>

                <Box
                id="pagCalendario"
                styleSheet={{
                    height: 'auto',
                    width: '100%',
                    display: 'none',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >

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
                    {notificacoes}
                </Box>
            </Box>
        </Box>

        </Bundle>

        <style jsx>{`
        button#buttonJogadores {
            position:relative;
            transition: 0.6s;
            background-color: #008037;
            height: 150px;
            width: 350px;
            border: none;
            border-radius: 14px;
            z-index: 0;
        }

        button#buttonJogadores:hover {
            cursor: pointer;
            transform: translateY(-14px);
        }

        button#buttonJogadores:focus {
            background-color: #00662c;
            transform: translateY(-14px);
            outline: 0;
        }

        button#buttonCalendario {
            position:relative;
            transition: 0.6s;
            background-color: #ffde59;
            height: 150px;
            width: 350px;
            border: none;
            border-radius: 14px;
            z-index: 0;
        }

        button#buttonCalendario:hover {
            cursor: pointer;
            transform: translateY(-14px);
        }

        button#buttonCalendario:focus {
            background-color: #d4b745;
            transform: translateY(-14px);
            outline: 0;
        }

        button#buttonNotificacoes {
            position: relative;
            transition: 0.6s;
            background-color: #00c2cb;
            height: 150px;
            width: 350px;
            border: none;
            border-radius: 14px;
            z-index: 0;
        }

        button#buttonNotificacoes:hover {
            cursor: pointer;
            transform: translateY(-14px);
        }

        button#buttonNotificacoes:focus {
            background-color: #00a3ab;
            transform: translateY(-14px);
            outline: 0;
        }
        `}</style>
        </>
    )
}