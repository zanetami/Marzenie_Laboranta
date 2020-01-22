package lab_dream.repo

import lab_dream.model.Device
import org.springframework.data.repository.CrudRepository

interface DeviceRepository: CrudRepository<Device, Long> {
}