package lab_dream.dto

import com.fasterxml.jackson.annotation.JsonCreator

data class EditIssueData @JsonCreator constructor(
        val id: Int,
        val fieldToChange: String,
        val newValue: String
)