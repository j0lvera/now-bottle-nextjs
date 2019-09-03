import { Box } from "rebass";
import Nav from "./nav";

function Header(props) {
  return (
    <Box as="header" {...props}>
      <h1>Build it Later!</h1>
      <Nav />
    </Box>
  );
}

export default Header;
