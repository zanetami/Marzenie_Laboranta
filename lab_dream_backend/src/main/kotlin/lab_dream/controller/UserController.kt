package lab_dream.controller

import lab_dream.dto.*
import lab_dream.model.Users
import lab_dream.repo.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.security.MessageDigest

fun byteArrayToHexString(array: Array<Byte>): String {
    val result = StringBuilder(array.size * 2)

    for (byte: Byte in array) {
        val toAppend: String = String.format("%2X", byte).replace(" ", "0")
        result.append(toAppend)
    }
    result.setLength(result.length)

    return result.toString()
}

fun toMD5Hash(text: String): String {
    var result = ""

    try {
        val md5 = MessageDigest.getInstance("MD5")
        val mdHashBytes = md5.digest(text.toByteArray()).toTypedArray()

        result = byteArrayToHexString(mdHashBytes)
    } catch (e: Exception) {
        result = "error: ${e.message}"
    }

    return result
}

@RestController
class UserController {
    @Autowired
    lateinit var userRepository: UserRepository


    @PostMapping("/register")
    fun save(@RequestBody data: UserData): Boolean {
        data.password = toMD5Hash(data.password)
        var user = Users(data.name, data.lastname, data.company, data.role, data.login, data.password)
        if (userRepository.findByLogin(user.login) == null) {
            userRepository.save(user)
            return true
        }
        return false
    }

    @PostMapping("/login")
    fun login(@RequestBody data: AuthData): Boolean {
        data.password = toMD5Hash(data.password)
        if (userRepository.findByLoginAndPassword(data.login, data.password) != null) {
            return true
        }
        return false
    }

    @PostMapping("/deleteUser")
    fun deleteUser(@RequestBody data: IdData): Boolean {
        if (userRepository.existsById(data.id)) {
            userRepository.deleteById(data.id)
            return true
        }
        return false
    }

    @GetMapping("/allUsers")
    @ResponseBody
    fun allIssues(): List<Users> {
        // val result: MutableList<IssueData> = ArrayList()
        //  issueRepository.findAll().forEach {
        //     result.add( IssueData(it.descr,it.notif_d,it.state,it.priority,it.accept_d,it.solve_d))
        // }
        //    return result
        return userRepository.findAll()
    }

    @PostMapping("/getLogin")
    fun getLogin(@RequestBody data: IdData): String {
        return userRepository.getOne(data.id).login
    }

    @PutMapping("/editUser")
    fun editUser(@RequestBody data: EditUserData): Boolean {
        var user: Users? = null
        if (userRepository.existsById(data.id)) {
            user = userRepository.getOne(data.id)
            user.name = data.name
            user.lastname = data.lastname
            user.company = data.company
            user.role = data.role
            user.login = data.login
            user.password = toMD5Hash(data.password)
            userRepository.save(user)
            return true
        }
        return false
    }




    /*@PutMapping("/update/{id}")
    fun update(@PathVariable id: Int, @RequestBody users: Users): String {
        if (userRepository.existsById(id)) {
            userRepository.save(users)
        } else {
            return "not found"
        }
        return "updated"
    }*/

     /*@PostMapping("/login")
        fun login(@RequestBody sensitiveData: SensitiveData): Boolean {
       val example: Example<SensitiveData> = Example.of(SensitiveData(null, sensitiveData.login, sensitiveData.password))
       val actual: Optional<SensitiveData> = sensitiveDataRepo.findOne(example)

       return actual.isPresent

   }*/

}

