package lk.ac.pdn.scs.controller;



import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lk.ac.pdn.scs.model.User;
import lk.ac.pdn.scs.services.UserService;
import lk.ac.pdn.scs.web.dto.UserRegistrationDto;

@Controller
@RequestMapping("/api/v1/user")
public class UserController {

	//@Autowired
	private UserService userService;
	
	
	public UserController(UserService userService) {
        super();
        this.userService = userService;
	
	}
	
    @ModelAttribute("user")
    public UserRegistrationDto userRegistrationDto() {
        return new UserRegistrationDto();
    }

	@GetMapping("/home")
	public String viewHomePage() {
		System.out.println("Success");
		return "index"; 
	}
	
	@GetMapping("/signup")
	public String showRegistrationForm(Model model) {
		model.addAttribute("user", new User());
		return "signup"; 
	}
	
	 @PostMapping("/registration")
	 public String registerUserAccount(@ModelAttribute("user") UserRegistrationDto registrationDto) {
		 
		 userService.save(registrationDto);
		 return "redirect:/registration?success";
	  }

}
