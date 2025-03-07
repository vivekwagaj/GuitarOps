package guitarclass.controller;// RepairController.java
import guitarclass.entity.Guitar;
import guitarclass.entity.Repair;
import guitarclass.service.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/repairs")
public class RepairController {

    private final RepairService repairService;

    @Autowired
    public RepairController(RepairService repairService) {
        this.repairService = repairService;
    }

    @GetMapping
    public List<Repair> getAllRepairs() {
        return repairService.getAllRepairs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Repair> getRepairById(@PathVariable Long id) {
        Repair repair = repairService.getRepairById(id);
        if (repair != null) {
            return ResponseEntity.ok(repair);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Repair> createRepair(@RequestBody Repair repair) {
        repair.setId(null);
        Repair createdRepair = repairService.createRepair(repair);
        return ResponseEntity.ok(createdRepair);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Repair> updateGuitar(@PathVariable Long id, @RequestBody Repair updatedrepair) {
        Repair repair = repairService.updateRepair(id, updatedrepair);
        if (repair != null) {
            return ResponseEntity.ok(repair);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRepair(@PathVariable Long id) {
        repairService.deleteRepair(id);
        return ResponseEntity.noContent().build();
    }

    // Other methods as needed

}
