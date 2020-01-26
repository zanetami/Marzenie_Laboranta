package lab_dream.controller

import lab_dream.dto.DeviceData
import lab_dream.dto.IdData
import lab_dream.model.Device
import lab_dream.repo.DeviceRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
class DeviceController {
    @Autowired
    lateinit var deviceRepository: DeviceRepository

    @GetMapping("/allDevices")
    @ResponseBody
    fun allDevices(): List<Device> {

        return deviceRepository.findAll()
    }



    @PostMapping("/showDevicesFromIssue")
    @ResponseBody
    fun showDevicesFromIssue(@RequestBody data: IdData): List<DeviceData>? {
        val result: MutableList<DeviceData> = ArrayList()

        deviceRepository.findAllByIssue_Id(data.id)?.forEach {
            result.add(DeviceData(it.id, it.type, it.brand, it.model))
        }
        return result

    }

    /*@PostMapping("/allDevicedLinkedToIssue")
    fun getAllDevices(@RequestBody data: DeleteIssueData): List<Device>{

        return deviceRepository.findAllByIssue_Id(data.id)
    }*/

   // @GetMapping("/allDevicedLinkedToIssue")
  //  fun getAllDevices(): String {
      //  var devices = mutableListOf<Device>()
       // devices.add(deviceRepository.findByIssue_State("oczekuje"))

    //    return deviceRepository.findBy("oczekuje").toString()
  //  }


}