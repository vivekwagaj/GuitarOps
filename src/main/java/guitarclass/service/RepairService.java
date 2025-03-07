package guitarclass.service;// RepairService.java
import guitarclass.entity.Guitar;
import guitarclass.entity.Repair;
import guitarclass.repository.RepairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepairService {

    private final RepairRepository repairRepository;

    @Autowired
    public RepairService(RepairRepository repairRepository) {
        this.repairRepository = repairRepository;
    }

    public List<Repair> getAllRepairs() {
        return repairRepository.findAll();
    }

    public Repair getRepairById(Long id) {
        return (Repair) repairRepository.findById(id).orElse(null);
    }

    public Repair createRepair(Repair repair) {
        return repairRepository.save(repair);
    }

    public void deleteRepair(Long id) {
        repairRepository.deleteById(id);
    }

    public Repair updateRepair(Long id, Repair updatedRepair) {
        Repair existingRepair = (Repair) repairRepository.findById(id).orElse(null);
        if (existingRepair != null) {
            // Update the existing guitar with the new data
            existingRepair.setIssue(updatedRepair.getIssue());
            existingRepair.setDescription(updatedRepair.getDescription());
            existingRepair.setResolved(updatedRepair.isResolved());
            // Update other properties as needed

            // Save the updated guitar
            return repairRepository.save(existingRepair);
        } else {
            return null; // Guitar not found
        }
    }
    // Other methods as needed

}
