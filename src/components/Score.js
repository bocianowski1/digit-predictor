import { Box, HStack } from "@chakra-ui/react";

const Score = ({ predictions }) => {
  const BLACK_COLOR = "#212121";
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <Box
      height={"50vh"}
      width={"40vw"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"flex-end"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        height={"40vh"}
      >
        <HStack
          marginTop={"50px"}
          spacing={"2.2vw"}
          height={"20%"}
          width={"100%"}
        >
          {values.map((value) => (
            <Box display={"flex"} alignItems={"flex-end"}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"25px"}
                fontWeight={"bold"}
              >
                {value}
              </Box>
            </Box>
          ))}
        </HStack>
        <Box
          spacing={"2vw"}
          borderBottom={BLACK_COLOR}
          borderStyle={"solid"}
          height={"80%"}
          width={"100%"}
          rounded="md"
          display={"flex"}
          justifyContent={"space-between"}
        >
          {predictions.map((value) => (
            <>
              <Box
                height={200}
                display={"flex"}
                alignItems={"flex-end"}
                border={BLACK_COLOR}
                borderStyle={"solid"}
                rounded="md"
              >
                <Box
                  height={value.toFixed(3) * 200}
                  width={"25px"}
                  bgGradient={"linear(to-t, red.100, orange.400)"}
                  rounded="md"
                  shadow="md"
                >
                  {value.toFixed(1)}
                </Box>
              </Box>
            </>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Score;
