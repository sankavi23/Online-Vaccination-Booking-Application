package lk.ac.pdn.scs.services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.stereotype.Service;

import lk.ac.pdn.scs.model.User;
import lk.ac.pdn.scs.repository.UserRepository;
import lk.ac.pdn.scs.web.dto.UserRegistrationDto;

@Service
public class UserServiceImpl implements UserService {
	
	  //@Autowired 
	  private UserRepository userRepository;
	  
		
		/*
		 * @Autowired private BCryptPasswordEncoder passwordEncoder;
		 */
	  
	  public UserServiceImpl(UserRepository userRepository) { 
		  super();
		  this.userRepository = userRepository; }
	 

    @Override
    public User save(UserRegistrationDto registrationDto) {
        User user = new User(registrationDto.getU_fname(),
            registrationDto.getU_lname(),
            registrationDto.getU_email(),
            new BCryptPasswordEncoder().encode(registrationDto.getU_password()),
            registrationDto.getU_address(),
            registrationDto.getU_mobile(),
            registrationDto.getU_dob(),
            registrationDto.getU_gender());

        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getU_email(), user.getU_password(), null);
    }

    
}