package guitarclass.service;

import guitarclass.entity.GuitarPart;
import guitarclass.repository.GuitarPartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuitarPartService {

    private final GuitarPartRepository partRepository;

    public GuitarPartService(GuitarPartRepository partRepository) {
        this.partRepository = partRepository;
    }

    public List<GuitarPart> getAllParts() {
        return partRepository.findAll();
    }

    public GuitarPart addPart(GuitarPart part) {
        return partRepository.save(part);
    }

    public void deletePart(Long id) {
        partRepository.deleteById(id);
    }

    public GuitarPart updatePart(Long id, GuitarPart updatedPart) {
        return partRepository.findById(id)
                .map(part -> {
                    part.setName(updatedPart.getName());
                    part.setDescription(updatedPart.getDescription());
                    part.setPrice(updatedPart.getPrice());
                    return partRepository.save(part);
                })
                .orElseThrow(() -> new RuntimeException("Part not found"));
    }
}

