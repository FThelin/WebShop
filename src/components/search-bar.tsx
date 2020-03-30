import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { FormField, TextInput, Button, Form, Box } from "grommet";
import { Search } from "grommet-icons";

const SearchBar = ({ history, match }: RouteComponentProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    history.push("/search/" + input);
    setInput("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Box direction="row">
        <FormField>
          <TextInput
            onChange={e => setInput(e.target.value)}
            value={input}
            placeholder="Sök produkter"
            size="medium"
          />
        </FormField>
        <Button margin={{ right: "medium" }} icon={<Search />} type="submit" />
      </Box>
    </Form>
  );
};

export default withRouter(SearchBar);
