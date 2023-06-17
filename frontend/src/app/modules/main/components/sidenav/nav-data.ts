import { INavbarData } from "./models/sidenav.model";

export const navbarData: INavbarData[] = [
    {
        routeLink: '',
        icon: 'house',
        label: 'Home'
    },
    {
        routeLink: 'publishers',
        icon: 'edit_note',
        label: 'Cadastro',
        items: [
            {
                routeLink: 'publishers/list',
                label: 'Publishers'
            },
            {
                routeLink: 'games/list',
                label: 'Games'
            }
        ]
    },
];