/* NextJS imports */
import React from 'react';
import Router from 'next/router';

/* Acesso ao bd */
import { timeInRequest, timeInVerify, procurarTime, selectTimeByCod, jogadorInVerify, selectNotificacoes, MudarStatusAceitar, MudarStatusRecusar } from '../../lib/timeControl';

/* Context de Autenticação, passando informações sobre o time para todas as páginas */
export const TimeContext = React.createContext({});

import { Box, Image, Text } from '@skynexui/components';

export function TimeProvider({ children }) {
    const [time, setTime] = React.useState(null);
    const [timesIn, setTimesIn] = React.useState(null);
    const [jogadoresIn, setJogadoresIn] = React.useState(null);
    const [notificacoes, setNotificacoes] = React.useState(null);
    const inTime = !!time;

    async function timeSingUp({ escudoCad, nomeTimeCad, descCad }, cpfCad, nomeImg) {
        await timeInRequest({
            nomeTimeCad,
            descCad,
            cpfCad,
            nomeImg
        });

        location.reload()
    }

    function verTime(codTimeValue) {
        Router.push({
            pathname: '/verTime',
            query: { codTime: codTimeValue },
        });
    }

    async function hasTimeIn(cpfUser) {
        const data = await timeInVerify(cpfUser)

        const times = data?.map((data) =>
        <Box
        styleSheet={{
            height: '160px',
            width: '700px',
            display: 'flex',
            flexDirection: 'row',
            margin: '15px',
            backgroundColor: 'black',
            borderRadius: '14px',
            textAlign: 'center',
            justifyContent: 'center',
        }}
        >
            <Box 
            styleSheet={{
                height: '160px',
                width: '160px',
                padding: '15px',
                overflow: 'hidden',
            }} 
            >
                <Image
                src={`../upload/times/${data.equipe.nome_img}`}
                styleSheet={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    borderRadius: '50%',
                    objectFit: 'contain'
                }}
                />
            </Box>
            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                width: '320px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
                <Text
                tag="p"
                styleSheet={{
                    color: 'white',
                    margin: 'auto',
                    fontFamily: 'inherit',
                    fontSize: '20px',
                    textAlign: 'center',
                    textIndent: '0',
                }}
                >
                    {data.equipe.perfil_nome_time}
                </Text>
                <Text
                tag="p"
                styleSheet={{
                    color: 'white',
                    margin: 'auto',
                    fontFamily: 'inherit',
                    fontSize: '20px',
                    textAlign: 'center',
                    textIndent: '0',
                }}
                >
                    {data.equipe.descricao_time}
                </Text>
            </Box>

            <button
            value={data.equipe.cod_time}
            onClick={function (e) {
                const valor = e.target.value;
                verTime(valor);
              }}
            >
                Ver time
            </button>

            <style jsx>{`
            button {
                width: 140px;
                height: 40px;
                margin: 60px 40px;
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
    
            button:hover {
                background-color: #00c2cb;
                color: black;
            } 
    
            button:focus {
                background-color: #00a3ab;
                color: black;
                border: 4px solid #00a3ab;
            }
            `}</style>
        </Box>
        );

        setTimesIn(times);
    }

    async function searchTime(nomeTime) {
        const data = await procurarTime(nomeTime);

        const listaTimes = data.map((data) =>
        <Box
        styleSheet={{
            height: '160px',
            width: '700px',
            display: 'flex',
            flexDirection: 'row',
            margin: '15px',
            backgroundColor: 'black',
            borderRadius: '14px',
            textAlign: 'center',
            justifyContent: 'center',
        }}
        >
            <Box 
            styleSheet={{
                height: '160px',
                width: '160px',
                padding: '15px',
                borderRadius: '30vw',
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center'
            }} 
            >
                <Image
                src={`../upload/times/${data.nome_img}`}
                styleSheet={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain'
                }}
                />
            </Box>
            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                width: '320px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
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
                    {data.perfil_nome_time}
                </Text>
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
                    {data.descricao_time}
                </Text>
            </Box>

            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                width: '320px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
                <button
                id="verTime"
                value={data.cod_time}
                onClick={function (e) {
                    const valor = e.target.value;
                    verTime(valor);
                  }}
                >
                    Ver time
                </button>
                {/*<BotaoVazado 
                link="cadastro"
                corPrincipal="#ffde59"
                corSecundaria="#d4b745"
                margin="auto"
                >
                    Solicitar ingresso
                </BotaoVazado>*/}
            </Box>

            <style jsx>{`
            #verTime {
                width: 140px;
                height: 40px;
                margin: 60px 40px;
                background-color: inherit;
                color: #008037;
                disabled: {};
                focus: {};
                font-family: inherit;
                font-size: 18px;
                border: 4px solid #008037;
                border-radius: 3px;
                transition: 0.2s;
                cursor: pointer;
            }
    
            #verTime:hover {
                background-color: #008037;
                color: black;
            } 
    
            #verTime:focus {
                background-color: #00662c;
                color: black;
                border: 4px solid #00662c;
            }
            `}</style>
        </Box>);

        return(
            listaTimes
        )
    }

    async function trazerTime(codTime, cpfUser) {
        const data = await selectTimeByCod(codTime, cpfUser);

        if (data != null) {
            setTime(data[0]);
        }
    }

    async function hasJogadorIn(codTime) {
        const data = await jogadorInVerify(codTime)

        const jogadores = data.map((data) =>
        <Box
        styleSheet={{
            height: '160px',
            width: '700px',
            display: 'flex',
            flexDirection: 'row',
            margin: '15px',
            backgroundColor: 'black',
            borderRadius: '14px',
            textAlign: 'center',
            justifyContent: 'center',
        }}
        >
            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                width: '320px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
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
                    {data.usuario.nome}
                </Text>
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
                    {data.usuario.perfil_nome_usuario}
                </Text>
            </Box>

            <button
            value={data.nome}
            onClick={function (e) {
                const valor = e.target.value;
                verTime(valor);
              }}
            >
                Ver jogador
            </button>

            <style jsx>{`
            button {
                width: 15vw;
                height: 40px;
                margin: auto 25px;
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
    
            button:hover {
                background-color: #00c2cb;
                color: black;
            } 
    
            button:focus {
                background-color: #00a3ab;
                color: black;
                border: 4px solid #00a3ab;
            }
            `}</style>
        </Box>
        );

        setJogadoresIn(jogadores);
    }

    async function AceitarTorn(codTimeTorn) {
        await MudarStatusAceitar(codTimeTorn)

        location.reload()
    }

    async function RecusarTorn(codTimeTorn) {
        await MudarStatusRecusar(codTimeTorn)

        location.reload()
    }

    function verTorneio(codTorneioValue) {
        Router.push({
            pathname: '/verTorneio',
            query: { codTorneio: codTorneioValue },
        });
    }

    async function buscarNotificacoes(codTime) {
        const data = await selectNotificacoes(codTime)

        const notfEncontradas = data?.map((data) =>
        <Box
        styleSheet={{
            height: '160px',
            width: '700px',
            display: 'flex',
            flexDirection: 'row',
            margin: '15px',
            backgroundColor: 'black',
            borderRadius: '14px',
            textAlign: 'center',
            justifyContent: 'center',
        }}
        >
            <Image
            src={`image/Msg_${data.tipo_esporte}.png`}
            styleSheet={{
                height: '160px',
                width: '160px',
                pading: '15px',
            }}
            />
            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                width: '320px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
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
                    {data.torneio.nome_torneio}
                </Text>
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
                    {data.torneio.descricao_torneio}
                </Text>
            </Box>

            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                width: '320px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
                <button
                id="aceitar"
                value={data.cod_time_torneio}
                onClick={function (e) {
                    const valor = e.target.value;
                    AceitarTorn(valor);
                  }}
                >
                    Aceitar
                </button>

                <button
                id="recusar"
                value={data.cod_time_torneio}
                onClick={function (e) {
                    const valor = e.target.value;
                    RecusarTorn(valor);
                  }}
                >
                    Recusar
                </button>

                <button
                id="verTorneio"
                value={data.torneio.cod_torneio}
                onClick={function (e) {
                    const valor = e.target.value;
                    verTorneio(valor);
                  }}
                >
                    Ver torneio
                </button>

            </Box>

            <style jsx>{`
            #aceitar {
                color: #008037;
                border: 4px solid #008037;
            }

            #aceitar:hover {
                background-color: #008037;
                color: black;
            } 
    
            #aceitar:focus {
                background-color: #00662c;
                color: black;
                border: 4px solid #00662c;
            }

            #recusar {
                color: #ffde59;
                border: 4px solid #ffde59;
            }

            #recusar:hover {
                background-color: #ffde59;
                color: black;
            } 
    
            #recusar:focus {
                background-color: #d4b745;
                color: black;
                border: 4px solid #d4b745;
            }

            #verTorneio {
                color: #00c2cb;
                border: 4px solid #00c2cb;
            }

            #verTorneio:hover {
                background-color: #00c2cb;
                color: black;
            } 
    
            #verTorneio:focus {
                background-color: #00a3ab;
                color: black;
                border: 4px solid #00a3ab;
            }

            button {
                width: 15vw;
                height: 40px;
                margin: auto 25px;
                background-color: inherit;
                disabled: {};
                focus: {};
                font-family: inherit;
                font-size: 18px;
                border-radius: 3px;
                transition: 0.2s;
                cursor: pointer;
            }
            `}</style>
        </Box>
        );

        setNotificacoes(notfEncontradas);
    }

    return (
        <TimeContext.Provider value={{ timeSingUp, hasTimeIn, searchTime, trazerTime, hasJogadorIn, buscarNotificacoes, inTime, time, timesIn, jogadoresIn, notificacoes }}>
            { children }
        </TimeContext.Provider>
    )
}