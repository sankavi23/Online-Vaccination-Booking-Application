package lk.ac.pdn.scs.model;

import java.util.List;

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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="hospitals")
public class Hospital {
	
	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name="h_id", nullable=false, unique=true)
		private int h_id;
		
		@Column(name="h_name", nullable=false)
		private String h_name;
		
		@Column(name="h_email", nullable=false, unique=true)
		private String h_email;
		
		/*
		 * @Column(name="h_password", nullable=false, length=100) private String
		 * h_password;
		 */
		
		@Column(name="h_location",nullable=false)
		private String h_location;
		
		@Column(name="reg_code", nullable=false)
		private String reg_code;
		
		
		
		public Hospital(String h_name, String h_email, String h_location,
				String reg_code) {
			super();
			
			this.h_name = h_name;
			this.h_email = h_email;
			this.h_location = h_location;
			this.reg_code = reg_code;
		}
		
		 @OneToOne(cascade = CascadeType.ALL)
		 @JoinColumn(name = "fk_log_id")
		 private Account account;


		@OneToMany(targetEntity=Appointment.class, cascade=CascadeType.ALL)
		@JoinColumn(name="h_id", referencedColumnName = "h_id")
		private List<Appointment> appointments;
		
		@OneToMany(targetEntity=VaccineDose.class, cascade=CascadeType.ALL)
		@JoinColumn(name="h_id", referencedColumnName = "h_id")
		private List<VaccineDose> vaccineDoses;
		
		@ManyToMany (fetch=FetchType.LAZY, cascade=CascadeType.ALL)
		@JoinTable(
				name= "Hospital_VaccineType", 
				joinColumns= @JoinColumn(name="h_id", referencedColumnName="h_id"),	
				inverseJoinColumns = @JoinColumn(name="vt_id", referencedColumnName="vt_id"))
		
		private List<VaccineType> vaccineTypes;
		
		public List<VaccineType> getVaccineTypes() {
			return vaccineTypes;
		}

		public void setVaccineTypes(List<VaccineType> vaccineTypes) {
			this.vaccineTypes = vaccineTypes;
		}

	
		public List<Appointment> getAppointments() {
			return appointments;
		}

		public void setAppointments(List<Appointment> appointments) {
			this.appointments = appointments;
		}

		public List<VaccineDose> getVaccineDoses() {
			return vaccineDoses;
		}

		public void setVaccineDoses(List<VaccineDose> vaccineDoses) {
			this.vaccineDoses = vaccineDoses;
		}

		

		public int getH_id() {
			return h_id;
		}

		public void setH_id(int h_id) {
			this.h_id = h_id;
		}

		public String getH_name() {
			return h_name;
		}

		public void setH_name(String h_name) {
			this.h_name = h_name;
		}

		public String getH_email() {
			return h_email;
		}

		public void setH_email(String h_email) {
			this.h_email = h_email;
		}

		public String getH_location() {
			return h_location;
		}

		public void setH_location(String h_location) {
			this.h_location = h_location;
		}

		public String getReg_code() {
			return reg_code;
		}

		public void setReg_code(String reg_code) {
			this.reg_code = reg_code;
		}

		public Account getAccount() {
			return account;
		}

		public void setAccount(Account account) {
			this.account = account;
		}
		
		
}
