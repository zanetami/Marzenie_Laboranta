package lab_dream.repo

import lab_dream.model.Sensitive
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface SensitiveRepository: CrudRepository<Sensitive, Long> {
}