import { Button, FormControl, FormLabel, Input, Stack } from "@mui/joy";
import { useEffect, useRef, useState } from "react";

import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";

const AuthForm = ({ onSetIsLoggedIn }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordRef = useRef();
  const [password, setPassword] = useState("");

  const togglePasswordType = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = (e) => {
    e.preventDefault();
    onSetIsLoggedIn();
  };

  // Set cursor at the end of input
  useEffect(() => {
    passwordRef.current.focus();
    const passwordLength = password.length;
    passwordRef.current.setSelectionRange(passwordLength, passwordLength);
  }, [isPasswordVisible]);

  return (
    <form onSubmit={login}>
      <Stack gap={2}>
        <FormControl>
          <FormLabel>E-mail</FormLabel>
          <Input type="email" name="email" id="email" required />
        </FormControl>
        <FormControl>
          <FormLabel>Jelszó</FormLabel>
          <Input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            id="password"
            endDecorator={isPasswordVisible ? <IoIosEye /> : <IoIosEyeOff />}
            slotProps={{
              endDecorator: { onClick: togglePasswordType },
              input: { ref: passwordRef },
            }}
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </FormControl>
        <Button type="submit">Belépés</Button>
        <Button variant="outlined">Regisztráció</Button>
      </Stack>
    </form>
  );
};

export default AuthForm;
