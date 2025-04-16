import { Button, FormControl, FormLabel, Input, Stack } from "@mui/joy";
import { useEffect, useRef, useState, useContext } from "react";
import { AuthContext } from "../../AuthProvider";

import SignUpModal from "./SignUpModal";

import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setIsMenuOpen } from "../../store/appSlice";

const AuthForm = () => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const { user, isLoading, loginUser } = authContext;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordRef = useRef();
  const emailRef = useRef();
  const [password, setPassword] = useState("123456");

  const [isOpen, setIsOpen] = useState(false);

  const togglePasswordType = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginUser = (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    loginUser(email, password)
      .then((credentials) => {
        if (credentials && credentials.user) {
          dispatch(setIsMenuOpen(false));
        }
      })
      .catch((e) => console.log(e.message));
  };

  // Set cursor at the end of input
  useEffect(() => {
    passwordRef.current.focus();
    const passwordLength = password.length;
    passwordRef.current.setSelectionRange(passwordLength, passwordLength);
  }, [isPasswordVisible]);

  return (
    <>
      <form onSubmit={handleLoginUser}>
        <Stack gap={2} sx={{ "& > *": { flex: 1 } }}>
          <FormControl>
            <Input
              type="email"
              name="email"
              id="email"
              required
              slotProps={{
                input: { ref: emailRef, style: { width: "100%" } },
              }}
              defaultValue="nutri@tracker.hu"
            />
          </FormControl>
          <FormControl>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              id="password"
              endDecorator={isPasswordVisible ? <IoIosEye /> : <IoIosEyeOff />}
              slotProps={{
                endDecorator: {
                  onClick: togglePasswordType,
                  style: { cursor: "pointer" },
                },
                input: { ref: passwordRef, style: { width: "100%" } },
              }}
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </FormControl>
          <Button type="submit" loading={isLoading}>
            Belépés
          </Button>
          <Button variant="outlined" onClick={() => setIsOpen(true)}>
            Regisztráció
          </Button>
        </Stack>
      </form>
      {/*<SignUpModal isOpen={isOpen} onCloseModal={() => setIsOpen(false)} />*/}
    </>
  );
};

export default AuthForm;
