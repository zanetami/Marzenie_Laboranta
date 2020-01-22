package lab_dream.repo

import lab_dream.model.ROLE
import lab_dream.model.Users
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*
import javax.management.relation.Role

@Repository
interface UsersRepository:CrudRepository<Users,Long> {
    //override fun findById(id: Long): Optional<Users>
    @Query("insert into users ( name, lastname, company, role) " +
            "values (?1, ?2, ?3, ?4::role);",nativeQuery = true)
    fun Dodaj(name:String, lastname:String,company:String,role:String)
}