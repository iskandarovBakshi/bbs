"use client";
import { useStore } from "@/store/globalStore";
import { Link } from "@mui/material";

export function HomePage() {
  return (
    <>
      <h1>Hello, Next.js! </h1>
      <button
        onClick={function () {
          useStore.getState().setState({
            loggedIn: undefined,
          });
        }}
      >
        Log out
      </button>
      <Link href="/signin">Signin</Link>
    </>
  );
}
