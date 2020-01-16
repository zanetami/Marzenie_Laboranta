package lab_dream.repo

import lab_dream.model.Users
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<Users, Int> {
    fun findByLoginAndPassword(login: String, password: String): Users?
    fun findByLogin(login: String): Users?
}