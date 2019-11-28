package com.hendisantika.controller

import com.hendisantika.model.Sensitive_data
import com.hendisantika.model.Users
import com.hendisantika.repo.SensitiveRepository
import com.hendisantika.repo.UsersRepository
import org.apache.catalina.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.persistence.Id
import javax.validation.constraints.Null

/**
 * Created by hendisantika on 6/30/17.
 */
@RestController
class WebController {
    @Autowired
    lateinit var repository: UsersRepository
    @Autowired
    lateinit var repositorySensitive:SensitiveRepository

    @RequestMapping("/save/{user}")
    fun save(@PathVariable user:String):Boolean {
        var U = user.split(" ")
        var Us=Users(U[0], U[1], U[2], U[3])
        repository.save(Us)
        repositorySensitive.save(Sensitive_data(U[4], U[5]))
        return true
    }
    @RequestMapping("/login/{login}")
    fun login(login: String):Boolean = repositorySensitive.findByLogin(login.split(" ")[0]).password == login.split(" ")[1]
}
