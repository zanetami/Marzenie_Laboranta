package lab_dream.dto

import com.fasterxml.jackson.annotation.JsonCreator
import lab_dream.model.Device

data class IssueData @JsonCreator constructor(
        val descrp: String?,
        val notif_d: String?,
        val state: String?,
        val priority: String?,
        val accept_d: String?,
        val solve_d:String?
)