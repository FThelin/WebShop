import React from "react";
import { Box, Button, Heading, TextInput, FormField } from "grommet";
import { Cart, Search } from "grommet-icons";
interface Iprops {}

const Header = (props: Iprops) => {
  return (
    <Box
      height="8vh"
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: "medium", right: "small", vertical: "small" }}
      elevation="medium"
      style={{ zIndex: 1 }}
      {...props}
    >
      <Heading
        level="3"
        margin="none"
        style={{ fontFamily: `ONEDAY` }}
        size="large"
      >
        ADAM FREDICK
      </Heading>
      <Box direction="row">
        <FormField>
          <TextInput placeholder="Sök produkter" size="medium" />
        </FormField>
        <Button icon={<Search />} onClick={() => {}} />
        <Button icon={<Cart />} />
      </Box>
    </Box>
  );
};

export default Header;
