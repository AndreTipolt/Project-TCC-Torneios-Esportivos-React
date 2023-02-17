/* NextJS imports */
import React from 'react';

/* Skynexui imports */
import { Box, Image, Text } from '@skynexui/components';

/* Components imports */
import Bundle from '../components/bundle.js';

export default function HomePage() {
    return(
        <>
        <Bundle>

        <Box
        styleSheet={{
            height: '100vh',
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
                Jogos da Semana
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
                    height: '25vh',
                    width: '25vh',
                    margin: '50px auto 0 auto',
                    borderRadius: '5vw'
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
                    height: '25vh',
                    width: '25vh',
                    margin: '50px auto 0 auto',
                    borderRadius: '5vw'
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
                    height: '25vh',
                    width: '25vh',
                    margin: '50px auto 0 auto',
                    borderRadius: '5vw'
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
                    height: '25vh',
                    width: '25vh',
                    margin: '50px auto 0 auto',
                    borderRadius: '5vw'
                }} 
                />
            </Box>
        </Box>

        </Bundle>
        </>
    );
}