document.addEventListener('DOMContentLoaded', function () {
    const countrySelect = document.getElementById('countrySelect');
    const countryData = document.getElementById('country-data');
    const countryName = document.getElementById('countryName');
    const countryDemonym = document.getElementById('countryDemonym');
    const countryAbbreviation = document.getElementById('countryAbbreviation');
    const countryIntlName = document.getElementById('countryIntlName');

    fetch('paises.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.nome_pais;
                option.textContent = country.nome_pais;
                countrySelect.appendChild(option);
            });

            countrySelect.addEventListener('change', function () {
                const selectedCountry = data.find(country => country.nome_pais === countrySelect.value);

                if (selectedCountry) {
                    countryName.textContent = selectedCountry.nome_pais;
                    countryDemonym.textContent = selectedCountry.gentilico;
                    countryAbbreviation.textContent = selectedCountry.sigla;
                    countryIntlName.textContent = selectedCountry.nome_pais_int;
                    countryData.style.display = 'block';
                } else {
                    countryData.style.display = 'none';
                }
            });
        });
});
