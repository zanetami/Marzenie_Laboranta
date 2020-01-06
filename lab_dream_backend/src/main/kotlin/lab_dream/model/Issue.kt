package lab_dream.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
@Entity
class Issue(
        val descr:String,
        val notif_d:String,
        val state:String,
        val priority:String,
        val accept_d:String,
        val solve_d:String,
        val solver_id:String,
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        val id:Long=-1
) {
    private constructor():this("","","oczekuje","1","","","")
}