export type Game = GameDetails & {
    id: number;
}

export type GameDetails = { 
    name: string;
    company: string;
    category: string;
    version?: string;
    releaseDate: Date;
}

export type GameMainPage = {
    mainGames: GameDetails[]
}
