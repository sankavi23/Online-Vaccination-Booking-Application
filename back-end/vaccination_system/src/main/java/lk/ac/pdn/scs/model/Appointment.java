package lk.ac.pdn.scs.model;




import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="appointments")

public class Appointment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="app_id")
	private int app_id;
	
	@Column(name="app_date")
	private String app_date;
	
	@Column(name="app_day")
	private String app_day;
	
	@Column(name="app_time")
	private String app_time;
	
	@Enumerated(EnumType.ORDINAL)
	@Column(name="app_status")
    private AppointmentStatus app_status;
	
	
	

	public Appointment(String app_date, String app_day, String app_time, AppointmentStatus app_status) {
		super();
		
		this.app_date = app_date;
		this.app_day = app_day;
		this.app_time = app_time;
		this.app_status = app_status;
	}

	public int getApp_id() {
		return app_id;
	}

	public void setApp_id(int app_id) {
		this.app_id = app_id;
	}

	public String getApp_date() {
		return app_date;
	}

	public void setApp_date(String app_date) {
		this.app_date = app_date;
	}

	public String getApp_day() {
		return app_day;
	}

	public void setApp_day(String app_day) {
		this.app_day = app_day;
	}

	public String getApp_time() {
		return app_time;
	}

	public void setApp_time(String app_time) {
		this.app_time = app_time;
	}

	public AppointmentStatus getApp_status() {
		return app_status;
	}

	public void setApp_status(AppointmentStatus app_status) {
		this.app_status = app_status;
	}
	


}
