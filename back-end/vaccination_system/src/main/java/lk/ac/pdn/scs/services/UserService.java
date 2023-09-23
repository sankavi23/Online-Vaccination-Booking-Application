package lk.ac.pdn.scs.services;

import org.springframework.security.core.userdetails.UserDetailsService;

import lk.ac.pdn.scs.model.User;
import lk.ac.pdn.scs.web.dto.UserRegistrationDto;

public interface UserService extends UserDetailsService{
	 User save(UserRegistrationDto registrationDto);
	}