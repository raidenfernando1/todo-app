import { Plus, Settings2 } from "lucide-react";

const NavItems = [
  {
    ariaLabel: "Add Note",
    icon: <Plus size={32} strokeWidth={1.5} />,
  },
  {
    ariaLabel: "Account Settings",
    icon: <Settings2 size={32} strokeWidth={1.5} />,
  },
];

const Navbar = () => {
  return (
    <nav className="flex gap-3 p-6">
      {NavItems.map(({ ariaLabel, icon }, index) => {
        return (
          <button className="border-1" key={index} aria-label={ariaLabel}>
            {icon}
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;
