export default function moedaParaNumber(moeda: string): number | null {
    const number = Number(moeda.replaceAll('.', '').replace(',','.'));
    if(isNaN(number)){
        return null
    }else{
        return number
    }
} 