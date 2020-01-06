package lab_dream.repo

import lab_dream.model.Rel_iu
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface Rel_uiRepository:CrudRepository<Rel_iu,Long> {
    @Query("Select * From rel_ui where id_u==?1",nativeQuery = true)
    fun showIssue(id_u:Long):List<Rel_iu>
}