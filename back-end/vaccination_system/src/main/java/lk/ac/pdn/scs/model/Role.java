package lk.ac.pdn.scs.model;


import javax.persistence.*;
 
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @Column(name = "role_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
     
    @Column(name="role_name")
    private String role_name;
    
	public Role(int id, String role_name) {
		super();
		this.id = id;
		this.role_name = role_name;
	}
    

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRole_name() {
		return role_name;
	}

	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}


    
    
   

     
   
}