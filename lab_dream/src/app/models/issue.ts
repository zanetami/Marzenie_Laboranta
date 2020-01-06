export interface Issue {
    id_i: number;
    descr: string;
    notif_d: Date;
    state: string;
    priority: string;
    accept_d: Date;
    solve_d: Date;
    solver_id: number;
}

// enum State {
//     Awaiting = 'oczekuje',
//     In_repair = 'w naprawie',
//     Solved = 'rozwiązane'
// }

// enum Priority {
//     High = 'wysoki',
//     Standard = 'normalny',
//     Low = 'niski'
// }
