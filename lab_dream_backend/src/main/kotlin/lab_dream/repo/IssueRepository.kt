package lab_dream.repo

import lab_dream.model.Issue
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface IssueRepository : JpaRepository<Issue, Int> {
    fun findOneByDescr(descr: String): Issue
}

