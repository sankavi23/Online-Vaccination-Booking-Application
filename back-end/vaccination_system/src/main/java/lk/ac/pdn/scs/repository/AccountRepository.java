package lk.ac.pdn.scs.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import lk.ac.pdn.scs.model.Account;

public interface AccountRepository extends CrudRepository<Account, Integer> {
	@Query("SELECT a FROM Account a WHERE a.log_username = :log_username")
    public Account getUserByUsername(@Param("log_username") String log_username);

}
