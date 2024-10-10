export default async function fetchApi<Interface>(url: string): Promise<Interface | null>{

    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error("Erro na requisição")
        const json = await response.json();
        return json
    
    } catch (error) {
        return null
    }


}