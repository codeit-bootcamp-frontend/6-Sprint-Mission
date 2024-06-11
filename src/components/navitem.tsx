import { useLocation } from "react-router-dom";

interface NavItemProps {
  to: string;
  activePaths?: string[];
  children: React.ReactNode;
}

function NavItem({ to, activePaths = [], children }: NavItemProps) {
  const location = useLocation();
  const isActive = [to, ...activePaths].includes(location.pathname);

  return (
    <li className="header-nav-item">
      <a href={to} className={`nav-link ${isActive ? "active" : ""}`}>
        {children}
      </a>
    </li>
  );
}

export default NavItem;
