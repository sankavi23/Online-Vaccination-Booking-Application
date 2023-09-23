package lk.ac.pdn.scs.web.dto;

import lk.ac.pdn.scs.model.Gender;

public class UserRegistrationDto {
	
	private String u_fname;
	private String u_lname;
	private String u_email;
	private String u_password;
	private String u_address;
	private String u_mobile;
	private String u_dob;
	private Gender u_gender;
	
	
	public UserRegistrationDto(String u_fname, String u_lname, String u_email, String u_password, String u_address,
			String u_mobile, String u_dob, Gender u_gender) {
		super();
		this.u_fname = u_fname;
		this.u_lname = u_lname;
		this.u_email = u_email;
		this.u_password = u_password;
		this.u_address = u_address;
		this.u_mobile = u_mobile;
		this.u_dob = u_dob;
		this.u_gender = u_gender;
	}
	
	public UserRegistrationDto() {
		// TODO Auto-generated constructor stub
	}

	public String getU_fname() {
		return u_fname;
	}
	public void setU_fname(String u_fname) {
		this.u_fname = u_fname;
	}
	public String getU_lname() {
		return u_lname;
	}
	public void setU_lname(String u_lname) {
		this.u_lname = u_lname;
	}
	public String getU_email() {
		return u_email;
	}
	public void setU_email(String u_email) {
		this.u_email = u_email;
	}
	public String getU_password() {
		return u_password;
	}
	public void setU_password(String u_password) {
		this.u_password = u_password;
	}
	public String getU_address() {
		return u_address;
	}
	public void setU_address(String u_address) {
		this.u_address = u_address;
	}
	public String getU_mobile() {
		return u_mobile;
	}
	public void setU_mobile(String u_mobile) {
		this.u_mobile = u_mobile;
	}
	public String getU_dob() {
		return u_dob;
	}
	public void setU_dob(String u_dob) {
		this.u_dob = u_dob;
	}
	public Gender getU_gender() {
		return u_gender;
	}
	public void setU_gender(Gender u_gender) {
		this.u_gender = u_gender;
	}
	

}
