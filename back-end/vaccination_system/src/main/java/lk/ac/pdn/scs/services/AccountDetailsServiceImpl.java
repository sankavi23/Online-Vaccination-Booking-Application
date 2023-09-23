package lk.ac.pdn.scs.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import lk.ac.pdn.scs.model.Account;
import lk.ac.pdn.scs.repository.AccountRepository;

public class AccountDetailsServiceImpl implements UserDetailsService {
	@Autowired
    private AccountRepository accountRepository;
     
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        Account account = accountRepository.getUserByUsername(username);
         
        if (account == null) {
            throw new UsernameNotFoundException("Could not find user");
        }
         
        return new MyAccountDetails(account);
    }

}
