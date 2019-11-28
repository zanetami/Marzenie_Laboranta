package com.hendisantika.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class Users (
        val first_name:String,
        val last_name:String,
        val role:String,
        val company:String,
        @Id @GeneratedValue(strategy = GenerationType.AUTO)
        val id:Long=-1

){
    private constructor():this("","","","")
}

