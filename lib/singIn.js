/* NextJS imports */
import React from 'react';

import jwt from 'jsonwebtoken';

const KEY = 'adafasdfergadfhethzghvcnfghfbn';

/* Acesso ao bd */
import { supabaseClient } from './initSupabase';


export async function singInRequest(info) {
    const usuariolower = info.usuario.toLowerCase();

    var md5 = require('md5')
    const senha = md5(info.password)
    
    const { data } = await supabaseClient
        .from('usuario')
        .select('nome_usuario, perfil_nome_usuario, cpf_usuario, nome, email, data_nascimento, img_usuario')
        .like('nome_usuario', usuariolower)
        .eq('senha', senha)

    if (data.length != 0) {
        return {
            tokenUser: jwt.sign(data[0], KEY),
            falha: ''
        }
    }
    else {
        return {
            token: data,
            falha: 'Usuario ou senha incorretos'
        }
    }
}

export async function singUpRequest(info) {
    const dataSeparada = info.idadeCad.split("/");
    const nascimento = dataSeparada[2] + '-' + dataSeparada[1] + '-' + dataSeparada[0];

    const { data } = await supabaseClient
        .from('usuario')
        .insert([
            { cpf_usuario: info.cpfCad, nome: info.nomeCad, nome_usuario: info.usuarioCad, perfil_nome_usuario: info.usuarioCad, email: info.emailCad, senha: info.senhaCad, data_nascimento: nascimento, sexo: info.sexoCad, cidade: info.cidade, estado: info.estado, endereco_usuario: info.endereco, bairro: info.bairro, cep: info.cepCad, img_usuario: info.ftPerfil.data }
        ])
         

    if (data.length != 0) {
        return {
            token: jwt.sign(data[0], KEY),
            falha: ''
        }
    }
    else {
        return {
            token: data,
            falha: 'Usuario ou senha incorretos'
        }
    }
}

export async function RecoverUserInfo(token) {
    return {
        info: jwt.verify(token, KEY)
    }
}