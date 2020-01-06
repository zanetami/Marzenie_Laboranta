package lab_dream.controller




import lab_dream.model.Rel_iu
import lab_dream.model.Sensitive_data
import lab_dream.model.Users
import lab_dream.repo.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class WebController {
    @Autowired
    lateinit var repository: UsersRepository
    @Autowired
    lateinit var repositorySensitive:SensitiveRepository
    @Autowired
    lateinit var repositoryDevice:DeviceRepository
    @Autowired
    lateinit var repositoryIssue: IssueRepository
    @Autowired
    lateinit var repositoryRel_ui:Rel_uiRepository

    @RequestMapping("/registration/{user}")
    fun registration(@PathVariable user:String):Boolean {
        var U = user.split(" ")
        if(repositorySensitive.findByLogin(U[4])==null) {

            var Us = Users(U[0], U[1], U[2], U[3])
            repository.save(Us)
            repositorySensitive.save(Sensitive_data(U[4], U[5]))
            return true
        }
        else
            return false
    }
    @RequestMapping("/login/{login}")
    fun login(@PathVariable login: String):Boolean = repositorySensitive.findByLogin(login.split(" ")[0]).password == login.split(" ")[1]

    /* @RequestMapping("/abc/{login}")
     fun abc(@PathVariable login: String):Sensitive_data=repositorySensitive.findByLogin(login)*/
    @RequestMapping("/add_issue/{id_u}/{id_d}/{description}")
    fun add_issue(@PathVariable id_u:Long,@PathVariable id_d:Long, @PathVariable description:String):Boolean{
        repositoryIssue.addIssue(description,1)
        repositoryRel_ui.save(Rel_iu(id_u,repositoryIssue.findId()))

        return true;
    }
    /*@RequestMapping("/show/{id_u}")
    fun showIssue(@PathVariable id_u: Long):List<Issue>{
        var rel = repositoryRel_ui.showIssue(id_u)
        /*rel.forEach {
            repositoryIssue.findOne(it.)
        }*/


    }*/

    @RequestMapping("/delete_user/{id}")
    fun delete(@PathVariable id:Long):Boolean{
        return try {
            repository.delete(id)
            true
        }
        catch (e:Exception){
            false
        }
    }
}

