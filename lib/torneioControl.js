/* Acesso ao bd */
import { supabaseClient } from './initSupabase';

const KEY = 'adafasdfergadfhethzghvcnfghfbn';

export async function torneioCreate(info) { 
    const { data } = await supabaseClient
        .from('torneio')
        .insert([
            { nome_torneio: info.nomeTorneio, descricao_torneio: info.descTorneio, esporte_torneio: info.esporte, tipo_chave: info.chave, fk_cpf_usuario: info.cpfUser }
        ])
         
    if (data.length != 0) {
        return (
            data
        )
    }
}

export async function torneioInVerify(cpfUser) {
    const { data } = await supabaseClient
        .from('torneio')
        .select('cod_torneio, perfil_nome_torneio, descricao_torneio, esporte_torneio, tipo_chave')
        .like('fk_cpf_usuario', cpfUser)
        .order('cod_torneio', { ascending: true })
         
    if (data.length != 0) {
        return (
            data
        )
    }
}

export async function insertConviteTime(codTime, codTorneio) {
    const { data } = await supabaseClient
        .from('time_torneio')
        .insert([
            { fk_cod_torneio: codTorneio, fk_cod_time: codTime, destinatario: 'time' }
        ])

    if (data.length != 0) {
        return (
            data
        )
    }
}

export async function selectTorneioByCod(codTorneio) {
    const { data } = await supabaseClient
        .from('torneio')
        .select('cod_torneio, fk_cpf_usuario, perfil_nome_torneio, descricao_torneio, esporte_torneio, tipo_chave')
        .eq('cod_torneio', codTorneio);

    if (data.length != 0) {
        return (
            data
        )
    }
}

export async function timesInTorneio(codTorneio) {
    const { data } = await supabaseClient
        .from('time_torneio')
        .select('posicao, equipe(cod_time, perfil_nome_time, descricao_time, nome_img)')
        .eq('fk_cod_torneio', codTorneio)
        .eq('status', 1)
     
    if (data.length != 0) {
        return (
            data
        )
    }
}

export async function updatePosicao(codTime, codTorneio, newPosicao) {
    const { data } = await supabaseClient
        .from('time_torneio')
        .select('cod_time_torneio, posicao')
        .eq('fk_cod_torneio', codTorneio)
    
    data.map(async function (data) {
        if (data.posicao == newPosicao) {
            await supabaseClient
                .from('time_torneio')
                .update({ posicao: 0 })
                .eq('cod_time_torneio', data.cod_time_torneio)
        }
    })

    await supabaseClient
        .from('time_torneio')
        .update({ posicao: newPosicao })
        .eq('fk_cod_torneio', codTorneio)
        .eq('fk_cod_time', codTime)
}

export async function procurarTorneio(valor) {
    const nomeTornlower = valor.toLowerCase();

    const nomeTorn = nomeTornlower + '%'

    const { data } = await supabaseClient
        .from('torneio')
        .select('cod_torneio, perfil_nome_torneio, descricao_torneio, esporte_torneio, tipo_chave')
        .like('nome_torneio', nomeTorn)

    return (
        data
    )
}

export async function aleatorizarPosicao(codTorneio) {
    const { data } = await supabaseClient
        .from('time_torneio')
        .select('cod_time_torneio')
        .eq('fk_cod_torneio', codTorneio)
        .eq('status', 1)

    const maxNumbers = data.length;
    let lista = [];
    for (let i = 0; i < maxNumbers; i++) {
       lista[i] = i + 1;
    }

    let randomNumber;
    let tmp;
    for (let i = 0; i < lista.length; i++) {
        randomNumber = Math.random() * lista.length | 0;
        tmp = lista[randomNumber];
        // troca o número aleatório pelo atual
        lista[randomNumber] = lista[i];
        // troca o atual pelo aleatório
        lista[i] = tmp;
    }



    for (let j = 0; j < lista.length; j++) {
        await supabaseClient
            .from('time_torneio')
            .update({ posicao: lista[j] })
            .eq('cod_time_torneio', data[j].cod_time_torneio)
    }

    return (
        data
    )
}