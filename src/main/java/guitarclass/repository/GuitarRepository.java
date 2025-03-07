package guitarclass.repository;// GuitarRepository.java
import guitarclass.entity.Guitar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GuitarRepository extends JpaRepository<Guitar, Long> {
    void deleteById(Long id);

//    Optional<Object> findById(Long id);

    // Additional query methods if needed

}
