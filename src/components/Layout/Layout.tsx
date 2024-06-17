import { useRouter } from "next/router";
import classNames from "classnames";
import styles from "./Layout.module.scss";

const Layout = ({
  className = "",
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const isAuthPage = router.pathname.startsWith("/auth");
  const pageClassName = classNames(styles.container, {
    [styles.authPage]: isAuthPage,
    [styles.page]: !isAuthPage,
    [className]: className,
  });

  return <div className={pageClassName} {...props} />;
};

export default Layout;
