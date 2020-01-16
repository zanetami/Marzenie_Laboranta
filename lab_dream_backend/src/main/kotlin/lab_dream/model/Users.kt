package lab_dream.model

import org.hibernate.annotations.Type
import javax.persistence.*

@Entity
@Table(name = "users")
class Users(
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_id_seq")
        @SequenceGenerator(name = "users_id_seq", sequenceName = "users_id_seq", allocationSize = 1)
        @Column(name = "id")
        val id: Int,
        @Column(name = "name")
        val name: String,
        @Column(name = "lastname")
        val lastname: String,
        @Column(name = "role")
        val role: String,
        @Column(name = "company")
        val company: String,
        @Column(name = "login", unique = true)
        val login: String,
        @Column(name = "password", unique = true)
        val password: String
        ) {

}