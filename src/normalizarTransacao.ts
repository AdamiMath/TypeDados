import moedaParaNumber from "./moedaParaNumber";
import stringToDate from "./stringDate";

    declare global { 
        type pagamentosAPI = "Boleto | Cartão de Crédito";

        interface TransacoesAPI{
            Data: string,
            Nome: string,
            Status: string,
            Email: string,
            ID: number,
            ['Valor (R$)']: string,
            ['Forma de Pagamento']: pagamentosAPI,
            ['Cliente Novo']: number

        }

        interface Transacoes{
            data: Date,
            nome: string,
            status: string,
            email: string,
            id: number,
            moeda: string;
            valor: number | null,
            pagamento: pagamentosAPI,
            novo: boolean;
        }
}

export default function NormalizarTransacao(transacao: TransacoesAPI ): Transacoes{
    return{
        data: stringToDate(transacao.Data),
        nome: transacao.Nome,
        status: transacao.Status,
        email: transacao.Email,
        id: transacao.ID,
        moeda: transacao["Valor (R$)"],
        valor: moedaParaNumber( transacao["Valor (R$)"]),
        pagamento: transacao["Forma de Pagamento"],
        novo: Boolean(transacao["Cliente Novo"]),
    }
}