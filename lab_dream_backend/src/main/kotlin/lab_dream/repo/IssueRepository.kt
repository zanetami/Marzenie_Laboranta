package lab_dream.repo

import lab_dream.model.Issue
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface IssueRepository: JpaRepository<Issue, Long> {
    @Query("UPDATE issue Set descr=?1 where id_i=?2",nativeQuery = true)
    fun edit(descr:String, id_i:Long)
    @Query("UPDATE issue set state=?1, accept_d=?2 where id_i=?3",nativeQuery = true)
    fun changea(state:String,date:String, id_i:Long )
    @Query("UPDATE issue set state=?1, solve_d=?2 where id_i=?3",nativeQuery = true)
    fun changes(state:String,date:String, id_i:Long )
}