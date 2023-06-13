import { INavbarData } from "./models/sidenav.model";

export const navbarData: INavbarData[] = [
    {
        routeLink: '',
        icon: 'house',
        label: 'Home'
    },
    {
        routeLink: 'cadastro',
        icon: 'edit_note',
        label: 'Cadastro',
        items: [
            {
                // routeLink: 'publishers/list',
                routeLink: 'publishers/create',
                label: 'Publishers'
            },
            {
                routeLink: 'games/list',
                label: 'Games'
            }
        ]
    },
];