import { Tensor, InferenceSession } from "onnxjs";
import { useRef, useEffect, useState } from "react";
import { Box, Button, Center, VStack, Heading, HStack } from "@chakra-ui/react";
import Score from "./Score";

const Canvas = () => {
  const canvasRef = useRef(null);
  const clearButtonRef = useRef(null);
  const predictButtonRef = useRef(null);
  const [prediction, setPrediction] = useState();
  const [predictionList, setPredictionList] = useState([]);

  const CANVAS_SIZE = 280;
  const CANVAS_SCALE = 1;
  const BLACK_COLOR = "#212121";
  const LINEWIDTH = 20;
  const MARGIN = "25px";
  const ROUND_CORNER = "15px";
  const WHITE_COLOR = "floralwhite";

  let isMouseClicked = false;
  let prevX = 0;
  let prevY = 0;

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
      setPrediction(null);
      setPredictionList([]);
    };

    const drawLine = (x0, y0, x1, y1) => {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.closePath();
      ctx.stroke();
    };

    const updatePredictions = async () => {
      const imgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      const input = new Tensor(new Float32Array(imgData.data), "float32");

      const outputMap = await sess.run([input]);
      const outputTensor = outputMap.values().next().value;
      const predictions = outputTensor.data;
      const maxPrediction = Math.max(...predictions);

      setPredictionList(Array.from(predictions));
      setPrediction(maxPrediction);
    };

    const canvasMouseDown = (e) => {
      isMouseClicked = true;
      const x = e.offsetX / CANVAS_SCALE;
      const y = e.offsetY / CANVAS_SCALE;

      prevX = x + 0.001;
      prevY = y + 0.001;
      canvasMouseMove(e);
    };

    const canvasMouseMove = (e) => {
      const x = e.offsetX / CANVAS_SCALE;
      const y = e.offsetY / CANVAS_SCALE;

      if (isMouseClicked) {
        drawLine(prevX, prevY, x, y);
      }

      prevX = x;
      prevY = y;
    };

    const bodyMouseUp = () => {
      isMouseClicked = false;
    };

    canvas.addEventListener("mousedown", canvasMouseDown);
    canvas.addEventListener("mousemove", canvasMouseMove);
    canvas.addEventListener("mouseup", bodyMouseUp);
    clearButton.addEventListener("mousedown", clearCanvas);
    predictButton.addEventListener("mousedown", updatePredictions);
    return () => {
      canvas.removeEventListener("mousedown", canvasMouseDown);
      canvas.removeEventListener("mousemove", canvasMouseMove);
      canvas.removeEventListener("mouseup", bodyMouseUp);
      clearButton.removeEventListener("mousedown", clearCanvas);
      predictButton.removeEventListener("mousedown", updatePredictions);
    };
  }, []);

  return (
    <Box
      margin={"25px"}
      h={"50rem"}
      bgGradient={"linear(to-r, green.100, blue.400)"}
      borderRadius={"25px"}
    >
      <VStack>
        <Heading marginTop={5} fontSize="50px">
          Digit Predictor
        </Heading>
        <Heading size={"sm"}>
          Predicting Handwritten Cigits using a Convolutional Neural Network
        </Heading>
        <Center>
          <Box
            onMouseLeave={() => {
              isMouseClicked = false;
            }}
          >
            <canvas
              id="canvas"
              ref={canvasRef}
              height={CANVAS_SIZE}
              width={CANVAS_SIZE}
              style={{
                border: "solid 3px black",
                borderRadius: ROUND_CORNER,
                margin: MARGIN,
                backgroundColor: WHITE_COLOR,
              }}
            />
          </Box>
        </Center>
        {predictionList.indexOf(prediction) !== -1 && (
          <Heading style={{ margin: "10px", fontSize: "35px" }}>
            Did you draw {predictionList.indexOf(prediction)}?
          </Heading>
        )}
        <HStack>
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
        {predictionList.length > 0 && <Score predictions={predictionList} />}
      </VStack>
    </Box>
  );
};

export default Canvas;
