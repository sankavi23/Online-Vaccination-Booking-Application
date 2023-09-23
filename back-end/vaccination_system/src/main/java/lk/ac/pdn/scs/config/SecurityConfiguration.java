package lk.ac.pdn.scs.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import lk.ac.pdn.scs.services.AccountDetailsServiceImpl;
import lk.ac.pdn.scs.services.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	 @Bean
	    public UserDetailsService userDetailsService() {
	        return new AccountDetailsServiceImpl();
	    }
	     

	
	   @Bean
	    public BCryptPasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
	   
	   
	    @Bean
	    public DaoAuthenticationProvider authenticationProvider() {
	        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
	        authProvider.setUserDetailsService(userDetailsService());
	        authProvider.setPasswordEncoder(passwordEncoder());
	         
	        return authProvider;
	    }
	    
	    
	 
	 

	
	  @Bean 
	  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception { 
		  http.csrf().disable() 
		  .authorizeHttpRequests((authorize) ->
	  authorize.antMatchers("/register/**").permitAll()
	  .antMatchers("/index").permitAll()
	  .antMatchers("/admin").hasRole("ADMIN")
	  ).formLogin( form -> form .loginPage("/login") .loginProcessingUrl("/login")
	  .defaultSuccessUrl("/users") .permitAll() ).logout( logout -> logout
	  .logoutRequestMatcher(new AntPathRequestMatcher("/logout")) .permitAll() );
		  return http.build();
	  }
	  

}