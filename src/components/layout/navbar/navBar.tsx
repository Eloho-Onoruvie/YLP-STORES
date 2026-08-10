import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <nav>
      <h1 className="text-3xl font-bold">YLP.STORES</h1>

      <NavLinks />

      <button className="text-3xl font-bold" >Cart</button>
    </nav>
  );
};

export default Navbar;
