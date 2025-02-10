import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function Footer() {

  

  return (
    <Navbar collapseOnSelect  expand="lg" className="bg-secondary ">
      <Container>
        <p className="mx-auto text-light pt-2">Leading Indicators @ 2024</p>
      </Container>
    </Navbar>
  );
}

export default Footer;