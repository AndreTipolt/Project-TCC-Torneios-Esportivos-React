/* NextJS imports */
import React from 'react';
import Router from 'next/router';


import jwt from 'jsonwebtoken';

const KEY = 'adafasdfergadfhethzghvcnfghfbn';

/* Nookies = Next + Cookies de navegadores */
import { setCookie, parseCookies, destroyCookie } from 'nookies';

/* Acesso ao bd */
import { singInRequest, singUpRequest, RecoverUserInfo } from '../../lib/singIn';


export const AuthContext = React.createContext({})


export function AuthProvider({ children }) {
    const [user, setUser] = React.useState(null);
    const [erro, setErro] = React.useState(null);

    const isAuthenticated = !!user;

    React.useEffect(() => {
        const { 'pdr-user': token } = parseCookies();

        if (token) {
            RecoverUserInfo(token).then(response => {
                setUser(response.info)
            })
        }
    }, [])

    async function singIn({ usuario, password }) {
        const { tokenUser, falha } = await singInRequest({
            usuario,
            password,
        })

        if (falha != '') {
            setErro(falha);
        }

        if (tokenUser != null) {
            setCookie(undefined, 'pdr-user', tokenUser, {
                maxAge: 60 * 60 * 8, // 24 horas
            });

            setUser(jwt.verify(tokenUser, KEY));

            Router.push('/princ');
        }
    }

    async function logOut() {
        await Router.push('/');
        setUser(null);
        destroyCookie(null, 'pdr-user');
    }

    async function singUp({ cpfCad, nomeCad, emailCad, senhaCad, idadeCad, usuarioCad, sexoCad, cepCad}, estado, cidade, bairro, endereco, esporte, ftPerfil) {
        const { token, falha } = await singUpRequest({
            cpfCad,
            nomeCad,
            emailCad,
            senhaCad,
            idadeCad,
            usuarioCad,
            sexoCad,
            cepCad,
            estado,
            cidade,
            bairro,
            endereco,
            esporte,
            ftPerfil
        })

        if (falha != '') {
            setErro(falha);
        }

        if (token.length != 0) {
            setCookie(undefined, 'pdr-user', token, {
                maxAge: 60 * 60 * 8, // 24 horas
            });

            setUser(jwt.verify(token, KEY));

            Router.push('/princ');
        }   
    }

    return (
        <AuthContext.Provider value={{ user, erro, isAuthenticated, singIn, logOut, singUp }}>
            { children }
        </AuthContext.Provider>
    )
}