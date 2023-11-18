// Executado quando o DOM (Document Object Model) é completamente carregado
document.addEventListener('DOMContentLoaded', function () {

    // Obtendo referências para elementos HTML pelo ID
    const countrySelect = document.getElementById('countrySelect');
    const countryData = document.getElementById('country-data');
    const countryName = document.getElementById('countryName');
    const countryDemonym = document.getElementById('countryDemonym');
    const countryAbbreviation = document.getElementById('countryAbbreviation');
    const countryIntlName = document.getElementById('countryIntlName');

    // Utilizando a função fetch para obter dados de um arquivo JSON chamado 'paises.json'
    fetch('paises.json')
        .then(response => response.json()) // Convertendo a resposta para formato JSON
        .then(data => {
            // Iterando sobre os dados obtidos do JSON para preencher as opções do elemento select
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.nome_pais;
                option.textContent = country.nome_pais;
                countrySelect.appendChild(option);
            });

            // Adicionando um ouvinte de evento para o elemento select (countrySelect)
            countrySelect.addEventListener('change', function () {
                // Obtendo o país selecionado com base no valor selecionado no elemento select
                const selectedCountry = data.find(country => country.nome_pais === countrySelect.value);

                // Verificando se o país foi encontrado e exibindo as informações correspondentes
                if (selectedCountry) {
                    countryName.textContent = selectedCountry.nome_pais;
                    countryDemonym.textContent = selectedCountry.gentilico;
                    countryAbbreviation.textContent = selectedCountry.sigla;
                    countryIntlName.textContent = selectedCountry.nome_pais_int;
                    countryData.style.display = 'block';
                } else {
                    // Se o país não for encontrado, ocultamos as informações.
                    countryData.style.display = 'none';
                }
            });
        });
});
