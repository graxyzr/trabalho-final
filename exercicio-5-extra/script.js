document.addEventListener('DOMContentLoaded', async function () {
    async function fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    // API URLs
    const planetUrls = [
        'https://swapi.dev/api/planets/1/',
        'https://swapi.dev/api/planets/2/',
        'https://swapi.dev/api/planets/3/'
    ];

    // Utilizando destructuring
    const [planet1, planet2, planet3] = await Promise.all(planetUrls.map(fetchData));

    // Adicionando um ouvinte de evento ao botão
    document.getElementById('confirmButton').addEventListener('click', mostrarDetalhesPlaneta);

    // Uma function para exibir detalhes do planeta selecionado
    function mostrarDetalhesPlaneta() {
        const planetSelector = document.getElementById('planetSelector');
        const selectedPlanet = planetSelector.value;
        let selectedPlanetDetails;

        switch (selectedPlanet) {
            case 'planet1':
                selectedPlanetDetails = planet1;
                break;
            case 'planet2':
                selectedPlanetDetails = planet2;
                break;
            case 'planet3':
                selectedPlanetDetails = planet3;
                break;
            default:
                selectedPlanetDetails = {};
        }

        // Filtrar planetas com população maior que 0
        const filteredPlanets = [planet1, planet2, planet3].filter(planet => planet.population > 0);

        // Reduzir planetas para calcular a população total
        const totalPopulation = [planet1, planet2, planet3].reduce((sum, planet) => sum + parseInt(planet.population), 0);

        // Exibindo detalhes do planeta selecionado na tela
        const planetDetailsContainer = document.getElementById('planetDetails');
        planetDetailsContainer.innerHTML = `<p>Nome: ${selectedPlanetDetails.name}</p>`;
        planetDetailsContainer.innerHTML += `<p>População: ${selectedPlanetDetails.population}</p>`;
        planetDetailsContainer.innerHTML += `<p>Clima: ${selectedPlanetDetails.climate}</p>`;

        // Exibindo planetas filtrados e a população total
        console.log("Planetas com população maior que 0:", filteredPlanets);
        console.log("População total:", totalPopulation);
    }
});
