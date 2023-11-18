// Uma function assíncrona para consultar feriados utilizando o Brasil API
async function consultarFeriados() {
    // Limpa o conteúdo de outros resultados antes de exibir os feriados
    document.getElementById('localidadesResult').innerHTML = '';
    document.getElementById('pixParticipantesResult').innerHTML = '';

    // Define o ano e a chave da API
    const ano = 2023;
    const API_KEY = 'SUA_CHAVE_DE_API';
    const url = `https://brasilapi.com.br/api/feriados/v1/${ano}?key=${API_KEY}`;

    try {
        // Chama a function fetchData para obter os dados da API
        const data = await fetchData(url);

        // Verifica se há feriados e exibe as informações ou uma mensagem se não houver feriados
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

// Uma function assíncrona para consultar localidades utilizando o Brasil API
async function consultarLocalidades() {
    // Limpa o conteúdo de outros resultados antes de exibir as localidades
    document.getElementById('feriadosResult').innerHTML = '';
    document.getElementById('pixParticipantesResult').innerHTML = '';

    // Define a chave da API e a URL para consultar as localidades
    const API_KEY = 'SUA_CHAVE_DE_API';
    const url = `https://brasilapi.com.br/api/cptec/v1/cidade?key=${API_KEY}`;

    try {
        // Chama a function fetchData para obter os dados da API
        const data = await fetchData(url);

        // Verifica se há localidades e exibe as informações ou uma mensagem se não houver localidades
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

// Uma function assíncrona para consultar participantes do PIX utilizando o Brasil API
async function consultarParticipantesPIX() {
    // Limpa o conteúdo de outros resultados antes de exibir os participantes do PIX
    document.getElementById('feriadosResult').innerHTML = '';
    document.getElementById('localidadesResult').innerHTML = '';

    // Define a chave da API e a URL para consultar os participantes do PIX
    const API_KEY = 'SUA_CHAVE_DE_API';
    const url = `https://brasilapi.com.br/api/ncm/v1?search=PIX&key=${API_KEY}`;

    try {
        // Chama a function fetchData para obter os dados da API
        const data = await fetchData(url);

        // Verifica se há participantes do PIX e exibe as informações ou uma mensagem se não houver participantes
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

// Constante para a chave da API
const API_KEY = 'SUA_CHAVE_DE_API';

// Uma function para obter dados de uma URL utilizando fetch e tratamento de erros
async function fetchData(url) {
    try {
        // Realiza uma requisição fetch para a URL fornecida
        const response = await fetch(url);

        // Converte a resposta para o formato JSON
        const data = await response.json();

        // Retorna os dados obtidos
        return data;
    } catch (error) {
        // Em caso de erro, exibe a mensagem no console e lança a exceção
        console.error('Erro ao obter dados:', error);
        throw error;
    }
}

// Uma function assíncrona para consultar informações de um CEP utilizando o Brasil API
async function consultarCEP() {
    // Obtém o valor do input do CEP
    const cepInput = document.getElementById('cepInput').value;
    const url = `https://brasilapi.com.br/api/cep/v1/${cepInput}?key=${API_KEY}`;

    try {
        // Chama a function fetchData para obter os dados da API
        const data = await fetchData(url);

        // Exibe as informações do CEP ou uma mensagem de erro se não encontrar informações
        document.getElementById('cepResult').innerHTML = `<p>CEP: ${data.cep}</p> <p>Rua: ${data.street}</p> <p>Bairro: ${data.neighborhood}</p> <p>Cidade: ${data.city}</p> <p>Estado: ${data.state}</p>`;
    } catch (error) {
        // Exibe uma mensagem de erro caso ocorra um problema ao consultar o CEP
        document.getElementById('cepResult').innerHTML = '<p>Erro ao consultar o CEP.</p>';
    }
}

// Uma function assíncrona para consultar informações de um CNPJ utilizando o Brasil API
async function consultarCNPJ() {
    // Obtém o valor do input do CNPJ.
    const cnpjInput = document.getElementById('cnpjInput').value;
    const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpjInput}?key=${API_KEY}`;

    try {
        // Chama a function fetchData para obter os dados da API
        const data = await fetchData(url);

        // Informações Básicas
        const basicInfo = `<p>CNPJ: ${data.cnpj}</p> <p>Razão Social: ${data.razao_social}</p> <p>Nome Fantasia: ${data.nome_fantasia}</p> <p>Situação Cadastral: ${data.descricao_situacao_cadastral}</p>`;

        // Endereço
        const addressInfo = `<p>Endereço: ${data.descricao_tipo_logradouro || ''} ${data.logradouro || ''}, ${data.numero || ''}</p> <p>Bairro: ${data.bairro || ''}</p> <p>CEP: ${data.cep || ''}, ${data.municipio || ''} - ${data.uf || ''}</p>`;

        // Contato
        const contactInfo = `<p>Telefone: ${data.ddd_telefone_1 || ''}</p>`;

        // Sócio
        const socioInfo = `<p>Sócio: ${data.qsa[0].nome_socio || ''}</p> <p>CPF do Sócio: ${data.qsa[0].cnpj_cpf_do_socio || ''}</p> <p>Data de Entrada na Sociedade: ${data.qsa[0].data_entrada_sociedade || ''}</p>`;

        // Exibe as informações do CNPJ formatadas
        document.getElementById('cnpjResult').innerHTML = `${basicInfo}<br>${addressInfo}<br>${contactInfo}<br>${socioInfo}`;
    } catch (error) {
        // Exibe uma mensagem de erro caso ocorra um problema ao consultar o CNPJ
        document.getElementById('cnpjResult').innerHTML = '<p>Erro ao consultar o CNPJ.</p>';
    }
}

// Uma function assíncrona para consultar informações de um DDD utilizando o Brasil API
async function consultarDDD() {
    // Obtém o valor do input do DDD
    const dddInput = document.getElementById('dddInput').value;
    const url = `https://brasilapi.com.br/api/ddd/v1/${dddInput}?key=${API_KEY}`;

    try {
        // Chama a function fetchData para obter os dados da API
        const data = await fetchData(url);

        // Exibe o estado correspondente ao DDD informado
        document.getElementById('dddResult').innerHTML = `<p>Estado: ${data.state}</p>`;
    } catch (error) {
        // Exibe uma mensagem de erro caso ocorra um problema ao consultar o DDD
        document.getElementById('dddResult').innerHTML = '<p>Erro ao consultar o DDD.</p>';
    }
}
