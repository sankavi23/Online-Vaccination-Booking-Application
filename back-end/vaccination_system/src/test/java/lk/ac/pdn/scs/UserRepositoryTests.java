package lk.ac.pdn.scs;


import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.Rollback;

import lk.ac.pdn.scs.model.Gender;
import lk.ac.pdn.scs.model.User;
import lk.ac.pdn.scs.repository.UserRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
@Rollback(false)
public class UserRepositoryTests {
	@Autowired
	private UserRepository repo;
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Test
	
	public void testCreateUser() {
		User user = new User();
		user.setU_fname("athi");
		user.setU_lname("atunn");
		user.setU_email("sarveee@gmail.com");
		user.setU_address("Kandy");
		user.setU_mobile("0774567342");
		user.setU_dob("1997-01-23");
		user.setU_gender(Gender.F);
		user.setU_password("priya20");
		
		User savedUser = repo.save(user);
		
		User existUser = entityManager.find(User.class, savedUser.getU_id());
		
		assertThat(user.getU_email()).isEqualTo(existUser.getU_email());
	}
	
	@Test
	public void testFindByEmail() {
		String email = "arav@gmail.com";
		User user = repo.findByEmail(email);
		
		assertThat(user.getU_email()).isEqualTo(email);
	}
	
	
	
	
}
