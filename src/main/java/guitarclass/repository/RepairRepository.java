package guitarclass.repository;// RepairRepository.java
import guitarclass.entity.Repair;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepairRepository extends JpaRepository<Repair, Long> {

//    Optional<Object> findById(Long id);

    void deleteById(Long id);
}
