package lab_dream.repo

import lab_dream.model.Rel_ui
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface Rel_uiRepository: JpaRepository<Rel_ui, Long> {
    @Query("Select id_i from rel_ui where id_u=?1",nativeQuery = true)
    fun findIssue(id_u:Long):List<Long>
}