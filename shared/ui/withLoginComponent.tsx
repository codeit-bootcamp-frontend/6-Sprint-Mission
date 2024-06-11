import { ComponentType } from "react";
import { Button } from "./button";
import Image from "next/image";
import Link from "next/link";

interface LoginProps {
  loginRequired?: boolean;
}

function withLoginComponent<T>(Component: ComponentType<T>) {
  return function LoginWrapper(props: T & LoginProps) {
    const { loginRequired } = props;

    if (loginRequired) {
      return (
        <Link href="/login">
          <Button className="px-6 py-3 hover:cursor-pointer">로그인</Button>
        </Link>
      );
    }

    return <Component {...props} />;
  };
}

export const LoginIcon = withLoginComponent(() => (
  <Image
    src="/icons/profileIcon.png"
    alt="profile image"
    width={40}
    height={40}
  />
));
