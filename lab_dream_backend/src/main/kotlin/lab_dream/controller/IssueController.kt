package lab_dream.controller

import lab_dream.dto.*
import lab_dream.model.Device
import lab_dream.model.Issue
import lab_dream.repo.DeviceRepository
import lab_dream.repo.IssueRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.auditing.CurrentDateTimeProvider
import org.springframework.web.bind.annotation.*
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.*

@RestController
class IssueController {
    @Autowired
    lateinit var issueRepository: IssueRepository
    @Autowired
    lateinit var deviceRepository: DeviceRepository

    @GetMapping("/allIssues")
    fun allIssues(): List<Issue> {
        return issueRepository.findAll()
    }

    @PostMapping("/deleteIssue")
    fun deleteIssue(@RequestBody data: IdData): Boolean {
        if(issueRepository.findById(data.id).isPresent) {
            issueRepository.deleteById(data.id)
            return true
        }
        return false
    }

    @PutMapping("/editIssue")
    @ResponseBody
    fun editIssue(@RequestBody data: EditIssueData): Boolean {
        var i: Issue?=null
        i=issueRepository.getOne(data.id)
        if(data.fieldToChange=="descr")
            i.descr=data.newValue
        if(data.fieldToChange=="state"){
            i.state=data.newValue
            if(data.newValue=="przyjeto") {
                i.accept_d=java.util.Calendar.getInstance().time
            }
            if(data.newValue=="wykonano") {
                i.solve_d=java.util.Calendar.getInstance().time
            }
            if(data.newValue=="oczekuje") {
                i.accept_d=null
                i.solve_d=null
            }
        }
        if(data.fieldToChange=="priority")
            i.priority=data.newValue

        issueRepository.save(i)
        return true
    }

    @PostMapping("/addIssue")
    fun addIssue(@RequestBody(required = false) data: AddIssueData): Boolean {
        var issue = Issue(data.descr, java.util.Calendar.getInstance().time, "oczekuje", data.priority, null, null)
        issueRepository.save(issue)
        val size = data.devices.size

        var device: Device? = null
        for (x in 0 until size) {
            println(x)
            if (deviceRepository.existsById(data.devices.get(x).id)) {
                device = deviceRepository.getOne(data.devices.get(x).id)
                if (device.issue == null) {
                    device.issue = issueRepository.findOneByDescr(data.descr)
                    deviceRepository.save(device)
                }
            }
        }
        return true

    }

}