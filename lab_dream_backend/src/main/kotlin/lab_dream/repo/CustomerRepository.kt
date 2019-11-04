package lab_dream.repo

import lab_dream.model.users
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface CustomerRepository : CrudRepository<users, Long> {
    fun findByLastName(lastName: String): Iterable<users>
}