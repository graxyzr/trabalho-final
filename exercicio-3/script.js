function consultarDados() {
    var select = document.getElementById("metadataSelect");
    var selectedOption = select.options[select.selectedIndex].value;
    var apiEndpoint = "http://www.ipeadata.gov.br/api/odata4/Metadados('" + selectedOption + "')";
    var dadosContainer = document.getElementById("dadosContainer");

    // Limpar o conteúdo anterior
    dadosContainer.innerHTML = "";

    // Consultar API para obter SERNOME e SERCOMENTARIO
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            var serNome = data.value[0].SERNOME;
            var serComentario = data.value[0].SERCOMENTARIO;
            // Exibir SERNOME e SERCOMENTARIO na tela
            dadosContainer.innerHTML += "<p>Nome: " + serNome + "</p>";
            dadosContainer.innerHTML += "<p>Comentário: " + serComentario + "</p>";

            // Consultar API para obter os dados da tabela
            return fetch(apiEndpoint + "/Valores/");
        })
        .then(response => response.json())
        .then(data => {
            // Selecionar aleatoriamente 10 itens da lista completa
            var randomItems = getRandomItems(data.value, 10);

            // Criar e exibir a tabela com os dados aleatórios
            var tableHTML = "<table><tr><th>DATA</th><th>VALOR</th></tr>";
            randomItems.forEach(item => {
                tableHTML += "<tr><td>" + item.VALDATA + "</td><td>" + item.VALVALOR + "</td></tr>";
            });
            tableHTML += "</table>";
            dadosContainer.innerHTML += tableHTML;
        })
        .catch(error => console.error('Erro:', error));
}

// Uma function para selecionar aleatoriamente n itens de uma lista
function getRandomItems(array, n) {
    var shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}
