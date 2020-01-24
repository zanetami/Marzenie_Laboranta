package lab_dream.model

import javax.persistence.*

enum class ROLE{
    service,
    user,
    admin
}
@Entity
@Table(name="users")
class Users (
       @Column(name = "name")
        val name:String,
        @Column(name="lastname")
        val lastname:String,
        @Column(name="role")
        val role:String,
        @Column(name="company")
        val company:String,
        @GeneratedValue(strategy = GenerationType.AUTO) @Id
        var id_u:Long=-1

){
    private constructor():this("","","","")


}


