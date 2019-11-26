package lab_dream.model

import java.net.PasswordAuthentication
import javax.persistence.*

@Entity
@Table(name="users")
class Users(
        val firstName: String,
        val lastName: String,
        val company : String,
        val role: String,
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long = -1) {

    private constructor() : this("","","","")
}
@Entity
@Table(name = "sensitive_data")
class Sensitive(
        val login:String,
        val password:String,
        @Id  @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long = -1){
    private constructor():this("","")
}