import { Address } from './address';
import { Game } from 'src/app/modules/games/models/games.model';

export class Publisher {
    id: string;
    nome: string;
    documento: string;
    ativo: boolean;
    tipoPublisher: number;
    address: Address;
    produtos: Game[];
}

