package lab_dream.model

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonManagedReference
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "issue")
class Issue(
        @Column(name = "descr")
        var descr: String,
        @Column(name = "notif_d")
        @Temporal(TemporalType.TIMESTAMP)
        val notif_d: Date?,
        @Column(name = "state")
        var state: String,
        @Column(name = "priority")
        var priority: String,
        @Column(name = "accept_d")
        @Temporal(TemporalType.TIMESTAMP)
        var accept_d: Date?,
        @Column(name = "solve_d")
        @Temporal(TemporalType.TIMESTAMP)
        var solve_d: Date?
        ) {
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "issue_id_seq")
        @SequenceGenerator(name = "issue_id_seq", sequenceName = "issue_id_seq", allocationSize = 1)
        @Column(name = "id")
        val id: Int = -1

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "reporter_id")
        @JsonManagedReference
        val reporter: Users?=null

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "solver_id")
        @JsonManagedReference
        val solver: Users?=null

        @OneToMany(cascade = [(CascadeType.ALL)], mappedBy = "issue")
        @JsonBackReference
        var devices: List<Device>? = null

}

