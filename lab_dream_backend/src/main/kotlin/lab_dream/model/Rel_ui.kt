package lab_dream.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class Rel_ui(
        var id_u:Long,
        var id_i:Long,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id_rui:Long=-1
) {
    //private constructor():this(-1,-1)
}