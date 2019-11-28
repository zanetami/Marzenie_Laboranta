package com.hendisantika.repo

import com.hendisantika.model.Sensitive_data
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface SensitiveRepository:CrudRepository<Sensitive_data,Long> {
    @Query("SELECT * FROM sensitive_data where login like ?1", nativeQuery = true)
    fun findByLogin(login:String):Sensitive_data
}