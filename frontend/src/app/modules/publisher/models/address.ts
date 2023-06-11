export class Address {
    id: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    publisherId: string;
}

export class CepDetails {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro: boolean;
}

export type OptionObject = {
    value: string;
    description: string;
}

export const EstadosList: Array<OptionObject> = [
    { value: "AC", description: "Acre" },
    { value: "AL", description: "Alagoas" },
    { value: "AP", description: "Amapá" },
    { value: "AM", description: "Amazonas" },
    { value: "BA", description: "Bahia" },
    { value: "CE", description: "Ceará" },
    { value: "DF", description: "Distrito Federal" },
    { value: "ES", description: "Espírito Santo" },
    { value: "GO", description: "Goiás" },
    { value: "MA", description: "Maranhão" },
    { value: "MT", description: "Mato Grosso" },
    { value: "MS", description: "Mato Grosso do Sul" },
    { value: "MG", description: "Minas Gerais" },
    { value: "PA", description: "Pará" },
    { value: "PB", description: "Paraíba" },
    { value: "PR", description: "Paraná" },
    { value: "PE", description: "Pernambuco" },
    { value: "PI", description: "Piauí" },
    { value: "RJ", description: "Rio de Janeiro" },
    { value: "RN", description: "Rio Grande do Norte" },
    { value: "RS", description: "Rio Grande do Sul" },
    { value: "RO", description: "Rondônia" },
    { value: "RR", description: "Roraima" },
    { value: "SC", description: "Santa Catarina" },
    { value: "SP", description: "São Paulo" },
    { value: "SE", description: "Sergipe" },
    { value: "TO", description: "Tocantins" }
]
