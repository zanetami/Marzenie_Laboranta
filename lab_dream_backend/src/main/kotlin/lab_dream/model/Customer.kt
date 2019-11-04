package lab_dream.model

import javax.persistence.*

@Entity
@Table(name="users")
class users(
        val firstName: String,
        val lastName: String,
        val company : String,
        val role: String,
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long = -1) {

    private constructor() : this("","","","")
}