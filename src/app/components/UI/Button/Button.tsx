import { ButtonStyle } from "./ButtonStyle";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
  }
  
  const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
    return (
      <ButtonStyle
        onClick={onClick}
      >
        {children}
      </ButtonStyle>
    );
  };
  
  export default Button;