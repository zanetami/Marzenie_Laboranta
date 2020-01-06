package lab_dream.repo

import lab_dream.model.Issue
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface IssueRepository:CrudRepository<Issue,Long> {
    @Query("insert into issue ( descr, state, notif_d , priority) values (?1 ,'oczekuje',NOW(),?2);",nativeQuery = true)
    fun addIssue(descr:String, priority: Int):Boolean
    @Query("SELECT* FROM issue WHERE notif_d==NOW()")
    fun findId():Long
}