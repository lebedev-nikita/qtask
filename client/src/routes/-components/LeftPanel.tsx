import { useGoogleOneTapLogin } from "@react-oauth/google";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ResizableBox } from "react-resizable";
import { useLocalStorage } from "react-use";
import { Button } from "@/components/ui/button";
import { useBoardsList, useIsLoggedIn, useLogInMutation, useLogOutMutation } from "@/hooks/api";
import AddBoardDialog from "./AddBoardDialog";
import BoardCard from "./BoardCard";

type Props = {
  className?: string;
};

const DEFAULT_WIDTH = 200;

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

  const boards = useBoardsList();
  const [open, setOpen] = useState(false);

  const [width = DEFAULT_WIDTH, setWidth] = useLocalStorage("qtask.boards.width", DEFAULT_WIDTH);

  return (
    <ResizableBox
      onResizeStop={(_, { size: { width } }) => setWidth(width)}
      width={width}
      resizeHandles={["e"]}
      axis="x"
      className={`flex flex-col gap-2 bg-white ${props.className}`}
    >
      {isLoggedIn.data === true && <Button onClick={() => logOutM.mutate()}>Log Out</Button>}

      <Button variant="outline" onClick={() => setOpen(true)}>
        ADD BOARD
      </Button>
      {open && <AddBoardDialog onClose={() => setOpen(false)} />}

      <div className="flex flex-col gap-1">
        <Link
          to="/"
          search={{ boardId: undefined }}
          className="rounded-md border p-2"
          activeProps={{ className: "ring" }}
          activeOptions={{ exact: true }}
        >
          <div>none</div>
        </Link>
        {boards.data?.map((board) => (
          <BoardCard key={board.boardId} board={board} />
        ))}
      </div>
    </ResizableBox>
  );
}
