package lab_dream.model

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonManagedReference
import javax.persistence.*

@Entity
@Table(name = "laboratory")
class Laboratory(
        @Column(name = "lab_no")
        val lab_no: String
) {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lab_id_seq")
    @SequenceGenerator(name = "lab_id_seq", sequenceName = "lab_id_seq", allocationSize = 1)
    @Column(name = "id")
    var id: Int = -1

    @OneToMany(cascade = [(CascadeType.ALL)], mappedBy = "laboratory")
    @JsonBackReference
    val devices: List<Device>? = null

    @OneToMany(cascade = [(CascadeType.ALL)], mappedBy = "laboratory")
    @JsonBackReference
    val users: List<Users>? = null
}