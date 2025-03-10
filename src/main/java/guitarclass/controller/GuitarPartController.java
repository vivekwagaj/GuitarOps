package guitarclass.controller;

import guitarclass.entity.GuitarPart;
import guitarclass.service.GuitarPartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
public class GuitarPartController {

    private final GuitarPartService partService;

    public GuitarPartController(GuitarPartService partService) {
        this.partService = partService;
    }

    @GetMapping
    public List<GuitarPart> getAllParts() {
        return partService.getAllParts();
    }

    @PostMapping
    public ResponseEntity<GuitarPart> addPart(@RequestBody GuitarPart part) {
        GuitarPart createdPart = partService.addPart(part);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPart);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePart(@PathVariable Long id) {
        partService.deletePart(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<GuitarPart> updatePart(@PathVariable Long id, @RequestBody GuitarPart part) {
        GuitarPart updatedPart = partService.updatePart(id, part);
        return ResponseEntity.ok(updatedPart);
    }
}
