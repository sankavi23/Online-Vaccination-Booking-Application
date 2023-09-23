package lk.ac.pdn.scs.model;


import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="account")
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="log_id", nullable=false, unique=true)
	private int log_id;
	
	@Column(name="log_username", nullable=false)
	private String log_username;
	

	@Column(name="log_password", nullable=false)
	private String log_password;
	
	private boolean enabled;

	public Account(String log_username, String log_password) {
		super();
		this.log_username = log_username;
		this.log_password = log_password;
		
	}
	
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "accounts_roles",
            joinColumns = @JoinColumn(name = "log_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
            )
    private Set<Role> roles = new HashSet<>();
	

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public int getLog_id() {
		return log_id;
	}

	public void setLog_id(int log_id) {
		this.log_id = log_id;
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

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}


	
	


}
