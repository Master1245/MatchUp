// basicamente o mateus cagou pra essa parte, 
// então eu vou fazer tudo fake aqui pra não 
// dar erro no resto do código

export const axiosGetConnections = async () => {

    const response = {
        data: [
            {
                id: 1,
                username: 'Mateus',
                email: 'mateus_corno123@gmail.com',
                bio: 'sou corno',
                avatar: '/images/avatar/user (16).png',
                social_media: 'https://instagram.com/ryan_fragnani?igshid=MzNlNGNkZWQ4Mg=='
            },
            {
                id: 2,
                username: 'Amandinha hot hot',
                email: 'amandinhahohot@emal.com',
                bio: 'sou gostosa',
                avatar: '/images/avatar/user (2).png',
                social_media: 'https://instagram.com/ryan_fragnani?igshid=MzNlNGNkZWQ4Mg=='
            },
            {
                id: 3,
                username: 'Jailson',
                email: 'aiquedelicia',
                bio: 'sou gostoso',
                avatar: '/images/avatar/user (3).png',
                social_media: 'https://instagram.com/ryan_fragnani?igshid=MzNlNGNkZWQ4Mg=='
            }
        ],
        status: 200,
    }

    return response;
};

export const axiosMatches: any = async () => {
    const response = {
        data: [
            {
                type: 'comment',
                comment: 'não recomendo, assim, não é ruim, mas não é bom é bom arriscar a vida assim, sabe?',
                name: 'Nadar na praia do Silveira',
                avatar: '/images/avatar/user (13).png',
                user_id: 1,
            },
            {
                type: 'profile',
                bio: 'sou corno',
                avatar: '/images/avatar/user (16).png',
                user_id: 1,
            },
            {
                type: 'comment',
                comment: 'Muito legal, todo sabado tô lá',
                name: 'Visitar o centro histórico',
                avatar: '/images/avatar/user (4).png',
                user_id: 2,
            },
            {
                type: 'profile',
                bio: 'Existen dois lobos dentro de mim, um é gay e o outro também',
                avatar: '/images/avatar/user (2).png',
                username: 'Amandinha hot hot',
                user_id: 2,
            },
            {
                type: 'comment',
                comment: 'Assim, eu adoro, mais a ultima vez que fui, eu fiz um filho.',
                name: 'Quermesse',
                avatar: '/images/avatar/user (10).png',
                user_id: 3,
            },
            {
                type: 'profile',
                username: 'Jailson',
                bio: 'sou gostoso',
                avatar: '/images/avatar/user (3).png',
                social_media: 'https://instagram.com/ryan_fragnani?igshid=MzNlNGNkZWQ4Mg==',
                user_id: 3,
            }
        ],
        status: 200,
    }
    return response;
}