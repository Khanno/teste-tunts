// Importando funções da api do google sheets
const { GoogleSpreadsheet } = require('google-spreadsheet');

// Acessando a planilha por ID
// IMPORTANTE VERIFICAR ID
const doc = new GoogleSpreadsheet('1WAbcyMZGSAxTot9RrJEDL8IcgfzdhtvoD8GObm-c-gU');


// Acessando a planilha com a service account criada no google api
async function accessSpreadsheet(){
    try {

    // Fornecendo as informações baseadas no arquivo do service account
    // Caso haja necessidade de alterar o arquivo de credenciais, favor confirmar se o nome do arquivo é o mesmo escrito abaixo.
    await doc.useServiceAccountAuth(require('./service_accounts_credentials.json'));

    // Carregando as informações do arquivo de planilhas
    await doc.loadInfo();

    // Log de acesso
    console.log(doc.title);

    // Selecionando a primeira planilha do arquivo
    const sheet = doc.sheetsByIndex[0];

    // Teste para verificar se houve conexão
    //console.log(sheet.rowCount);

    // Obtendo informações das celulas entre C4 até H27
    await sheet.loadCells('B4:H27')
    
    // Log de informações recebidas
    console.log(`Informações das celulas obtidas com sucesso`);
    for (i = 0; i <= 23; i++) {
            // Coletando informações das celulas necessárias para calcula e atualização de resultados

            // Alocando a informação do nome do aluno à variável nomeAluno
            let nomeAluno = sheet.getCellByA1(`B${4 + i}`);

            // Log do nome
            console.log(`Aluno: ${nomeAluno.value}`);

            // Alocando a informação da celula de falta à variavel celulaFalta
            let celulaFalta = sheet.getCellByA1(`C${4 + i}`);

            // Log de numero de faltas
            console.log(`Numero de faltas coletado: ${celulaFalta.value}`)

            // Alocando a nota de cada prova a sua respectiva variável
            console.log(`Coletando notas das provas`)
            let celulaProva1 = sheet.getCellByA1(`D${4 + i}`);
            let celulaProva2 = sheet.getCellByA1(`E${4 + i}`);
            let celulaProva3 = sheet.getCellByA1(`F${4 + i}`);


            // Realizando calculo da média
            console.log(`Calculando média do aluno.`)
            let mediaAluno = ((celulaProva1.value + celulaProva2.value + celulaProva3.value) / 3).toFixed(1);

            // Log da média
            console.log(`Média do aluno ${nomeAluno.value}: ${mediaAluno}`)

            // Alocando referencia da celular da situação à variável resultadoSituação
            let resultadoSituacao = sheet.getCellByA1(`G${4 + i}`);

            // Alocando referencia da celula de Naf à variável celulaNaf
            let celulaNaf = sheet.getCellByA1(`H${4 + i}`);
            
            // Condicionais para definir situação final de cada aluno
            // Caso o aluno possua a média inferior a 5.
            if (mediaAluno < 50) {
                resultadoSituacao.value = 'Reprovado por NOTA';
                celulaNaf.value = 0;
                console.log(`O aluno ${nomeAluno.value} foi reprovado por nota.`)
            }
            // Caso o aluno possua a média acima de 7.
            else if (mediaAluno >= 70) {
                resultadoSituacao.value = 'Aprovado!';
                celulaNaf.value = 0;
                console.log(`O aluno ${nomeAluno.value} foi aprovado.`)
            } 
            // Caso o aluno possua a média entre 5 e 7.
            else if (mediaAluno >= 50 && mediaAluno < 70) { 
                resultadoSituacao.value = 'Exame Final.';
                let notaNaf = Math.floor(100 - mediaAluno);
                celulaNaf.value = notaNaf;
                console.log(`O aluno ${nomeAluno.value} esta para Exame Final.`)
            }
            // Caso o numero de faltas do aluno ultrapasse 15.
            if (celulaFalta.value > 15) {
                resultadoSituacao.value = 'Reprovado por FALTA';
                celulaNaf.value = 0;
                console.log(`O aluno ${nomeAluno.value} foi reprovado por falta.`)
            }
            await sheet.saveUpdatedCells();
        }
    return console.log(`Processo concluído com sucesso.`);
}
    catch {
        return console.log(`Algo deu errado, por favor limpe os dados aplicados na planilha e tente novamente.`)
    }
}
accessSpreadsheet();