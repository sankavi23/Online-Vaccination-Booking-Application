package lk.ac.pdn.scs.web.dto;

import lk.ac.pdn.scs.model.Role;

public class LoginDto {
	
	private String log_username;
	private String log_password;
	private Role role;
	
	public LoginDto(String log_username, String log_password, Role role) {
		super();
		this.log_username = log_username;
		this.log_password = log_password;
		this.role = role;
	}

	public String getLog_username() {
		return log_username;
	}

	public void setLog_username(String log_username) {
		this.log_username = log_username;
	}

	public String getLog_password() {
		return log_password;
	}

	public void setLog_password(String log_password) {
		this.log_password = log_password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	
	
	
	
	

}
