/** @format */

"use client ";

import Link from "next/link";
import {
  NavbarItem,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
} from "@nextui-org/react";
import { auth } from "../../auth";
import * as actions from "../actions";
import { useSession } from "next-auth/react";
export default function HeaderAuth() {
  const session = useSession();
  let authContent: React.ReactNode;
  if (session.data?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.data.user.image || ""}></Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className=" p-4">
            <form action={actions.signOut}>
              <Button type="submit">Đăng xuất</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Đăng kí
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="flat">
              Đăng nhập
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }
  return authContent;
}
