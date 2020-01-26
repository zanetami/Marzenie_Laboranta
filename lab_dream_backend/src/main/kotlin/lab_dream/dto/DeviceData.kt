package lab_dream.dto

import com.fasterxml.jackson.annotation.JsonCreator
import lab_dream.model.Laboratory

data class DeviceData @JsonCreator constructor(
        val id: Int,
        val type: String,
        val brand: String,
        val model: String
     //   val laboratory: Laboratory?=null
)

