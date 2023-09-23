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
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="vaccinetype")

public class VaccineType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="vt_id")
	private int vt_id;
	
	@Column(name="vt_name")
	private String vt_name;
	
	@Column(name="quantity")
	private int quantity;
	
	
	
	public VaccineType(String vt_name, int quantity) {
		super();
		
		this.vt_name = vt_name;
		this.quantity = quantity;
	}

	@OneToMany(targetEntity=VaccineDose.class, cascade=CascadeType.ALL)
	@JoinColumn(name="vt_id", referencedColumnName = "vt_id")
	private List<VaccineDose> vaccineDoses;
	
	@ManyToMany(mappedBy="vaccineTypes", fetch=FetchType.LAZY)
	private List<Hospital> hospitals;



	public int getVt_id() {
		return vt_id;
	}

	public void setVt_id(int vt_id) {
		this.vt_id = vt_id;
	}

	public String getVt_name() {
		return vt_name;
	}

	public void setVt_name(String vt_name) {
		this.vt_name = vt_name;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	
	
	

}
