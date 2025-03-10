package guitarclass.repository;

import guitarclass.entity.GuitarPart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuitarPartRepository extends JpaRepository<GuitarPart, Long> {
}