package lab_dream.repo

import lab_dream.model.Rel_id
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface Rel_idRepository: JpaRepository<Rel_id, Long> {

}