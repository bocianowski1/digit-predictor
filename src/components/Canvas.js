import { Tensor, InferenceSession } from "onnxjs";
import { useRef, useEffect, useState } from "react";
import { Box, Button, VStack, Heading, HStack, Text } from "@chakra-ui/react";
import Score from "./Score";

const Canvas = () => {
  const canvasRef = useRef(null);
  const clearButtonRef = useRef(null);
  const predictButtonRef = useRef(null);
  const mouseClickedRef = useRef(false);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const [mostLikely, setMostLikely] = useState();
  const zeros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [predictionList, setPredictionList] = useState(zeros);

  const CANVAS_SIZE = 280;
  const BLACK_COLOR = "#212121";
  const LINEWIDTH = 20;
  const MARGIN = "25px";
  const ROUND_CORNER = "15px";
  const WHITE_COLOR = "floralwhite";

  mouseClickedRef.current = false;
  xRef.current = 0;
  yRef.current = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const clearButton = clearButtonRef.current;
    const predictButton = predictButtonRef.current;

    const sess = new InferenceSession();
    const loadingModelPromise = sess.loadModel("./onnx_model.onnx");

    ctx.lineWidth = LINEWIDTH;
    ctx.lineJoin = "round";
    ctx.fillStyle = BLACK_COLOR;
    ctx.strokeStyle = BLACK_COLOR;

    const clearCanvas = () => {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      setMostLikely(null);
      setPredictionList(zeros);
    };

    const drawLine = (x0, y0, x1, y1) => {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.closePath();
      ctx.stroke();
    };

    const predict = async () => {
      const imgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      const input = new Tensor(new Float32Array(imgData.data), "float32");

      const outputMap = await sess.run([input]);
      const outputTensor = outputMap.values().next().value;
      const predictions = outputTensor.data;
      const maxPrediction = Math.max(...predictions);

      setPredictionList(Array.from(predictions));
      setMostLikely(maxPrediction);
    };

    const canvasMouseDown = (e) => {
      mouseClickedRef.current = true;
      const x = e.offsetX;
      const y = e.offsetY;

      xRef.current = x + 0.001;
      yRef.current = y + 0.001;
      canvasMouseMove(e);
    };

    const canvasMouseMove = (e) => {
      const x = e.offsetX;
      const y = e.offsetY;

      if (mouseClickedRef.current) {
        drawLine(xRef.current, yRef.current, x, y);
      }
      xRef.current = x;
      yRef.current = y;
    };

    const bodyMouseUp = () => {
      mouseClickedRef.current = false;
    };

    loadingModelPromise.then(() => {
      canvas.addEventListener("mousedown", canvasMouseDown);
      canvas.addEventListener("mousemove", canvasMouseMove);
      document.body.addEventListener("mouseup", bodyMouseUp);
      clearButton.addEventListener("mousedown", clearCanvas);
      predictButton.addEventListener("mousedown", predict);
    });
  }, []);

  return (
    <Box
      margin={"2.5vw"}
      height={"90vh"}
      bgGradient={"linear(to-r, green.100, blue.400)"}
      borderRadius={"25px"}
    >
      <VStack>
        <Heading marginY={5} fontSize="60px">
          Digit Predictor
        </Heading>

        <Box display={"flex"} justifyContent={"space-between"}>
          <VStack>
            <Box
              // padding={5}
              onMouseLeave={() => {
                mouseClickedRef.current = false;
              }}
            >
              <Text
                marginY={2}
                fontSize={"30px"}
                fontWeight={"bold"}
                textAlign={"center"}
              >
                Draw a Digit
              </Text>
              <canvas
                id="canvas"
                ref={canvasRef}
                height={CANVAS_SIZE}
                width={CANVAS_SIZE}
                style={{
                  border: "solid 3px black",
                  borderRadius: ROUND_CORNER,
                  // margin: MARGIN,
                  backgroundColor: WHITE_COLOR,
                }}
              />
            </Box>

            <HStack padding={5}>
              <Button
                id="predict-button"
                ref={predictButtonRef}
                bgColor={WHITE_COLOR}
                textColor={BLACK_COLOR}
              >
                Predict
              </Button>
              <Button
                id="clear-button"
                ref={clearButtonRef}
                bgColor={WHITE_COLOR}
                textColor={BLACK_COLOR}
              >
                Clear Canvas
              </Button>
            </HStack>
            {predictionList.indexOf(mostLikely) !== -1 && (
              <Heading style={{ margin: "10px", fontSize: "35px" }}>
                Did you draw {predictionList.indexOf(mostLikely)}?
              </Heading>
            )}
          </VStack>

          <Score predictions={predictionList} />
        </Box>
      </VStack>
    </Box>
  );
};

export default Canvas;
