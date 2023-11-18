async function fetchWithPromiseAny() {
    const resultContainer = document.getElementById('resultContainer');

    // Limpar o conteúdo anterior
    resultContainer.innerHTML = '';

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

        // Exibir os resultados no container
        if (result.codigo) {
            resultContainer.innerHTML = `<p>Código: ${result.codigo}, Nome: ${result.nome}</p>`;
        } else if (result[0].codigo) {
            for (let i = 0; i < 10; i++) {
                resultContainer.innerHTML += `<p>Código: ${result[i].codigo}, Nome: ${result[i].nome}</p>`;
            }
        }
    } catch (error) {
        // Tratar erros, exibindo mensagens no container
        resultContainer.textContent = `Erro ao acessar APIs (Promise.any): ${error.message}`;
    }
}

async function fetchWithPromiseRace() {
    const resultContainer = document.getElementById('resultContainer');

    // Limpar o conteúdo anterior
    resultContainer.innerHTML = '';

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

        // Exibir os resultados no container
        if (result.codigo) {
            resultContainer.innerHTML = `<p>Código: ${result.codigo}, Nome: ${result.nome}</p>`;
        } else if (result[0].codigo) {
            for (let i = 0; i < 10; i++) {
                resultContainer.innerHTML += `<p>Código: ${result[i].codigo}, Nome: ${result[i].nome}</p>`;
            }
        }
    } catch (error) {
        // Tratar erros, exibindo mensagens no container
        resultContainer.textContent = `Erro ao acessar APIs (Promise.race): ${error.message}`;
    }
}

async function fetchWithPromiseAll() {
    const resultContainer = document.getElementById('resultContainer');

    // Limpar o conteúdo anterior
    resultContainer.innerHTML = '';

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

        // Exibir os resultados no container
        results.forEach(result => {
            if (result[0] && result[0].codigo) {
                for (let i = 0; i < Math.min(result.length, 10); i++) {
                    resultContainer.innerHTML += `<p>Código: ${result[i].codigo}, Nome: ${result[i].nome}</p>`;
                }
            }
        });
    } catch (error) {
        // Tratar erros, exibindo mensagens no container
        resultContainer.textContent = `Erro ao acessar APIs (Promise.all): ${error.message}`;
    }
}
