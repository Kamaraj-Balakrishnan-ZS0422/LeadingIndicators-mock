import mainlogo from '../../assets/imgs/veolialogo.png';
import { Button } from 'react-bootstrap';


function GoogleButton() {

  
  const handleUserlogin =()=>{
    window.location.href = 'http://localhost:3001/api/v1/auth/google';     
  }

  return (
    <div style={{ backgroundColor: "#f2f2f2",height:'100vh'}} className='text-center'>
    <img
              alt=""
              src={mainlogo}
              width="200"
              height="180"
              paddingTop="80px"
              className="d-inline-block"
            />
    <h2 className='leadind-indextitle' style={{}}>Leading Indicators</h2>
    <p style={{paddingTop:'10px',paddingBottom: '40px'}}>Please login with your verified Account</p>
     <Button className='login-with-google-btn' onClick={handleUserlogin}>SignIn With Google</Button>
     
  </div>
 
  );
}

export default GoogleButton;