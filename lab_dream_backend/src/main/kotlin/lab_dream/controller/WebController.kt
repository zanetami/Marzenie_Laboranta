package lab_dream.controller

import lab_dream.model.Sensitive
import lab_dream.model.Users
import lab_dream.repo.CustomerRepository
import lab_dream.repo.SensitiveRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
//nazwa tabeli na której działamy
class WebController {
    @Autowired
    lateinit var repository: CustomerRepository
    @Autowired
    lateinit var repo: SensitiveRepository

    @RequestMapping("/registration/{User}")// aby uruchomić tę funkcję należy w przeglądarkę wpisać 127.0.0.1:8090/registration
        fun registration(@PathVariable User:String ): Boolean {
        try {
            var U=User.split(' ')
            repository.save(Users(U[0],U[1],U[2],U[3])) //Zapisywanie danych do bazy
            repo.save(Sensitive(U[4],U[5]))
        }
        catch (e: Exception){
            return false
        }

        return true
        }
    @RequestMapping("/findAll")
    fun findAll() = repository.findAll()

    /*@RequestMapping("/findById/{id}")
    fun findById(@PathVariable id: Long)
            = repository.findOne(id)*/

    @RequestMapping("findByLastname/{lastName}")
    fun findByLastName(@PathVariable lastName: String)
            = repository.findByLastName(lastName)
}

