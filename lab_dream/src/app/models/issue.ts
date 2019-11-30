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
//     Awaiting = 'awaiting',
//     In_repair = 'in repair',
//     Solved = 'solved'
// }

// enum Priority {
//     High = 'high',
//     Standard = 'standard',
//     Low = 'low'
// }
