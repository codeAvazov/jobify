import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ toggleSidebar, user }) => {
  console.log(1);
  console.log(user);
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;

        if (id === 3 && user?.email !== 'admin@gmail.com') return null;

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
