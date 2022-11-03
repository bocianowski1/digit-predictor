import { Text, SimpleGrid } from "@chakra-ui/react";

const Score = ({ predictions }) => {
  return (
    <>
      <Text fontSize={"2xl"}>Probabilities</Text>
      <SimpleGrid columns={2} spacingX={"10"}>
        {predictions.map((value, idx) => (
          <Text fontSize={"md"} key={idx + value}>
            {idx}: {(value.toFixed(3) * 1000) / 10}%
          </Text>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Score;
