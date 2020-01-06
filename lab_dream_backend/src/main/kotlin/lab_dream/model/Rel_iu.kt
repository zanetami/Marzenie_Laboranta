package lab_dream.model

import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

class Rel_iu(
        id_u:Long,
        id_i:Long,
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        val id_rui:Long=-1
) {
   private constructor():this(-1,-1)
}