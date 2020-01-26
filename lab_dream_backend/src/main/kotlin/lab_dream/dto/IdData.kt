package lab_dream.dto

import com.fasterxml.jackson.annotation.JsonCreator

data class IdData @JsonCreator constructor(
        val id: Int
)