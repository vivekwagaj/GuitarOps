package guitarclass.service;// GuitarService.java
import guitarclass.entity.Guitar;
import guitarclass.repository.GuitarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuitarService {

    private final GuitarRepository guitarRepository;

    @Autowired
    public GuitarService(GuitarRepository guitarRepository) {
        this.guitarRepository = guitarRepository;
    }

    public List<Guitar> getAllGuitars() {
        return guitarRepository.findAll();
    }

    public Guitar getGuitarById(Long id) {
        return (Guitar) guitarRepository.findById(id).orElse(null);
    }

    public Guitar createGuitar(Guitar guitar) {
        return guitarRepository.save(guitar);
    }

    public void deleteGuitar(Long id) {
        guitarRepository.deleteById(id);
    }

    public Guitar updateGuitar(Long id, Guitar updatedGuitar) {
        Guitar existingGuitar = (Guitar) guitarRepository.findById(id).orElse(null);
        if (existingGuitar != null) {
            // Update the existing guitar with the new data

            existingGuitar.setBrand(updatedGuitar.getBrand());
            existingGuitar.setModel(updatedGuitar.getModel());
            // Update other properties as needed

            // Save the updated guitar
            return guitarRepository.save(existingGuitar);
        } else {
            return null; // Guitar not found
        }
    }

    // Other methods as needed

}
