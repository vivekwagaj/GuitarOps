package guitarclass.controller;// GuitarController.java
import guitarclass.entity.Guitar;
import guitarclass.service.GuitarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/guitars")
public class GuitarController {

    private final GuitarService guitarService;

    @Autowired
    public GuitarController(GuitarService guitarService) {
        this.guitarService = guitarService;
    }

    @GetMapping
    public List<Guitar> getAllGuitars() {
        return guitarService.getAllGuitars();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Guitar> getGuitarById(@PathVariable Long id) {
        Guitar guitar = guitarService.getGuitarById(id);
        if (guitar != null) {
            return ResponseEntity.ok(guitar);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Guitar> createGuitar(@RequestBody Guitar guitar) {
        Guitar createdGuitar = guitarService.createGuitar(guitar);
        return ResponseEntity.ok(createdGuitar);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Guitar> updateGuitar(@PathVariable Long id, @RequestBody Guitar updatedGuitar) {
        Guitar guitar = guitarService.updateGuitar(id, updatedGuitar);
        if (guitar != null) {
            return ResponseEntity.ok(guitar);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGuitar(@PathVariable Long id) {
        guitarService.deleteGuitar(id);
        return ResponseEntity.noContent().build();
    }

    // Other methods as needed

}
