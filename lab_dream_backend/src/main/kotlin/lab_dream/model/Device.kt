package lab_dream.model

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonManagedReference
import javax.persistence.*

@Entity
@Table(name = "device")
class Device(
        @Column(name = "type")
        val type: String,
        @Column(name = "brand")
        val brand: String,
        @Column(name = "model")
        val model: String
) {
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "device_id_seq")
        @SequenceGenerator(name = "device_id_seq", sequenceName = "device_id_seq", allocationSize = 1)
        @Column(name = "id")
        val id: Int = -1

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "issue_id")
        @JsonManagedReference
        var issue: Issue?=null

        @ManyToOne
        @JoinColumn(name = "lab_id")
        @JsonManagedReference
        val laboratory: Laboratory?=null

}