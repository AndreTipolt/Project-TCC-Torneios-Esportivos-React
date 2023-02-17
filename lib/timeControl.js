/* Acesso ao bd */
import { supabaseClient } from './initSupabase';

const KEY = 'adafasdfergadfhethzghvcnfghfbn';

export async function timeInRequest(info) {  
    await supabaseClient
        .from('equipe')
        .insert([
            { nome_time: info.nomeTimeCad, perfil_nome_time: info.nomeTimeCad, descricao_time: info.descCad, fkcpf_usuario: info.cpfCad, nome_img: info.nomeImg.data }
        ])

    const { data } = await supabaseClient
        .from('equipe')
        .select('cod_time')
        .like('perfil_nome_time', info.nomeTimeCad)

    console.log(data)

    await supabaseClient
        .from('usuario_equipe')
        .insert([
            { cpf_usuario: info.cpfCad, cod_time: data[0].cod_time, funcao_usuario: 'A', status: 1 }
        ])
}

export async function timeInVerify(cpfUser) {
    const { data } = await supabaseClient
        .from('usuario_equipe')
        .select('equipe(cod_time, nome_time, perfil_nome_time, descricao_time, nome_img)')
        .like('cpf_usuario', cpfUser)
        .eq('status', 1)
         
    if (data.length != 0) {
        return (
            data
        )
    }
}

export async function procurarTime(valor) {
    const nomeTimelower = valor.toLowerCase();

    const nomeTime = nomeTimelower + '%'

    const { data } = await supabaseClient
        .from('equipe')
        .select('cod_time, perfil_nome_time, descricao_time, nome_img')
        .like('nome_time', nomeTime)

    return (
        data
    )
}

export async function selectTimeByCod(codTime, cpfUser) {
    const { data } = await supabaseClient
        .from('usuario_equipe')
        .select('funcao_usuario, equipe(cod_time, perfil_nome_time, descricao_time, nome_img)')
        .eq('cod_time', codTime)
        .like('cpf_usuario', cpfUser)

    return (
        data
    )
}

export async function jogadorInVerify(codTime) {
    const { data } = await supabaseClient
        .from('usuario_equipe')
        .select('cpf_usuario, usuario(nome, perfil_nome_usuario)')
        .eq('cod_time', codTime)
        .eq('status', 1)
         
    if (data.length != 0) {
        return (
            data
        )
    }
}

export async function selectNotificacoes(codTime) {
    const { data } = await supabaseClient
        .from('time_torneio')
        .select('cod_time_torneio, tipo_esporte, torneio(cod_torneio, nome_torneio, descricao_torneio, esporte_torneio)')
        .eq('fk_cod_time', codTime)
        .eq('status', 0)
        .like('destinatario', 'time')
    
    if (data.length != 0) {
        return (
            data
        )
    }
}

export async function MudarStatusAceitar(codTimeTorn) {
    await supabaseClient
        .from('time_torneio')
        .update({ status: 1 })
        .eq('cod_time_torneio', codTimeTorn)
}

export async function MudarStatusRecusar(codTimeTorn) {
    await supabaseClient
        .from('time_torneio')
        .update({ status: 2})
        .eq('cod_time_torneio', codTimeTorn)
}