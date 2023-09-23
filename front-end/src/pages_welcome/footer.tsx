import Divider from '@mui/material/Divider';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer=()=>{
    return(
        <div style={{ backgroundColor:'#2c73d2',}}>
        <div style={{height:'2%',width:'100%', display:'flex',paddingTop:5}}>
            <div style={{marginLeft:'18%'}}>
                <b style={{color:'white',fontSize:30}}>VACLAB</b>
                <br/>
                <b style={{color:'white',fontSize:15}}>Get your  vaccination with us...</b>


            </div>

            <div style={{marginLeft:'5%'}}>
                 <b style={{color:'white',fontSize:20}}>Services</b>
                <br/>
                <b style={{color:'white',fontSize:15}}>-Vaccination Appointments</b>
                <br/>
                <b style={{color:'white',fontSize:15}}>-Check Vaccines</b>
                <br/>
                <b style={{color:'white',fontSize:15}}>-Check Hospitals</b>
            </div>

            <div style={{display:'flex'}}>
                <FacebookIcon sx={{color:'white',width:40,height:40,marginLeft:10}}/>
                <InstagramIcon sx={{color:'white',width:40,height:40,marginLeft:2}}/>
                <TwitterIcon sx={{color:'white',width:40,height:40,marginLeft:2}}/>
                <YouTubeIcon sx={{color:'white',width:40,height:40,marginLeft:2}}/>
            </div>


        </div>
        <Divider />

        <div>
        <b style={{color:'white',fontSize:20,marginLeft:"35%"}}>    Copyright @ 2023 All right reserved | VACLAB</b>

        </div>

        </div>
    )
}

export default Footer