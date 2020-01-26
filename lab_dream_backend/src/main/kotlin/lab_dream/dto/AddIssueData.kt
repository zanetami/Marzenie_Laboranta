package lab_dream.dto

import com.fasterxml.jackson.annotation.JsonCreator
import lab_dream.model.Device

data class AddIssueData @JsonCreator constructor(
        val descr: String,
        val priority: String,
        val devices: List<DeviceData>
)