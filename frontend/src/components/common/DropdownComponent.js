import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../redux/loginSlice';
import { DropdownDivider } from 'react-bootstrap';
import { useTranslate } from '../../context/TranslationContext';
import SessionTimeoutAlert from "../common/SessionTimeoutAlert";

const DropdownComponent = ({btntext,isAdmin})=>{

  const t = useTranslate();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout=()=>{
    dispatch(userLogout());
    localStorage.setItem('jwtToken','');
    navigate('/login');
}
  return (
    <>  
    <SessionTimeoutAlert handleLoginRedirect={handleLogout}/>
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {btntext}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {isAdmin && <> 
        <Dropdown.Item onClick={()=>navigate('/admin/dashboard')}>{t('orphanrecords')}</Dropdown.Item>
        <Dropdown.Item onClick={()=>navigate('/admin/users')}>{t('users')}</Dropdown.Item>
        <DropdownDivider></DropdownDivider>
        </>
            }
        <Dropdown.Item onClick={handleLogout}>{t('logout')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </>
    
  );
}

export default DropdownComponent;