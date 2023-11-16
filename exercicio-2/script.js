async function consultarFeriados() {
    document.getElementById('localidadesResult').innerHTML = '';
    document.getElementById('pixParticipantesResult').innerHTML = '';

    const ano = 2023;
    const API_KEY = 'SUA_CHAVE_DE_API';
    const url = `https://brasilapi.com.br/api/feriados/v1/${ano}?key=${API_KEY}`;

    try {
        const data = await fetchData(url);

        if (data.length > 0) {
            const feriadosInfo = data.map(feriado => `<p>${feriado.name}: ${feriado.date}</p>`).join('');
            document.getElementById('feriadosResult').innerHTML = feriadosInfo;
        } else {
            document.getElementById('feriadosResult').innerHTML = `<p>Nenhum feriado encontrado para o ano de ${ano}.</p>`;
        }
    } catch (error) {
        console.error('Erro ao consultar os feriados:', error);
        document.getElementById('feriadosResult').innerHTML = '<p>Erro ao consultar os feriados.</p>';
    }
}

async function consultarLocalidades() {
    document.getElementById('feriadosResult').innerHTML = '';
    document.getElementById('pixParticipantesResult').innerHTML = '';

    const API_KEY = 'SUA_CHAVE_DE_API';
    const url = `https://brasilapi.com.br/api/cptec/v1/cidade?key=${API_KEY}`;

    try {
        const data = await fetchData(url);

        if (data.length > 0) {
            const localidadesInfo = data.map(localidade => `<p>Nome: ${localidade.nome}, Estado: ${localidade.estado}, ID: ${localidade.id}</p>`).join('');
            document.getElementById('localidadesResult').innerHTML = localidadesInfo;
        } else {
            document.getElementById('localidadesResult').innerHTML = '<p>Nenhuma localidade encontrada.</p>';
        }
    } catch (error) {
        console.error('Erro ao consultar as localidades do CPTEC:', error);
        document.getElementById('localidadesResult').innerHTML = '<p>Erro ao consultar as localidades do CPTEC.</p>';
    }
}

async function consultarParticipantesPIX() {
    document.getElementById('feriadosResult').innerHTML = '';
    document.getElementById('localidadesResult').innerHTML = '';

    const API_KEY = 'SUA_CHAVE_DE_API';
    const url = `https://brasilapi.com.br/api/ncm/v1?search=PIX&key=${API_KEY}`;

    try {
        const data = await fetchData(url);

        if (data.length > 0) {
            const pixParticipantesInfo = data.map(participante => `<p>Código: ${participante.codigo}, Descrição: ${participante.descricao}, Data Início: ${participante.data_inicio}, Data Fim: ${participante.data_fim}, Tipo Ato: ${participante.tipo_ato}, Número Ato: ${participante.numero_ato}, Ano Ato: ${participante.ano_ato}</p>`).join('');
            document.getElementById('pixParticipantesResult').innerHTML = pixParticipantesInfo;
        } else {
            document.getElementById('pixParticipantesResult').innerHTML = '<p>Nenhum participante do PIX encontrado.</p>';
        }
    } catch (error) {
        console.error('Erro ao consultar os participantes do PIX:', error);
        document.getElementById('pixParticipantesResult').innerHTML = '<p>Erro ao consultar os participantes do PIX.</p>';
    }
}

const API_KEY = 'SUA_CHAVE_DE_API';

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        throw error;
    }
}

async function consultarCEP() {
    const cepInput = document.getElementById('cepInput').value;
    const url = `https://brasilapi.com.br/api/cep/v1/${cepInput}?key=${API_KEY}`;

    try {
        const data = await fetchData(url);
        document.getElementById('cepResult').innerHTML = `<p>CEP: ${data.cep}</p> <p>Rua: ${data.street}</p> <p>Bairro: ${data.neighborhood}</p> <p>Cidade: ${data.city}</p> <p>Estado: ${data.state}</p>`;
    } catch (error) {
        document.getElementById('cepResult').innerHTML = '<p>Erro ao consultar o CEP.</p>';
    }
}

async function consultarCNPJ() {
    const cnpjInput = document.getElementById('cnpjInput').value;
    const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpjInput}?key=${API_KEY}`;

    try {
        const data = await fetchData(url);

        // Informações Básicas
        const basicInfo = `<p>CNPJ: ${data.cnpj}</p> <p>Razão Social: ${data.razao_social}</p> <p>Nome Fantasia: ${data.nome_fantasia}</p> <p>Situação Cadastral: ${data.descricao_situacao_cadastral}</p>`;

        // Endereço
        const addressInfo = `<p>Endereço: ${data.descricao_tipo_logradouro || ''} ${data.logradouro || ''}, ${data.numero || ''}</p> <p>Bairro: ${data.bairro || ''}</p> <p>CEP: ${data.cep || ''}, ${data.municipio || ''} - ${data.uf || ''}</p>`;

        // Contato
        const contactInfo = `<p>Telefone: ${data.ddd_telefone_1 || ''}</p>`;

        // Sócio
        const socioInfo = `<p>Sócio: ${data.qsa[0].nome_socio || ''}</p> <p>CPF do Sócio: ${data.qsa[0].cnpj_cpf_do_socio || ''}</p> <p>Data de Entrada na Sociedade: ${data.qsa[0].data_entrada_sociedade || ''}</p>`;

        document.getElementById('cnpjResult').innerHTML = `${basicInfo}<br>${addressInfo}<br>${contactInfo}<br>${socioInfo}`;
    } catch (error) {
        document.getElementById('cnpjResult').innerHTML = '<p>Erro ao consultar o CNPJ.</p>';
    }
}

async function consultarDDD() {
    const dddInput = document.getElementById('dddInput').value;
    const url = `https://brasilapi.com.br/api/ddd/v1/${dddInput}?key=${API_KEY}`;

    try {
        const data = await fetchData(url);
        document.getElementById('dddResult').innerHTML = `<p>Estado: ${data.state}</p>`;
    } catch (error) {
        document.getElementById('dddResult').innerHTML = '<p>Erro ao consultar o DDD.</p>';
    }
}
