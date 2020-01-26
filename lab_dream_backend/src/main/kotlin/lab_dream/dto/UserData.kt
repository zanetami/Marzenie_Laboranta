package lab_dream.dto

import com.fasterxml.jackson.annotation.JsonCreator

data class UserData @JsonCreator constructor(
        val id: Int?,
        val name: String,
        val lastname: String,
        val company: String,
        val role: String,
        val login: String,
        var password:String
)