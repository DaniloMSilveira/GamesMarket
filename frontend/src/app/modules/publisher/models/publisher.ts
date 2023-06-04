import { Endereco } from './address';
import { Produto } from 'src/app/produto/models/produto';

export class Publisher {
    id: string;
    nome: string;
    documento: string;
    ativo: boolean;
    tipoPublisher: number;
    endereco: Endereco;
    produtos: Produto[]
}

