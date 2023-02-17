/* NextJS imports */
import React from 'react';
import Link from 'next/link';

/* Skynexui - UI para WEB e MOBILE */
import { Box, Image, Text } from '@skynexui/components';

/* Components imports */
import Bundle from '../components/bundle.js';

/* Context de Autenticação, passando informações sobre o user para todas as páginas */
import { AuthContext } from './context/AuthContext';


export default function PerfilPage() {
    const { user, logOut } = React.useContext(AuthContext);
    const [idade, setIdade] = React.useState(null);

    const ano = new Date();
    const dataNasc = user?user.data_nascimento.split("-"):ano.getFullYear();


    React.useEffect(() => {
        if((ano.getMonth() + 1) > parseInt(dataNasc[1])) {
            setIdade(ano.getFullYear() - dataNasc[0]);
        }
        else if ((ano.getMonth() + 1) == parseInt(dataNasc[1]) && ano.getDate() >= parseInt(dataNasc[2])) {
            setIdade(ano.getFullYear() - dataNasc[0]);
        }
        else {
            setIdade(ano.getFullYear() - dataNasc[0] - 1);
        }
    }, [user])
    

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
                backgroundColor: 'black'
            }}
            >
                {/* Foto de perfil */}
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
                    src={`../upload/users/${user?.img_usuario}`}
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
                {user?.nome}
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
                {user?.email}
                </Text>

                <Text
                tag="p"
                styleSheet={{
                    color: 'white',
                    margin: '10px auto 0 auto',
                    fontFamily: 'inherit',
                    fontSize: '20px',
                    textAlign: 'center',
                    textIndent: '0'
                }}
                >
                Idade: {idade}
                {/* dataNasc[2] + '/' + dataNasc[1] + '/' + dataNasc[0] */}
                </Text>

                <Link href="/">
                <button onClick={logOut}>
                    Fazer Logout
                </button>
                </Link>
            </Box>

            <Box
            styleSheet={{
                height: '100vh',
                width: '70vw'
            }}
            >
                <Text
                tag="p"
                styleSheet={{
                    color: 'white',
                    margin: '10px auto 0 auto',
                    fontFamily: 'inherit',
                    fontSize: '20px',
                    textAlign: 'center',
                    textIndent: '0'
                }}
                >
                    partidas
                </Text>
                <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
                >
                    <Image 
                    src="image/Time_OFF.png"
                    styleSheet={{
                        height: '200px',
                        width: '200px',
                        margin: '50px auto 0 auto'
                    }} 
                    />
                    <Text
                    tag="p"
                    styleSheet={{
                        color: 'white',
                        position: 'relative',
                        fontFamily: 'inherit',
                        fontSize: '20px',
                        textAlign: 'center',
                        textIndent: '0',
                        top: '50%',
                        transform: 'translateY(50%)'
                    }}
                    >
                        X
                    </Text>
                    <Image 
                    src="image/Time_ON.png"
                    styleSheet={{
                        height: '200px',
                        width: '200px',
                        margin: '50px auto 0 auto'
                    }} 
                    />
                </Box>
                <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
                >
                    <Image 
                    src="image/Time_ON.png"
                    styleSheet={{
                        height: '200px',
                        width: '200px',
                        margin: '50px auto 0 auto'
                    }} 
                    />
                    <Text
                    tag="p"
                    styleSheet={{
                        color: 'white',
                        position: 'relative',
                        fontFamily: 'inherit',
                        fontSize: '20px',
                        textAlign: 'center',
                        textIndent: '0',
                        top: '50%',
                        transform: 'translateY(50%)'
                    }}
                    >
                        X
                    </Text>
                    <Image 
                    src="image/Time_OFF.png"
                    styleSheet={{
                        height: '200px',
                        width: '200px',
                        margin: '50px auto 0 auto'
                    }} 
                    />
                </Box>
                <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
                >
                    <Image 
                    src="image/Time_OFF.png"
                    styleSheet={{
                        height: '200px',
                        width: '200px',
                        margin: '50px auto 0 auto'
                    }} 
                    />
                    <Text
                    tag="p"
                    styleSheet={{
                        color: 'white',
                        position: 'relative',
                        fontFamily: 'inherit',
                        fontSize: '20px',
                        textAlign: 'center',
                        textIndent: '0',
                        top: '50%',
                        transform: 'translateY(50%)'
                    }}
                    >
                        X
                    </Text>
                    <Image 
                    src="image/Time_ON.png"
                    styleSheet={{
                        height: '200px',
                        width: '200px',
                        margin: '50px auto 0 auto'
                    }} 
                    />
                </Box>
            </Box>
        </Box>

        </Bundle>
        
        <style jsx>{`
        button {
            width: 15vw;
            height: 40px;
            margin: 75px auto;
            background-color: inherit;
            color: #CC1212;
            disabled: {};
            focus: {};
            font-family: inherit;
            font-size: 18px;
            text-align: center;
            border: 4px solid #CC1212;
            border-radius: 3px;
            transition: 0.5s;
            cursor: pointer;
        }
        button:hover {
            background-color: #CC1212;
            color: black;
        } 
        button:focus {
            background-color: #981212;
            color: black;
            border: 4px solid #981212;
        }
        `}</style>
        </>
    )
}