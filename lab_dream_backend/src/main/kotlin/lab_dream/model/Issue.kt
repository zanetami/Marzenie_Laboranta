package lab_dream.model

import javax.persistence.*

@Entity
@Table(name = "issue")
class Issue (
        val descr: String,
        val notif_d: String,
        val state: String,
        val priority: String,
        val accept_d: String,
        val solve_d: String,
        val solver_id: Long,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id_i: Long=-1
) {
    //private constructor() : this("", "", "oczekuje", "1", "", "", -1)
    fun getId():Long{
        return id_i
    }

}