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
} from "@mui/joy";
import { useRef } from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUpModal = ({ isOpen, onCloseModal, onSignIn }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        onSignIn();
        onCloseModal();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
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
                required
                defaultValue="teszt@teszt.hu"
                slotProps={{ input: { ref: emailRef } }}
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
            <Button type="submit">Regisztrál</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default SignUpModal;
