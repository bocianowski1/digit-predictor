import Canvas from "./components/Canvas";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <Canvas />
    </ChakraProvider>
  );
};

export default App;
