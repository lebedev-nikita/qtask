import { useGoogleOneTapLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { useIsLoggedIn, useLogInMutation, useLogOutMutation } from "@/hooks/api";

type Props = {
  className?: string;
};

export default function LeftPanel(props: Props) {
  const logInM = useLogInMutation();
  const logOutM = useLogOutMutation();

  const isLoggedIn = useIsLoggedIn();

  useGoogleOneTapLogin({
    disabled: isLoggedIn.data !== false,
    onSuccess: async (res) => {
      const idToken = res.credential;
      if (!idToken) throw new Error("no id token");
      logInM.mutate({ idToken });
    },
    onError() {
      alert("error");
    },
  });

  return (
    <div className={props.className}>
      {isLoggedIn.data === true && <Button onClick={() => logOutM.mutate()}>Log Out</Button>}
      {/* {isLoggedIn.data === false && <Button onClick={() => LogIn.mutate()}>Log In</Button>} */}
    </div>
  );
}
