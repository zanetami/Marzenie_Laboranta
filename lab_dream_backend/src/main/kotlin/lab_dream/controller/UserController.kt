package lab_dream.controller

import lab_dream.dto.AuthData
import lab_dream.model.Users
import lab_dream.repo.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


@RestController
class UserController {
    @Autowired
    lateinit var userRepository: UserRepository

    @PostMapping("/register")
    fun save(@RequestBody users: Users): Boolean {
        if (userRepository.findByLogin(users.login) == null) {
            userRepository.save(users)
            return true
        }
        return false
    }

    @PostMapping("/login")
    fun login(@RequestBody data: AuthData): Boolean = userRepository.findByLoginAndPassword(data.login, data.password) != null


    @DeleteMapping("/delete")
    fun delete(@RequestParam ID: Int): String {
        userRepository.deleteById(ID)
        return "deleted"
    }

   /* @PutMapping("/update/{id}")
    fun update(@PathVariable id: Int, @RequestBody users: Users): String {
        if (userRepository.existsById(id)) {
            userRepository.save(users)
        } else {
            return "not found"
        }
        return "updated"
    }

     @PostMapping("/login")
        fun login(@RequestBody sensitiveData: SensitiveData): Boolean {
       val example: Example<SensitiveData> = Example.of(SensitiveData(null, sensitiveData.login, sensitiveData.password))
       val actual: Optional<SensitiveData> = sensitiveDataRepo.findOne(example)

       return actual.isPresent

   }*/

}

