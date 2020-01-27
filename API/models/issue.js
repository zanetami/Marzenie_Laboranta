class Issue {
    constructor(id, descr, state, priority, notif_d, accept_d, solve_d, solver_id, initiator_id) {
        this.id = id;
        this.descr = descr
        this.state = state
        this.priority = priority
        this.notif_d = notif_d
        this.accept_d = accept_d
        this.solve_d = solve_d
        this.solver_id = solver_id
        this.initiator_id = initiator_id
    }
  }

  module.exports = {
    Issue
  }