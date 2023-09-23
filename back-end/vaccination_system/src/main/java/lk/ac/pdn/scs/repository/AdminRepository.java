package lk.ac.pdn.scs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lk.ac.pdn.scs.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {

}
