import { Box } from "rebass";
import Head from "next/head";
import Header from "./header";

function Layout(props) {
  return (
    <Box maxWidth="45em" mx="auto" {...props}>
      <Head title="Home" />
      <Header py={4} />

      <Box as="main" py={4}>
        {props.children}
      </Box>

      <Box as="footer" py={4}>
        Footer goes here
      </Box>
    </Box>
  );
}

export default Layout;
