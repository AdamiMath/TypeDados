import { CountList } from "./CountBy";
import Estatisticas from "./Estatisticas";
import fetchApi from "./FetchData";
import NormalizarTransacao from "./normalizarTransacao";

async function handleData(){
    const data = await fetchApi<TransacoesAPI[]>('https://api.origamid.dev/json/transacoes.json?');
    if(!data) return;
    const transacoes = data.map(NormalizarTransacao);
    preencherTabela(transacoes)
    preencherEstatisticas(transacoes)
    console.log(transacoes)
    
}

function preencherLista(lista: CountList, containerId: string):void{
    const containerElemento = document.getElementById('pagamento');
    if(containerElemento){
        Object.keys(lista).forEach(key => {
            containerElemento.innerHTML += `<p>${key}: ${lista[key]}</p>`
        })
    }
}

function preencherEstatisticas(transacoes: Transacoes[]): void{
    const data = new Estatisticas(transacoes);

    preencherLista(data.pagamento, 'pagamento');
    preencherLista(data.status, 'status');

    const totalElement = document.querySelector<HTMLElement>("#total span");
    if(totalElement){
        totalElement.innerText = data.total.toLocaleString('pt-BR', {
            style: "currency",
            currency: "BRL" 
        });
    }

    const diaElement = document.querySelector<HTMLElement>("#dia span");
    if(diaElement){
        diaElement.innerText = data.melhorDia[0]
    }

}

function preencherTabela(transacoes: Transacoes[]): void{
    const tabela = document.querySelector('#transacoes tbody');
    if(!tabela) return;
    transacoes.forEach((transacao) => {
        tabela.innerHTML += 
        `
        <tr>
            <td>${transacao.nome}</td>
            <td>${transacao.email}</td>
            <td>${transacao.moeda}</td>
            <td>${transacao.pagamento}</td>
            <td>${transacao.status}</td>
        </tr>
        `
    });
}

handleData();
