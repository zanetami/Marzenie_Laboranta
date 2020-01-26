package lab_dream.repo

import lab_dream.model.Laboratory
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface LabRepository : JpaRepository<Laboratory, Int> {
}