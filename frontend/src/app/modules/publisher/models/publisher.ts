import { Address } from './address';
import { Game } from 'src/app/modules/games/models/games.model';

export class Publisher {
    id: string;
    name: string;
    email: string;
    document: string;
    typePerson: string;
    foundationDate: string;
    address: Address;
    games: Game[];
}

