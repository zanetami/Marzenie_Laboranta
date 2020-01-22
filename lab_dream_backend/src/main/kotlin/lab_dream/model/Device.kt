package lab_dream.model

import javax.persistence.*

@Entity
@Table(name="device")
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