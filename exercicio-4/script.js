async function fetchWithPromiseAny() {
    // Definir os URLs das APIs a serem consultadas
    const apiUrl1 = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';
    const apiUrl2 = 'https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos';
    const apiUrl3 = 'https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos';

    try {
        // Utilizando Promise.any para obter o resultado da primeira promessa resolvida
        const result = await Promise.any([
            fetch(apiUrl1).then(response => response.json()),
            fetch(apiUrl2).then(response => response.json()),
            fetch(apiUrl3).then(response => response.json())
        ]);

        // Exibir o resultado no console e em um alerta
        console.log('Resultado da primeira promessa resolvida (Promise.any):', result);
        alert('Resultado da primeira promessa resolvida (Promise.any):\n' + JSON.stringify(result, null, 2));
    } catch (error) {
        // Tratar erros, exibindo mensagens no console e em um alerta
        console.error('Erro ao acessar APIs (Promise.any):', error);
        alert('Erro ao acessar APIs (Promise.any):\n' + error.message);
    }
}

async function fetchWithPromiseRace() {
    // Definir os URLs das APIs a serem consultadas
    const apiUrl1 = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';
    const apiUrl2 = 'https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos';
    const apiUrl3 = 'https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos';

    try {
        // Utilizando Promise.race para obter o resultado da primeira promessa resolvida
        const result = await Promise.race([
            fetch(apiUrl1).then(response => response.json()),
            fetch(apiUrl2).then(response => response.json()),
            fetch(apiUrl3).then(response => response.json())
        ]);

        // Exibir o resultado no console e em um alerta
        console.log('Resultado da primeira promessa resolvida (Promise.race):', result);
        alert('Resultado da primeira promessa resolvida (Promise.race):\n' + JSON.stringify(result, null, 2));
    } catch (error) {
        // Tratar erros, exibindo mensagens no console e em um alerta
        console.error('Erro ao acessar APIs (Promise.race):', error);
        alert('Erro ao acessar APIs (Promise.race):\n' + error.message);
    }
}

async function fetchWithPromiseAll() {
    // Definir os URLs das APIs a serem consultadas
    const apiUrl1 = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';
    const apiUrl2 = 'https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos';
    const apiUrl3 = 'https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos';

    try {
        // Utilizando Promise.all para obter os resultados de todas as promessas
        const results = await Promise.all([
            fetch(apiUrl1).then(response => response.json()),
            fetch(apiUrl2).then(response => response.json()),
            fetch(apiUrl3).then(response => response.json())
        ]);

        // Exibir os resultados no console e em um alerta
        console.log('Resultados das 3 APIs (Promise.all):', results);
        alert('Resultados das 3 APIs (Promise.all):\n' + JSON.stringify(results, null, 2));
    } catch (error) {
        // Tratar erros, exibindo mensagens no console e em um alerta
        console.error('Erro ao acessar APIs (Promise.all):', error);
        alert('Erro ao acessar APIs (Promise.all):\n' + error.message);
    }
}
