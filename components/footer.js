/* Skynexui - UI para WEB e MOBILE */
import { Box, Text, Image } from '@skynexui/components';


export default function Footer() {
    return(
        <>
        <footer>
        {/* Contato */}
        <Box
        styleSheet={{
            width: '100%',
            display: 'flex',
            'flex-direction': 'column'
        }}
        >
            <Text
            tag="p"
            styleSheet={{
                color: 'white',
                margin: '18px 0',
                fontFamily: 'inherit',
                fontSize: '16px',
                textAlign: 'center',
                textIndent: '0'
            }}
            >
            entre em contato conosco:
            </Text>
            
            <ul>
                <li>
                    {/* Whatsapp */}
                    <Image 
                    src="https://cdn-icons-png.flaticon.com/512/174/174879.png"
                    styleSheet={{
                        height: '70px',
                        margin: '0 15px 0 15px'
                    }}
                    />
                </li>
                <li>
                    {/* Gmail */}
                    <Image 
                    src="https://cdn-icons-png.flaticon.com/512/5968/5968534.png"
                    styleSheet={{
                        height: '70px',
                        margin: '0 15px 0 15px'
                    }}
                    />
                </li>
                <li>
                    {/* Facebook */}
                    <Image 
                    src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
                    styleSheet={{
                        height: '70px',
                        margin: '0 15px 0 15px'
                    }}
                    />
                </li>
            </ul>
        </Box>

        {/* Integrantes */}
        <Box
        styleSheet={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}
        >
            <Text
            styleSheet={{
                margin: '18px 15px 8px 15px',
                padding: '0',
                color: 'white',
                textIndent: '0',
                fontFamily: 'inherit'
            }}
            >
            Integrantes:
            </Text>
            <Text
            tag="p"
            styleSheet={{
                color: 'white',
                margin: '5px 15px 0 15px',
                fontFamily: 'inherit',
                fontSize: '13px',
                textIndent: '0'
            }}
            >
            André Tipolt Lopes
            </Text>
            <Text
            tag="p"
            styleSheet={{
                color: 'white',
                margin: '0 15px',
                fontFamily: 'inherit',
                fontSize: '13px',
                textIndent: '0'
            }}
            >
            Gean Ordonho Ataide
            </Text>
            <Text
            tag="p"
            styleSheet={{
                color: 'white',
                margin: '0 15px',
                fontFamily: 'inherit',
                fontSize: '13px',
                textIndent: '0'
            }}
            >
            João Pedro Castro Barboza
            </Text>
            <Text
            tag="p"
            styleSheet={{
                color: 'white',
                margin: '0 15px',
                fontFamily: 'inherit',
                fontSize: '13px',
                textIndent: '0'
            }}
            >
            Otávio Augusto Azevedo Marçal
            </Text>
            <Text
            tag="p"
            styleSheet={{
                color: 'white',
                margin: '0 15px',
                fontFamily: 'inherit',
                fontSize: '13px',
                textIndent: '0'
            }}
            >
            Tarcísio Pereira da Silva
            </Text>
        </Box>
        </footer>

        <style jsx>{`
        footer {
            height: 150px;
            display: flex;
            flex-direction: row;
            background-color: black;
        }

        ul {
            list-style: none;
            text-align: center;
        }

        li {
            display: inline-block;
        }
        `}</style>
        </>
    )
}