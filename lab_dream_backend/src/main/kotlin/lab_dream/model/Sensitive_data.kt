package lab_dream.model

import javax.persistence.*

@Entity
//@NamedQuery(name="Sensitive.findByLogin",query = "SELECT * FROM sensitive_data where login like ?1")
class Sensitive_data
    (
          val login:String,
          val password:String,
          @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
          val id:Long=-1
    ){
            private constructor():this("","")
}