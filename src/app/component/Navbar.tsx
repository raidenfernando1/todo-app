import { Plus, Settings2 } from "lucide-react";

const NavItems = [
  {
    ariaLabel: "Add Note",
    icon: <Plus size={32} strokeWidth={1.5} />,
    path: "app/create",
  },
  {
    ariaLabel: "Account Settings",
    icon: <Settings2 size={32} strokeWidth={1.5} />,
    path: "app/settings",
  },
];

const Navbar = () => {
  return (
    <nav className="flex gap-3 p-6">
      {NavItems.map((data, index) => {
        return (
          <a
            className="border-1"
            key={index}
            aria-label={data.ariaLabel}
            href={data.path}
          >
            {data.icon}
          </a>
        );
      })}
    </nav>
  );
};

export default Navbar;
