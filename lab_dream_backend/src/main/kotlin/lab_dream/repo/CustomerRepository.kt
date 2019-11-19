package lab_dream.repo

import lab_dream.model.Users
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface CustomerRepository : CrudRepository<Users, Long> {
    fun findByLastName(lastName: String): Iterable<Users>
}