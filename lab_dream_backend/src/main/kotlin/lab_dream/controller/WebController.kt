package lab_dream.controller




import jdk.nashorn.internal.objects.Global.getDate
import lab_dream.model.*
import lab_dream.repo.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import sun.security.provider.MD4
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*
import javax.management.relation.Role

@RestController
class WebController {
    @Autowired
    lateinit var repository: UsersRepository
    @Autowired
    lateinit var repositorySensitive:SensitiveRepository
    @Autowired
    lateinit var repositoryIssue: IssueRepository
    @Autowired
    lateinit var repositoryDevice: DeviceRepository
    @Autowired
    lateinit var repository_id:Rel_idRepository
    @Autowired
    lateinit var  repository_ui:Rel_uiRepository
    @RequestMapping("/registration/{user}")
    fun registration(@PathVariable user:String):Boolean {
        var U = user.split(" ")
        if(repositorySensitive.findByLogin(U[4])==null) {
            var rola=ROLE.valueOf(U[3]);
            var Us=Users(U[0], U[1],U[3], U[2])
            repository.save(Us)
            repositorySensitive.save(Sensitive_data(U[4], U[5]))
            return true
        }
        else
            return false
    }


    @RequestMapping("/login/{login}")
    fun login(@PathVariable login: String):Boolean = repositorySensitive.findByLogin(login.split(" ")[0]).password == login.split(" ")[1]


    @RequestMapping("/add_issue/{id_u}/{id_d}/{description}")
    fun add_issue(@PathVariable id_u:Long,@PathVariable id_d:Long, @PathVariable description:String):Long{
        var issue=Issue(description,LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),"oczekuje","","","",10)
        //repositoryIssue.save(issue)
        issue=repositoryIssue.saveAndFlush(issue)
        var rel_id=Rel_id(issue.id_i,id_d)
        repository_id.saveAndFlush(Rel_id(issue.id_i,id_d))
        var rel_ui=Rel_ui(id_u,issue.id_i)
        repository_ui.saveAndFlush(Rel_ui(id_u,issue.id_i))


        return issue.id_i
    }
    @RequestMapping("/show/{id_u}")
    fun showIssue(@PathVariable id_u: Long):MutableList<Issue>{
        var id_i = repository_ui.findIssue(id_u)
        val issues= mutableListOf<Issue>()
        id_i.forEach {
            var a=repositoryIssue.findById(it).get()
            issues.add(a)
        }
        return issues
    }
    @RequestMapping("/update/{id_i}/{descr}")
    fun update(@PathVariable id_i:Long,@PathVariable descr:String):Boolean{
        return try {
            var issue=repositoryIssue.findById(id_i)
            repositoryIssue.edit(descr,id_i)
            true
        }
        catch (e:Exception){
            false
        }
    }
    @RequestMapping("/delete_user/{id}")
    fun delete(@PathVariable id:Long):Boolean{
       // return try {
            repository.delete(repository.findById(id).get())
           return true
       //}
      //  catch (e:Exception){
      //      false
       // }
    }
    @RequestMapping("/change/{id_i}/{status}")
    fun change(@PathVariable id_i: Long, @PathVariable status:String):Boolean{
       // return try {
            // var issue=  repositoryIssue.findById(id_i).get()
            if (status.equals("in repair")){
                repositoryIssue.changea(status,LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),id_i)
            }
            //else
            if(status.equals("solved")){
                repositoryIssue.changes(status,LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),id_i)
            }
            return true
     //   }
      //  catch (e:Exception){
       //     return false
        //}
    }
}

