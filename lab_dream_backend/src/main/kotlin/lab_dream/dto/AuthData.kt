package lab_dream.dto

import com.fasterxml.jackson.annotation.JsonCreator

data class AuthData @JsonCreator constructor(
        val login: String,
        val password: String
)