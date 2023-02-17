/* NextJS imports */
import React, { useState } from 'react';
import Link from 'next/link';

import { AuthContext } from './context/AuthContext';

import { motion } from "framer-motion";

import { useForm, Controller } from 'react-hook-form';

import InputMask from 'react-input-mask';

/* Skynexui imports */
import { Box, Image, Text } from '@skynexui/components';


export default function FormCadastro() {
    const scaleUp = {
        hidden: { opacity: 0, scale: 0.5 },
        enter: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.5 },
    };

    const { register, handleSubmit, control } = useForm();

    const { erro, singUp } = React.useContext(AuthContext);

    const [esporte, setEsporte] = React.useState(null);
    const [cidade, setCidade] = React.useState(null);
    const [estado, setEstado] = React.useState(null);
    const [bairro, setBairro] = React.useState(null);
    const [endereco, setEndereco] = React.useState(null);

    const formatChars = {
        'Y': '[0-9]',
        'm': '[0-1]',
        'M': '[0-9]',
        'd': '[0-3]',
        'D': '[1-9]'
    };


    let beforeMaskedValueChange = (newState) => {
        let { value } = newState;
    
        let dateParts = value.split('/');
        let monthPart = dateParts[1];
        let dayPart = dateParts[0]
    
        if (dayPart) {
            // Mascara condicional para o 2° número do dia
            if(dayPart.startsWith('3'))
                formatChars['D'] = '[0-1]'; // Para bloquear 32, 33 ...
            else if(dayPart.startsWith('2'))
                formatChars['D'] = '[0-9]'; // Para bloquear 32, 33 ...
            else if(dayPart.startsWith('1'))
                formatChars['D'] = '[0-9]'; // Para bloquear 32, 33 ...
            else
                formatChars['D'] = '[1-9]'; // Bloqueia 00
        }

        if (monthPart) {
            // Mascara condicional para o 2° número do mês
            if(monthPart.startsWith('1'))
                formatChars['M'] = '[0-2]'; // Para bloquear 13, 14 ...
            else
                formatChars['M'] = '[1-9]'; // Bloqueia 00
        }
    
        return {value, selection: newState.selection};
    }

    async function verificarCep(value) {
        const newValue = value.replace('-','');

        if(newValue.length == 8) {
            fetch(`https://viacep.com.br/ws/${newValue}/json/`)
            .then((res) => res.json())
            .then((data) => {
                if (data.uf != undefined) {
                    document.getElementById('estadoCad').value = data.uf;
                    document.getElementById('cidadeCad').value = data.localidade;
                    document.getElementById('bairroCad').value = data.bairro;
                    document.getElementById('enderecoCad').value = data.logradouro;
                    setEstado(data.uf);
                    setCidade(data.localidade);
                    setBairro(data.bairro);
                    setEndereco(data.logradouro);
                }
            });
        }

        if(newValue.length == 7) {
            document.getElementById('estadoCad').value = '';
            document.getElementById('cidadeCad').value = '';
            document.getElementById('bairroCad').value = '';
            document.getElementById('enderecoCad').value = '';
        }
    }

    function Pessoal() {
        document.getElementById('infoPessoal').style.display = 'block';
        document.getElementById('preferencias').style.display = 'none';
        document.getElementById('perfiloff').style.display = 'none';
        document.getElementById('perfilon').style.display = 'block';
        document.getElementById('prefoff').style.display = 'block';
        document.getElementById('prefon').style.display = 'none';
    }

    function Preferencias() {
        document.getElementById('preferencias').style.display = 'block';
        document.getElementById('infoPessoal').style.display = 'none';
        document.getElementById('perfiloff').style.display = 'block';
        document.getElementById('perfilon').style.display = 'none';
        document.getElementById('prefoff').style.display = 'none';
        document.getElementById('prefon').style.display = 'block';
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

    
    /* Função acionada quando o botão Cadastre-se é pressionado */
    async function handleCadastro(data) {
        const fd = new FormData();
        fd.append('myfile', data.ftPerfil[0]);

        await fetch(`http://localhost:3000/api/uploadUser`, {
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
            singUp(data, estado, cidade, bairro, endereco, esporte, res.data);
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

    const buttonPessoal = React.useRef(null);
    const buttonPreferencias = React.useRef(null);
    const buttonNext = React.useRef(null);


    React.useEffect(() => {
        if (buttonPessoal.current) {
            buttonPessoal.current.focus();
        }
    }, []);

    function Next() {
        if (buttonNext.current) {
            buttonPreferencias.current.focus();
            document.getElementById('preferencias').style.display = 'block';
            document.getElementById('infoPessoal').style.display = 'none';
        }
    }

    return (
        <>
        <Box
        styleSheet={{
            height: '960px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
            {/* Form de Cadastro */}
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
                display: 'flex',
                flexDirection: 'row',
                height: '150px',
                transform: 'translateY(28px)'
            }}
            >
                <button
                    id='pessoal'
                    type='button'
                    ref={buttonPessoal}
                    onClick={Pessoal}
                >
                    <Image 
                    id='perfiloff'
                    src='image/Perfil_OFF_Black.png'
                    styleSheet={{
                        display: 'none',
                        height: '130px',
                        transform: 'translateY(-14px)',
                        margin: '15px auto'
                    }}
                    />

                    <Image 
                    id='perfilon'
                    src='image/Perfil_ON_Black.png'
                    styleSheet={{
                        display: 'block',
                        height: '130px',
                        transform: 'translateY(-14px)',
                        margin: '15px auto'
                    }}
                    />
                </button>

                <button
                    id='pref'
                    type="button"
                    ref={buttonPreferencias}
                    onClick={Preferencias}
                >
                    <Image 
                    id='prefoff'
                    src='image/Local_OFF.png'
                    styleSheet={{
                        display: 'block',
                        height: '130px',
                        transform: 'translateY(-14px)',
                        margin: '15px auto'
                    }}
                    />

                    <Image 
                    id='prefon'
                    src='image/Local_ON.png'
                    styleSheet={{
                        display: 'none',
                        height: '130px',
                        transform: 'translateY(-14px)',
                        margin: '15px auto'
                    }}
                    />
                </button>
            </Box>

            <Box
            id="infoPessoal"
            styleSheet={{
                height: '699px',
                width: '700px',
                position: 'relative',
                margin: '0',
                backgroundColor: 'black',
                borderRadius: '14px',
            }}
            >
                <Box
                styleSheet={{
                    margin: '0',
                    display: 'flex',
                    flexDirection: 'row'
                }}
                >
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
                            width: '245px',
                            margin: '25px 35px 25px 70px'
                        }}
                        >
                        CPF:
                        </Text>

                        <p id="nasc"></p>
                    </Box>

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
                            width: '245px',
                            margin: '25px 70px 25px 35px'
                        }}
                        >
                        Foto de Perfil:
                        </Text>

                        <p id="sexo"></p>
                    </Box>
                </Box>

                <Box
                styleSheet={{
                    margin: '0',
                    display: 'flex',
                    flexDirection: 'row'
                }}
                >
                    <Controller
                        name="cpfCad"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => (
                            <InputMask
                                mask="999.999.999-99"
                                maskChar=""
                                value={field.value}
                                onChange={field.onChange}
                            >
                                {(inputProps) => (
                                    <input
                                        id="cpfCad"
                                        {...inputProps}
                                        type="text"
                                        placeholder='999.999.999-99'
                                    />
                                )}
                            </InputMask>
                        )}
                    />

                    <input 
                        {... register('ftPerfil')}
                        id="ftPerfil"
                        name="ftPerfil"
                        type="file"
                        required
                    />
                </Box>

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
                    Nome Completo:
                    </Text>

                    <p id="nome"></p>
                </Box>

                <input 
                    {... register('nomeCad')}
                    id="nomeCad"
                    name="nomeCad"
                    type="text"
                    placeholder="Nome Completo"
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
                    Usuário:
                    </Text>

                    <p id="user"></p>
                </Box>

                <input 
                    {... register('usuarioCad')}
                    id="usuarioCad"
                    name="usuarioCad"
                    type="text"
                    placeholder="Usuário"
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
                    Email:
                    </Text>

                    <p id="email"></p>
                </Box>

                <input 
                    {... register('emailCad')}
                    id="emailCad"
                    name="emailCad"
                    type="text"
                    required
                    placeholder="Email"
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
                        margin: '25px 70px'
                    }}
                    >
                    Senha:
                    </Text>

                    <p id="pass"></p>
                </Box>

                <input 
                    {... register('senhaCad')}
                    id="senhaCad"
                    name="senhaCad"
                    type="password"
                    required
                    placeholder="Senha"
                />

                <button
                    id='next'
                    type='button'
                    ref={buttonNext}
                    onClick={Next}
                >
                    Próxima Etapa
                </button>

                {/* Direcionar para o Login */}
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
                            padding: '10px 10px 25px 70px'
                        }}
                    >
                    Já possui uma conta PDR's Sports?
                    </Text>

                    <Link href="login">
                    <Text
                        tag="a"
                        styleSheet={{
                            color: '#ffde59',
                            textDecoration: 'underline',
                            fontFamily: 'inherit',
                            fontSize: '16px',
                            margin: '10px 0',
                            cursor: 'pointer'
                        }}
                    >
                    Entre aqui
                    </Text>
                    </Link>
                </Box>
            </Box>

            <Box
            id="preferencias"
            styleSheet={{
                display: 'none',
                height: '699px',
                width: '700px',
                position: 'relative',
                margin: '0',
                backgroundColor: 'black',
                borderRadius: '14px',
            }}
            >
                <Box
                styleSheet={{
                    margin: '0',
                    display: 'flex',
                    flexDirection: 'row'
                }}
                >
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
                            width: '245px',
                            margin: '25px 35px 25px 70px'
                        }}
                        >
                        Data de Nascimento:
                        </Text>

                        <p id="nasc"></p>
                    </Box>

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
                            width: '245px',
                            margin: '25px 70px 25px 35px'
                        }}
                        >
                        Sexo:
                        </Text>

                        <p id="sexo"></p>
                    </Box>
                </Box>

                <Box
                styleSheet={{
                    margin: '0',
                    display: 'flex',
                    flexDirection: 'row'
                }}
                >
                    <Controller
                        name="idadeCad"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => (
                            <InputMask
                                mask="dD/mM/YYYY"
                                maskChar=""
                                value={field.value}
                                onChange={field.onChange}
                                formatChars={formatChars}
                                beforeMaskedValueChange={beforeMaskedValueChange}
                            >
                                {(inputProps) => (
                                    <input
                                        id="inputdata"
                                        {...inputProps}
                                        type="text"
                                        placeholder='dd/mm/aaaa'
                                    />
                                )}
                            </InputMask>
                        )}
                    />

                    <select 
                        {... register('sexoCad')}
                        name="sexoCad" 
                        id="sexoCad"
                        required
                    >
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                        <option value="O">Outros</option>
                        <option value="P">Prefiro não dizer</option>
                    </select>
                </Box>

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
                        width: '245px',
                        margin: '25px 35px 25px 70px'
                    }}
                    >
                    CEP:
                    </Text>

                    <p id="cep"></p>

                    <Text
                    tag="p"
                    styleSheet={{
                        color: 'white',
                        fontFamily: 'inherit',
                        fontSize: '16px',
                        width: '245px',
                        margin: '25px 70px 25px 35px'
                    }}
                    >
                    Estado:
                    </Text>

                    <p id="state"></p>
                </Box>

                <Box
                styleSheet={{
                    margin: '0',
                    display: 'flex',
                    flexDirection: 'row'
                }}
                >
                    <Controller
                        name="cepCad"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => (
                            <InputMask
                                mask="99999-999"
                                maskChar=""
                                value={field.value}
                                onChange={field.onChange}
                            >
                                {(inputProps) => (
                                    <input
                                        id="inputcep"
                                        {...inputProps}
                                        type="text"
                                        placeholder='99999-999'
                                        onchange={verificarCep(field.value)}
                                    />
                                )}
                            </InputMask>
                        )}
                    />

                    <input 
                        {... register('estadoCad')}
                        id="estadoCad"
                        name="estadoCad"
                        type="text"
                        onChange={function(e) {setEstado(e.target.value)}}
                        required
                        placeholder="UF"
                    />
                </Box>

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
                        width: '245px',
                        margin: '25px 35px 25px 70px'
                    }}
                    >
                    Cidade:
                    </Text>

                    <p id="city"></p>

                    <Text
                    tag="p"
                    styleSheet={{
                        color: 'white',
                        fontFamily: 'inherit',
                        fontSize: '16px',
                        width: '245px',
                        margin: '25px 70px 25px 35px'
                    }}
                    >
                    Bairro:
                    </Text>

                    <p id="bairro"></p>
                </Box>

                <Box
                styleSheet={{
                    margin: '0',
                    display: 'flex',
                    flexDirection: 'row'
                }}
                >
                    <input 
                        {... register('cidadeCad')}
                        id="cidadeCad"
                        name="cidadeCad"
                        type="text"
                        onChange={function(e) {setCidade(e.target.value)}}
                        required
                        placeholder="Cidade"
                    />

                    <input 
                        {... register('bairroCad')}
                        id="bairroCad"
                        name="bairroCad"
                        type="text"
                        onchange={function(e) {setBairro(e.target.value)}}
                        required
                        placeholder="Bairro"
                    />
                </Box>

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
                    Endereço:
                    </Text>

                    <p id="endereco"></p>
                </Box>

                <input 
                    {... register('enderecoCad')}
                    id="enderecoCad"
                    name="enderecoCad"
                    type="text"
                    onChange={function(e) {setEndereco(e.target.value)}}
                    required
                    placeholder="Rua"
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
                        margin: '57px 50px 27px 70px',
                    }}
                    >
                    Preferencia Esportiva:
                    </Text>
                
                    <Image 
                    id='futebolOff'
                    src='image/Fut_OFF.png'
                    styleSheet={{
                        weight: '35px',
                        height: '35px',
                        display: 'block',
                        margin: '50px 10px 0 10px',
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
                        margin: '50px 10px 0 10px',
                    }}
                    />
                    <Image 
                    id='voleiOff'
                    src='image/Volei_OFF.png'
                    styleSheet={{
                        weight: '35px',
                        height: '35px',
                        display: 'block',
                        margin: '50px 10px 0 10px',
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
                        margin: '50px 10px 0 10px',
                    }}
                    />
                    <Image 
                    id='basqueteOff'
                    src='image/Basquete_OFF.png'
                    styleSheet={{
                        weight: '35px',
                        height: '35px',
                        display: 'block',
                        margin: '50px 10px 0 10px',
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
                        margin: '50px 10px 0 10px',
                    }}
                    />
                </Box>

                <input 
                    id="cadastre-se"
                    name="cadastre-se"
                    type="submit"
                    value="Cadastre-se"
                />

                {/* Direcionar para o Login */}
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
                            padding: '10px 10px 25px 70px'
                        }}
                    >
                    Já possui uma conta PDR's Sports?
                    </Text>

                    <Link href="login">
                    <Text
                        tag="a"
                        styleSheet={{
                            color: '#ffde59',
                            textDecoration: 'underline',
                            fontFamily: 'inherit',
                            fontSize: '16px',
                            margin: '10px 0',
                            cursor: 'pointer'
                        }}
                    >
                    Entre aqui
                    </Text>
                    </Link>
                </Box>
            </Box>
            </motion.main>
            </form>

        </Box>

        <style jsx>{`
        button#pessoal {
            transition: 0.6s;
            background-color: #008037;
            height: 150px;
            width: 350px;
            border: none;
            border-radius: 14px;
        }

        button#pessoal:hover {
            cursor: pointer;
            transform: translateY(14px);
        }

        button#pessoal:focus {
            background-color: #00662c;
            transform: translateY(14px);
            outline: 0;
        }

        button#pref {
            transition: 0.6s;
            background-color: #ffde59;
            height: 150px;
            width: 350px;
            border: none;
            border-radius: 14px;
        }

        button#pref:hover {
            cursor: pointer;
            transform: translateY(14px);
        }

        button#pref:focus {
            background-color: #d4b745;
            transform: translateY(14px);
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

        input[type='number'] {
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

        input[type='password'] {
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

        #inputdata {
            width: 245px;
            margin-left: 70px;
            margin-right: 35px;
        }

        select {
            height: 34px;
            width: 245px;
            border: 0;
            resize: none;
            border-radius: 5px;
            padding: 6px 8px;
            margin-left: 35px;
            margin-right: 70px;
            font-size: 18px;
            font-family: inherit;
        }

        #inputcep {
            width: 245px;
            margin-left: 70px;
            margin-right: 35px;
        }

        #estadoCad {
            width: 245px;
            margin-left: 35px;
            margin-right: 70px;
        }

        #cidadeCad {
            width: 245px;
            margin-left: 70px;
            margin-right: 35px;
        }

        #bairroCad {
            width: 245px;
            margin-left: 35px;
            margin-right: 70px;
        }

        #cpfCad {
            width: 245px;
            margin-left: 70px;
            margin-right: 35px;
        }

        input[type='file'] {
            height: 34px;
            width: auto;
            border: 0;
            resize: none;
            margin: 3px 70px auto 35px;
            color: white;
            font-size: 18px;
            font-family: inherit;
        }

        input[type='submit'] {
            width: 15vw;
            height: 40px;
            margin: 5% 70px;
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

        input[type='submit']:hover {
            background-color: #008037;
            color: black;
        } 

        input[type='submit']:focus {
            background-color: #00662c;
            color: black;
            border: 4px solid #00662c;
        }

        button#next {
            width: 15vw;
            height: 40px;
            margin: 5% 70px;
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

        button#next:hover {
            background-color: #008037;
            color: black;
        } 

        button#next:focus {
            background-color: #00662c;
            color: black;
            border: 4px solid #00662c;
        }

        p {
            color: white;
            margin: 0;
            font-size: 16px;
            padding: 0;
        }
        `}</style>
        </>
    );
}