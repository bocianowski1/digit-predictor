import { Heading, SimpleGrid, Box, HStack, VStack } from "@chakra-ui/react";
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react";

const Score = ({ predictions }) => {
  const WHITE_COLOR = "floralwhite";
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
        // border={"black"}
        // borderStyle={"solid"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        height={"40vh"}
      >
        <Heading textAlign={"center"} size={"md"}>
          Predicting Handwritten Digits using a<br />
          Convolutional Neural Network
        </Heading>
        <HStack
          marginTop={"50px"}
          spacing={"2.2vw"}
          // border={"black"}
          // borderStyle={"solid"}
          height={"20%"}
          width={"100%"}
        >
          {values.map((val) => (
            <Box
              display={"flex"}
              alignItems={"flex-end"}
              // border={"black"}
              // borderStyle={"solid"}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"25px"}
                fontWeight={"bold"}
              >
                {val}
              </Box>
            </Box>
          ))}
        </HStack>
        <HStack
          spacing={"2vw"}
          borderBottom={BLACK_COLOR}
          borderStyle={"solid"}
          height={"80%"}
          width={"100%"}
          rounded="md"
        >
          {predictions.map((value, idx) => (
            <>
              {/* <Slide direction="left" style={{ zIndex: 10 }}> */}
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
                  // padding={"10px"}
                  // mt="4"
                  bgGradient={"linear(to-t, red.100, orange.400)"}
                  rounded="md"
                  shadow="md"
                >
                  {/* {(value.toFixed(3) * 1000) / 10}% */}
                </Box>

                {/* </Slide> */}
              </Box>
              {/* <Text color={"white"} fontSize={"md"} key={idx + value}>
                {idx}
              </Text> */}
            </>
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default Score;
