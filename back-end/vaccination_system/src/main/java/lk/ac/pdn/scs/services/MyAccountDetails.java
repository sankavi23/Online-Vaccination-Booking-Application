package lk.ac.pdn.scs.services;

import java.util.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lk.ac.pdn.scs.model.Account;
import lk.ac.pdn.scs.model.Role;

public class MyAccountDetails implements UserDetails{
	 private Account account;
     
	    public MyAccountDetails(Account acc) {
	        this.account = acc;
	    }
	 
	    @Override
	    public Collection<? extends GrantedAuthority> getAuthorities() {
	        Set<Role> roles = account.getRoles();
	        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
	         
	        for (Role role : roles) {
	            authorities.add(new SimpleGrantedAuthority(role.getRole_name()));
	        }
	         
	        return authorities;
	    }
	 
	    @Override
	    public String getPassword() {
	        return account.getLog_password();
	    }
	 
	    @Override
	    public String getUsername() {
	        return account.getLog_username();
	    }
	 
	    @Override
	    public boolean isAccountNonExpired() {
	        return true;
	    }
	 
	    @Override
	    public boolean isAccountNonLocked() {
	        return true;
	    }
	 
	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true;
	    }
	 
		
		  @Override public boolean isEnabled() { 
			  return account.isEnabled();
		}
		  
		/*
		 * @Override public Collection<? extends GrantedAuthority> getAuthorities() {
		 * Set<Role> roles = account.getRoles(); List<SimpleGrantedAuthority>
		 * authorities = new ArrayList<>();
		 * 
		 * for (Role role : roles) { authorities.add(new
		 * SimpleGrantedAuthority(role.getRole_name())); }
		 * 
		 * return authorities; }
		 */
		 

}
