package lab_dream.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class Rel_id(
        var id_i:Long,
        var id_d:Long,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id_rid:Long=-1
) {
    //private constructor():this(id_d = -1,id_i = -1)
}