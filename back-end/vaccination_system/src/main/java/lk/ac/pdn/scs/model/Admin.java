package lk.ac.pdn.scs.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="admin")

public class Admin {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="a_id", nullable=false, unique=true)
	private String a_id;
	
	@Column(name="a_fname", nullable=false)
	private String a_fname;
	
	@Column(name="a_lname", nullable=false)
	private String a_lname;
	
	@Column(name="a_email",nullable=false, unique=true)
	private String a_email;
	
	
	
	public Admin(String a_id, String a_fname, String a_lname, String a_email) {
		super();
		this.a_id = a_id;
		this.a_fname = a_fname;
		this.a_lname = a_lname;
		this.a_email = a_email;
	}

	/*
	 * @Column(name="a_password") private String a_password;
	 */
	 @OneToOne(cascade = CascadeType.ALL)
	 @JoinColumn(name = "fk_log_id")
	 private Account account;
	
	@OneToMany(targetEntity=Hospital.class, cascade=CascadeType.ALL)
	@JoinColumn(name="a_id", referencedColumnName = "a_id")
	private List<Hospital> hospitals;
	
	@OneToMany(targetEntity=Hospital.class, cascade=CascadeType.ALL)
	@JoinColumn(name="a_id", referencedColumnName = "a_id")
	private List<User> users;
	




	public String getA_id() {
		return a_id;
	}

	public void setA_id(String a_id) {
		this.a_id = a_id;
	}

	public String getA_fname() {
		return a_fname;
	}

	public void setA_fname(String a_fname) {
		this.a_fname = a_fname;
	}

	public String getA_lname() {
		return a_lname;
	}

	public void setA_lname(String a_lname) {
		this.a_lname = a_lname;
	}

	public String getA_email() {
		return a_email;
	}

	public void setA_email(String a_email) {
		this.a_email = a_email;
	}

	public List<Hospital> getHospitals() {
		return hospitals;
	}

	public void setHospitals(List<Hospital> hospitals) {
		this.hospitals = hospitals;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}
	
	



}
