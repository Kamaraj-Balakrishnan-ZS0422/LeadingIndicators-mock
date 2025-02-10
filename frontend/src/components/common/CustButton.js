import Button from "react-bootstrap/Button";

const CustButton = ({children,onClkFn,className,...rest})=>{

  return(
<>
     <Button className={className} onClick={onClkFn} {...rest}>
       {children}
      </Button>
    </>
  )
    
}

export default CustButton;