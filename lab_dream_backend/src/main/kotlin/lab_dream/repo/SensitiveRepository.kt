package lab_dream.repo

import lab_dream.model.Sensitive_data
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface SensitiveRepository:CrudRepository<Sensitive_data,Long> {
    @Query("SELECT * FROM sensitive_data where login like ?1", nativeQuery = true)
    fun findByLogin(login:String): Sensitive_data
    @Query(" SELECT COUNT(login) FROM sensitive_data WHERE login = ?1", nativeQuery = true)
    fun ifLoginExist(login: String):Int
}