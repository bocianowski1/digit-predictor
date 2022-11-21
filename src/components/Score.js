import { Box, HStack } from "@chakra-ui/react";

const Score = ({ predictions }) => {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <Box
      marginX={20}
      height={"40vh"}
      width={"50vw"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"flex-end"}
    >
      <Box height={"100%"} width={"100%"}>
        <HStack
          justifyContent={"space-between"}
          height={"20%"}
          width={"100%"}
          paddingX={5}
        >
          {values.map((value) => (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"35px"}
              fontWeight={"bold"}
              fontSize={"20px"}
            >
              {value}
            </Box>
          ))}
        </HStack>
        <Box
          spacing={"2vw"}
          paddingX={5}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {predictions.map((value) => (
            <>
              <Box
                height={280}
                display={"flex"}
                alignItems={"flex-end"}
                backgroundColor={"floralwhite"}
                border={"solid"}
                rounded="lg"
              >
                <Box
                  height={value * 275}
                  width={"30px"}
                  bgGradient={"linear(to-t, red.100, orange.400)"}
                  rounded="md"
                  shadow="md"
                />
              </Box>
            </>
          ))}
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} marginY={2}>
          {predictions.map((value) => (
            <>
              <Box textAlign={"center"} width={"70px"} fontWeight={"bold"}>
                {(value * 100).toFixed(1)}%
              </Box>
            </>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Score;
