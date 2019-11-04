package lab_dream.controller

import lab_dream.model.users
import lab_dream.repo.CustomerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class WebController {
    @Autowired
    lateinit var repository: CustomerRepository

    @RequestMapping("/new")
        fun save(): String {
            repository.save(users("Hendi", "Santika","Polsl","Serwis"))

            return "Done"
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

