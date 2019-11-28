package com.hendisantika.repo

import com.hendisantika.model.Sensitive_data
import com.hendisantika.model.Users
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UsersRepository:CrudRepository<Users,Long> {

}