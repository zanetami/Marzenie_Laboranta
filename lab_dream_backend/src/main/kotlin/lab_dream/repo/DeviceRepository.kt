package lab_dream.repo

import lab_dream.model.Device
import oracle.jrockit.jfr.settings.EventSetting
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DeviceRepository : JpaRepository<Device, Int> {
   fun findAllByIssue_Id(id: Int): List<Device>?
}

