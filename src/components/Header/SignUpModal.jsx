import {
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Typography,
  FormHelperText,
  Alert,
} from "@mui/joy";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setIsMenuOpen } from "../../store/appSlice";

const SignUpModal = ({ isOpen, onCloseModal }) => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const { createUser, signUpError, setSignUpError, user } = authContext;

  const navigate = useNavigate();

  const [email, setEmail] = useState("nutri@tracker.hu");

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (signUpError) {
      setSignUpError(false);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;

    createUser(email, password).then((credentials) => {
      if (credentials && credentials.user) {
        dispatch(setIsMenuOpen(false));
      }
    });
  };
  return (
    <Modal open={isOpen} onClose={onCloseModal}>
      <ModalDialog>
        <ModalClose />
        <Typography>Regisztráció</Typography>
        <form onSubmit={submitForm}>
          <Stack gap={2}>
            <FormControl>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                required
                slotProps={{ input: { ref: emailRef } }}
                onChange={handleEmailChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Jelszó</FormLabel>
              <Input
                type="password"
                name="password"
                id="password"
                required
                defaultValue="123456"
                slotProps={{ input: { ref: passwordRef } }}
              />
            </FormControl>
            {signUpError ? (
              <Alert color="danger">Létező e-mail cím vagy hibás jelszó!</Alert>
            ) : (
              ""
            )}
            <Button type="submit">Regisztrál</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default SignUpModal;
