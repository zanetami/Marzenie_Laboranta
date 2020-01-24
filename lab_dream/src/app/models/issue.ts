export interface Issue {
    id_i: number;
    descr: string;
    state: string;
    priority: string;
    notif_d: Date;
    accept_d: Date;
    solve_d: Date;
    solver_id: number;
}
