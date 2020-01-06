package lab_dream.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
@Entity
class Device(
        val type:String,
        val brand:String,
        val model:String,
        val lab:String,
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        val id:Long=-1
) {
    private constructor():this("","","","")
}