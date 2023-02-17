/* NextJS imports */
import React from 'react';
import Router from 'next/router';

/* Acesso ao bd */
import { torneioCreate, torneioInVerify, insertConviteTime, selectTorneioByCod, timesInTorneio, updatePosicao, procurarTorneio, aleatorizarPosicao } from '../../lib/torneioControl';
import { procurarTime } from '../../lib/timeControl';

/* Context de Autenticação, passando informações sobre o torneio para todas as páginas */
export const TorneioContext = React.createContext({});

import { Box, Image, Text } from '@skynexui/components';


export function TorneioProvider({ children }) {
    const [torneio, setTorneio] = React.useState(null);
    const [torneiosIn, setTorneiosIn] = React.useState(null);
    const [timesIn, setTimesIn] = React.useState(null);
    const [position, setPosition] = React.useState(null);
    const [addPosition, setAddPosition] = React.useState(null);
    const [chaveamento, setChaveamento] = React.useState(null);

    async function torneioSingUp({ nomeTorneio, descTorneio, chave }, esporte, cpfUser) {
        await torneioCreate({
            nomeTorneio,
            descTorneio,
            esporte,
            chave,
            cpfUser
        });

        Router.push('/princ');
    }

    function verTorneio(codTorneioValue) {
        Router.push({
            pathname: '/verTorneio',
            query: { codTorneio: codTorneioValue},
        });
    }

    async function openOptions(posicao, codTorneio) {
        const data = await timesInTorneio(codTorneio)

        let y = -300;
        let x = -225;

        if (posicao > 4) {
            y = -160;
        }
        else {
            y = -300;
        }
        
        if (posicao > 1) {
            x = -225 + (posicao * 150) - 150
        }
        if (posicao > 4) {
            x = -225 + ((posicao - 4) * 150) - 150
        }

        const boxOptions = (
            <Box
            id="boxOptions"
            styleSheet={{
                height: '150px',
                width: '300px',
                display: 'grid',
                gridTemplateRows: '75px 75px',
                gridTemplateColumns: '75px 75px 75px 75px',
                position: 'relative',
                top: `${y}px`,
                left: `${x}px`,
                marginBottom: `-150px`,
                backgroundColor: 'black',
                opacity: '0.7',
                borderRadius: '14px',
            }}
            >
                {data?.map((data) =>
                <Box 
                styleSheet={{
                    height: '75px',
                    width: '75px',
                    padding: '15px',
                    borderRadius: '30vw',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} 
                >
                    <button
                    id="hidden"
                    onClick={function () {
                        mudarPosicao(data.equipe.cod_time, codTorneio, posicao);
                    }}
                    >
                        <Image
                        src={`../upload/times/${data.equipe.nome_img}`}
                        styleSheet={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'contain'
                        }}
                        />
                    </button>
                </Box>
                )}

            <style jsx>{`
            #hidden {
                background: black;
                border: none;
            }
            `}</style>
            </Box>
        )
            
        setAddPosition(boxOptions)
    }

    async function mudarPosicao(codTime, codTorneio, newPosicao) {
        await updatePosicao(codTime, codTorneio, newPosicao)

        gerarChaveamento(codTorneio)

        trazerTorneio(codTorneio);
    }

    async function hasTorneioIn(cpfUser) {
        const data = await torneioInVerify(cpfUser)

        const torneios = data?.map((data) =>
        <Box
        styleSheet={{
            height: 'auto',
            width: '700px',
            position: 'relative',
            margin: '15px',
            backgroundColor: 'black',
            borderRadius: '14px',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column'
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
                    {data.perfil_nome_torneio}
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
                    {data.descricao_torneio}
                </Text>

                <button
                id="verTorneio"
                value={data.cod_torneio}
                onClick={function (e) {
                    const valor = e.target.value;
                    verTorneio(valor);
                }}
                >
                    Ver torneio
                </button>
            </Box>

            <style jsx>{`
            #verTorneio {
                width: 15vw;
                height: 40px;
                margin: 25px auto;
                background-color: black;
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

            #verTorneio:hover {
                background-color: #00c2cb;
                color: black;
            } 
    
            #verTorneio:focus {
                background-color: #00a3ab;
                color: black;
                border: 4px solid #00a3ab;
            }

            #hidden {
                width: 0;
                height: 0;
                background: black;
                border: none;
            }
            `}</style>
        </Box>
    );

        setTorneiosIn(torneios);
    }

    async function convidarTorneio(value, codigoTorn) {
        const data = await insertConvite(codigoTorn, parseInt(value))

        Router.push('/torneios');
    }

    async function convidarTime(value, codTorneio) {
        const data = await insertConviteTime(parseInt(value), codTorneio)

        location.reload();
    }

    async function searchTorneio(nomeTorneio) {
        const data = await procurarTorneio(nomeTorneio);

        const listaTorneios = data.map((data) =>
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
                    {data.perfil_nome_torneio}
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
                    {data.descricao_torneio}
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
                value={data.cod_torneio}
                onClick={function (e) {
                    const valor = e.target.value;
                    verTorneio(valor);
                }}
                >
                    Ver torneio
                </button>

                <button
                id="convidar"
                value={data.cod_torneio}
                onClick={function (e) {
                    const valor = e.target.value;
                    entrarTorneio(valor, codigoTorn);
                }}
                >
                    Ingressar
                </button>
            </Box>

            <style jsx>{`
            button {
                width: 15vw;
                height: 40px;
                margin: auto;
                background-color: inherit;
                disabled: {};
                focus: {};
                font-family: inherit;
                font-size: 18px;
                border-radius: 3px;
                transition: 0.2s;
                cursor: pointer;
            }

            #verTime {
                color: #008037;
                border: 4px solid #008037;
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

            #convidar {
                color: #ffde59;
                border: 4px solid #ffde59;
            }
    
            #convidar:hover {
                background-color: #ffde59;
                color: black;
            } 

            #convidar:focus {
                background-color: #d4b745;
                color: black;
                border: 4px solid #d4b745;
            }

            input[type='text'] {
                display: none;
            }
            `}</style>
        </Box>
        );

        return (
            listaTorneios
        )
    }

    async function searchTimesForTorneio(nomeTime, codTorneio) {
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
                overflow: 'hidden',
            }} 
            >
                <Image
                src={`../upload/times/${data.nome_img}`}
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
                    {data.perfil_nome_time}
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
                    Ver Time
                </button>

                <button
                id="convidar"
                value={data.cod_time}
                onClick={function (e) {
                    const valor = e.target.value;
                    convidarTime(valor, codTorneio);
                  }}
                >
                    Convidar
                </button>
            </Box>

            <style jsx>{`
            #verTime {
                color: #008037;
                border: 4px solid #008037;
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

            #convidar {
                color: #ffde59;
                border: 4px solid #ffde59;
            }

            #convidar:hover {
                background-color: #ffde59;
                color: black;
            } 
    
            #convidar:focus {
                background-color: #d4b745;
                color: black;
                border: 4px solid #d4b745;
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

        return (
            listaTimes
        )
    }

    async function aleatorizar(codTorneio) {
        await aleatorizarPosicao(codTorneio)

        trazerTorneio(codTorneio);
    }

    async function trazerTorneio(codTorneio) {
        let imagem1 = 'image/Soma.png';
        let imagem2 = 'image/Soma.png';
        let imagem3 = 'image/Soma.png';
        let imagem4 = 'image/Soma.png';
        let imagem5 = 'image/Soma.png';
        let imagem6 = 'image/Soma.png';
        let imagem7 = 'image/Soma.png';
        let imagem8 = 'image/Soma.png';

        const data = await selectTorneioByCod(codTorneio);

        if (data != null) {
            setTorneio(data[0]);
        }

        const dataTimes = await timesInTorneio(codTorneio)

        dataTimes?.map(function(time) {
            const posicao = time.posicao;

            if (posicao != 0) {
                switch (posicao) {
                    case 1:
                        imagem1 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                    case 2:
                        imagem2 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                    case 3:
                        imagem3 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                    case 4:
                        imagem4 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                    case 5:
                        imagem5 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                    case 6:
                        imagem6 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                    case 7:
                        imagem7 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                    case 8:
                        imagem8 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                }
            }
        })

        const torneioEncontrado = data?.map((data) =>
        <Box
        styleSheet={{
            height: 'auto',
            width: '700px',
            position: 'relative',
            margin: '0 0 15px 0',
            backgroundColor: 'black',
            borderRadius: '14px',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column'
            }}
            >
                <Box
                styleSheet={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '140px',
                }}
                >
                    <Image
                    src="image/hexagono.png"
                    styleSheet={{
                        height: '150px',
                        width: '150px',
                        position: 'absolute',
                        left:  '50px',
                        top: '0',
                    }}
                    />
                    <button
                    id="hidden"
                    onClick={function () {
                        openOptions(1, data.cod_torneio);
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
                            src={imagem1}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'absolute',
                                left:  '95px',
                                top: '45px',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                                hover: {
                                    transform: 'scale(1.2)'
                                }
                            }}
                            />
                        </Box>
                    </button>

                    <Image
                    src="image/hexagono.png"
                    styleSheet={{
                        height: '150px',
                        width: '150px',
                        position: 'absolute',
                        left:  '200px',
                        top: '0',
                    }}
                    />
                    <button
                    id="hidden"
                    onClick={function () {
                        openOptions(2, data.cod_torneio);
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
                            src={imagem2}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'absolute',
                                left:  '245px',
                                top: '45px',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                                hover: {
                                    transform: 'scale(1.2)'
                                }
                            }}
                            />
                        </Box>
                    </button>

                    <Image
                    src="image/hexagono.png"
                    styleSheet={{
                        height: '150px',
                        width: '150px',
                        position: 'absolute',
                        left:  '350px',
                        top: '0',
                    }}
                    />
                    <button
                    id="hidden"
                    onClick={function () {
                        openOptions(3, data.cod_torneio);
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
                            src={imagem3}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'absolute',
                                left:  '395px',
                                top: '45px',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                                hover: {
                                    transform: 'scale(1.2)'
                                }
                            }}
                            />
                        </Box>
                    </button>

                    <Image
                    src="image/hexagono.png"
                    styleSheet={{
                        height: '150px',
                        width: '150px',
                        position: 'absolute',
                        left:  '500px',
                        top: '0',
                    }}
                    />
                    <button
                    id="hidden"
                    onClick={function () {
                        openOptions(4, data.cod_torneio);
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
                            src={imagem4}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'absolute',
                                left:  '545px',
                                top: '45px',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                                hover: {
                                    transform: 'scale(1.2)'
                                }
                            }}
                            />
                        </Box>
                    </button>
                </Box>

                <Box
                styleSheet={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '140px',
                }}
                >
                    <Image
                    src="image/hexagono.png"
                    styleSheet={{
                        height: '150px',
                        width: '150px',
                        position: 'absolute',
                        left:  '50px',
                        top: '0',
                    }}
                    />
                    <button
                    id="hidden"
                    onClick={function () {
                        openOptions(5, data.cod_torneio);
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
                            src={imagem5}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'absolute',
                                left:  '95px',
                                top: '45px',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                                hover: {
                                    transform: 'scale(1.2)'
                                }
                            }}
                            />
                        </Box>
                    </button>

                    <Image
                    src="image/hexagono.png"
                    styleSheet={{
                        height: '150px',
                        width: '150px',
                        position: 'absolute',
                        left:  '200px',
                        top: '0',
                    }}
                    />
                    <button
                    id="hidden"
                    onClick={function () {
                        openOptions(6, data.cod_torneio);
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
                            src={imagem6}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'absolute',
                                left:  '245px',
                                top: '45px',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                                hover: {
                                    transform: 'scale(1.2)'
                                }
                            }}
                            />
                        </Box>
                    </button>

                    <Image
                    src="image/hexagono.png"
                    styleSheet={{
                        height: '150px',
                        width: '150px',
                        position: 'absolute',
                        left:  '350px',
                        top: '0',
                    }}
                    />
                    <button
                    id="hidden"
                    onClick={function () {
                        openOptions(7, data.cod_torneio);
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
                            src={imagem7}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'absolute',
                                left:  '395px',
                                top: '45px',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                                hover: {
                                    transform: 'scale(1.2)'
                                }
                            }}
                            />
                        </Box>
                    </button>

                    <Image
                    src="image/hexagono.png"
                    styleSheet={{
                        height: '150px',
                        width: '150px',
                        position: 'absolute',
                        left:  '500px',
                        top: '0',
                    }}
                    />
                    <button
                    id="hidden"
                    onClick={function () {
                        openOptions(8, data.cod_torneio);
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
                            src={imagem8}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'absolute',
                                left:  '545px',
                                top: '45px',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                                hover: {
                                    transform: 'scale(1.2)'
                                }
                            }}
                            />
                        </Box>
                    </button>
                </Box>
            </Box>

            <Box
            id="butoesTorneio"
            styleSheet={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
                <button
                id="aleatorizar"
                value={data.cod_torneio}
                onClick={function (e) {
                    const valor = e.target.value;
                    aleatorizar(valor);
                  }}
                >
                    Aleatorizar
                </button>

                <button
                id="chaveamento"
                value={data.cod_time}
                onClick={function (e) {
                    const valor = e.target.value;
                    convidarTime(valor, codTorneio);
                  }}
                >
                    Gerar Chaveamento
                </button>
            </Box>

            <style jsx>{`
            #aleatorizar {
                width: 15vw;
                height: 40px;
                margin: 25px auto;
                background-color: black;
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

            #aleatorizar:hover {
                background-color: #008037;
                color: black;
            } 
    
            #aleatorizar:focus {
                background-color: #00662c;
                color: black;
                border: 4px solid #00662c;
            }

            #chaveamento {
                width: 15vw;
                height: 40px;
                margin: 25px auto;
                background-color: black;
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

            #chaveamento:hover {
                background-color: #ffde59;
                color: black;
            } 
    
            #chaveamento:focus {
                background-color: #d4b745;
                color: black;
                border: 4px solid #d4b745;
            }

            #hidden {
                width: 0;
                height: 0;
                background: black;
                border: none;
            }
            `}</style>
        </Box>
        );

        setPosition(torneioEncontrado);
    }

    function verTime(codTimeValue) {
        Router.push({
            pathname: '/verTime',
            query: { codTime: codTimeValue },
        });
    }

    async function hasTimeIn(codTorneio) {
        const data = await timesInTorneio(codTorneio)

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

    async function buscarNotificacoes() {

    }

    async function gerarChaveamento(codTorneio) {
        let imagem1 = 'image/Sobre_OFF.png';
        let imagem2 = 'image/Sobre_OFF.png';
        let imagem3 = 'image/Sobre_OFF.png';
        let imagem4 = 'image/Sobre_OFF.png';
        let imagem5 = 'image/Sobre_OFF.png';
        let imagem6 = 'image/Sobre_OFF.png';
        let imagem7 = 'image/Sobre_OFF.png';
        let imagem8 = 'image/Sobre_OFF.png';
        let imagem9 = 'image/Sobre_OFF.png';
        let imagem10 = 'image/Sobre_OFF.png';
        let imagem11 = 'image/Sobre_OFF.png';
        let imagem12 = 'image/Sobre_OFF.png';
        let imagem13 = 'image/Sobre_OFF.png';
        let imagem14 = 'image/Sobre_OFF.png';

        const data = await selectTorneioByCod(codTorneio);

        if (data != null) {
            setTorneio(data[0]);
        }

        const dataTimes = await timesInTorneio(codTorneio)

        dataTimes?.map(function(time) {
            const posicao = time.posicao;

            if (posicao != 0) {
                switch (posicao) {
                    case 1:
                        imagem1 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                    case 2:
                        imagem2 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                    case 3:
                        imagem3 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                    case 4:
                        imagem4 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                    case 5:
                        imagem5 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                    case 6:
                        imagem6 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                    case 7:
                        imagem7 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                    case 8:
                        imagem8 = `../upload/times/${time.equipe.nome_img}`;
                        break;
                }
            }
        })

        const torneioEncontrado = data?.map((data) =>
        <Box
        styleSheet={{
            height: 'auto',
            width: '900px',
            position: 'relative',
            margin: '0 0 15px 0',
            padding: '50px',
            backgroundColor: 'black',
            borderRadius: '14px',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
            <Text
            tag="p"
            styleSheet={{
                color: 'white',
                margin: '0 auto 40px auto',
                fontFamily: 'inherit',
                fontSize: '20px',
                textAlign: 'center',
                textIndent: '0',
            }}
            >
                {data.perfil_nome_torneio}
            </Text>

            <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column'
            }}
            >
                <Box
                styleSheet={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '140px',
                    width: '900px',
                }}
                >
                    <Box
                    styleSheet={{
                        position: 'absolute',
                        left: '0',
                        display: 'flex',
                        flexDirection: 'row',
                        height: '80px',
                        width: '210px',
                        margin: '10px 0',
                        borderRadius: '16px',
                        border: '3px solid white',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <Box 
                        styleSheet={{
                            height: '74px',
                            width: '74px',
                            overflow: 'hidden',
                            padding: '7px'
                        }} 
                        >
                            <Image
                            src={imagem1}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'relative',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                            }}
                            />
                        </Box>

                        <Text
                        tag="p"
                        styleSheet={{
                            color: 'white',
                            margin: 'auto',
                            fontFamily: 'inherit',
                            fontSize: '16px',
                            textAlign: 'center',
                            textIndent: '0',
                        }}
                        >
                            X
                        </Text>

                        <Box 
                        styleSheet={{
                            height: '74px',
                            width: '74px',
                            overflow: 'hidden',
                            padding: '7px'
                        }} 
                        >
                            <Image
                            src={imagem2}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'relative',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                            }}
                            />
                        </Box>
                    </Box>

                    <Box
                    styleSheet={{
                        position: 'absolute',
                        right: '100px',
                        display: 'flex',
                        flexDirection: 'row',
                        height: '80px',
                        width: '210px',
                        margin: '10px 0',
                        borderRadius: '16px',
                        border: '3px solid white',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <Box 
                        styleSheet={{
                            height: '74px',
                            width: '74px',
                            overflow: 'hidden',
                            padding: '7px'
                        }} 
                        >
                            <Image
                            src={imagem3}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'relative',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                            }}
                            />
                        </Box>

                        <Text
                        tag="p"
                        styleSheet={{
                            color: 'white',
                            margin: 'auto',
                            fontFamily: 'inherit',
                            fontSize: '16px',
                            textAlign: 'center',
                            textIndent: '0',
                        }}
                        >
                            X 
                        </Text>

                        <Box 
                        styleSheet={{
                            height: '94px',
                            width: '94px',
                            overflow: 'hidden',
                            padding: '17px'
                        }} 
                        >
                            <Image
                            src={imagem4}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'relative',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                            }}
                            />
                        </Box>
                    </Box>
                </Box>

                <Box
                styleSheet={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '140px',
                    width: '900px',
                }}
                >
                    <Box
                    styleSheet={{
                        position: 'absolute',
                        left: '50px',
                        display: 'flex',
                        flexDirection: 'row',
                        height: '80px',
                        width: '210px',
                        margin: '10px 0',
                        borderRadius: '16px',
                        border: '3px solid white',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <Box 
                        styleSheet={{
                            height: '74px',
                            width: '74px',
                            overflow: 'hidden',
                            padding: '7px'
                        }} 
                        >
                            <Image
                            src={imagem9}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'relative',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                            }}
                            />
                        </Box>

                        <Text
                        tag="p"
                        styleSheet={{
                            color: 'white',
                            margin: 'auto',
                            fontFamily: 'inherit',
                            fontSize: '16px',
                            textAlign: 'center',
                            textIndent: '0',
                        }}
                        >
                            X
                        </Text>

                        <Box 
                        styleSheet={{
                            height: '74px',
                            width: '74px',
                            overflow: 'hidden',
                            padding: '7px'
                        }} 
                        >
                            <Image
                            src={imagem10}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'relative',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                            }}
                            />
                        </Box>
                    </Box>

                    <Box
                    styleSheet={{
                        position: 'absolute',
                        right: '150px',
                        display: 'flex',
                        flexDirection: 'row',
                        height: '80px',
                        width: '210px',
                        margin: '10px 0',
                        borderRadius: '16px',
                        border: '3px solid white',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <Box 
                        styleSheet={{
                            height: '74px',
                            width: '74px',
                            overflow: 'hidden',
                            padding: '7px'
                        }} 
                        >
                            <Image
                            src={imagem11}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'relative',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                            }}
                            />
                        </Box>

                        <Text
                        tag="p"
                        styleSheet={{
                            color: 'white',
                            margin: 'auto',
                            fontFamily: 'inherit',
                            fontSize: '16px',
                            textAlign: 'center',
                            textIndent: '0',
                        }}
                        >
                            X 
                        </Text>

                        <Box 
                        styleSheet={{
                            height: '94px',
                            width: '94px',
                            overflow: 'hidden',
                            padding: '17px'
                        }} 
                        >
                            <Image
                            src={imagem12}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'relative',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                            }}
                            />
                        </Box>
                    </Box>

                    <Box
                    styleSheet={{
                        position: 'absolute',
                        right: '395px',
                        display: 'flex',
                        flexDirection: 'row',
                        height: '80px',
                        width: '210px',
                        margin: '10px 0',
                        borderRadius: '16px',
                        border: '3px solid white',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <Box 
                        styleSheet={{
                            height: '74px',
                            width: '74px',
                            overflow: 'hidden',
                            padding: '7px'
                        }} 
                        >
                            <Image
                            src={imagem13}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'relative',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                            }}
                            />
                        </Box>

                        <Text
                        tag="p"
                        styleSheet={{
                            color: 'white',
                            margin: 'auto',
                            fontFamily: 'inherit',
                            fontSize: '16px',
                            textAlign: 'center',
                            textIndent: '0',
                        }}
                        >
                            X 
                        </Text>

                        <Box 
                        styleSheet={{
                            height: '94px',
                            width: '94px',
                            overflow: 'hidden',
                            padding: '17px'
                        }} 
                        >
                            <Image
                            src={imagem14}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'relative',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                            }}
                            />
                        </Box>
                    </Box>
                </Box>

                <Box
                styleSheet={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '140px',
                    width: '900px'
                }}
                >
                    <Box
                    styleSheet={{
                        position: 'absolute',
                        left: '0',
                        display: 'flex',
                        flexDirection: 'row',
                        height: '80px',
                        width: '210px',
                        margin: '10px 0',
                        borderRadius: '16px',
                        border: '3px solid white',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <Box 
                        styleSheet={{
                            height: '74px',
                            width: '74px',
                            overflow: 'hidden',
                            padding: '7px'
                        }} 
                        >
                            <Image
                            src={imagem5}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'relative',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                            }}
                            />
                        </Box>

                        <Text
                        tag="p"
                        styleSheet={{
                            color: 'white',
                            margin: 'auto',
                            fontFamily: 'inherit',
                            fontSize: '16px',
                            textAlign: 'center',
                            textIndent: '0',
                        }}
                        >
                            X 
                        </Text>

                        <Box 
                        styleSheet={{
                            height: '94px',
                            width: '94px',
                            overflow: 'hidden',
                            padding: '17px'
                        }} 
                        >
                            <Image
                            src={imagem6}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'relative',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                            }}
                            />
                        </Box>
                    </Box>

                    <Box
                    styleSheet={{
                        position: 'absolute',
                        right: '100px',
                        display: 'flex',
                        flexDirection: 'row',
                        height: '80px',
                        width: '210px',
                        margin: '10px 0',
                        borderRadius: '16px',
                        border: '3px solid white',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                        <Box 
                        styleSheet={{
                            height: '74px',
                            width: '74px',
                            overflow: 'hidden',
                            padding: '7px'
                        }} 
                        >
                            <Image
                            src={imagem7}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'relative',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                            }}
                            />
                        </Box>

                        <Text
                        tag="p"
                        styleSheet={{
                            color: 'white',
                            margin: 'auto',
                            fontFamily: 'inherit',
                            fontSize: '16px',
                            textAlign: 'center',
                            textIndent: '0',
                        }}
                        >
                            X 
                        </Text>

                        <Box 
                        styleSheet={{
                            height: '94px',
                            width: '94px',
                            overflow: 'hidden',
                            padding: '17px'
                        }} 
                        >
                            <Image
                            src={imagem8}
                            styleSheet={{
                                height: '60px',
                                width: '60px',
                                position: 'relative',
                                transition: '0.3s',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '50%',
                                objectFit: 'contain',
                            }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>

            <style jsx>{`
            #verTorneio {
                width: 15vw;
                height: 40px;
                margin: 25px auto;
                background-color: black;
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

            #verTorneio:hover {
                background-color: #00c2cb;
                color: black;
            } 
    
            #verTorneio:focus {
                background-color: #00a3ab;
                color: black;
                border: 4px solid #00a3ab;
            }

            #hidden {
                width: 0;
                height: 0;
                background: black;
                border: none;
            }
            `}</style>
        </Box>
        );

        setChaveamento(torneioEncontrado);
    }

    return (
        <TorneioContext.Provider value={{ torneio, torneiosIn, timesIn, position, addPosition, chaveamento, setAddPosition, torneioSingUp , hasTorneioIn, searchTorneio, searchTimesForTorneio, trazerTorneio, hasTimeIn, buscarNotificacoes, gerarChaveamento }}>
            { children }
        </TorneioContext.Provider>
    )
}