import { useState, useRef, useEffect } from "react";
import {
  Center,
  Heading,
  Box,
  Input,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as tf from "@tensorflow/tfjs";

const LinearPrediction = () => {
  const [prediction, setPrediction] = useState("");
  const [toPredict, setToPredict] = useState("");
  const [inputValue, setInputValue] = useState("");

  const runModel = async (toPredict) => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

    const xs = tf.range([0, 10, 1]);
    const ys = tf.range([0, 5, 0.5]);

    const X_train = tf.tensor2d([-2, -1, 0, 1, 2, 3, 4, 5, 6, 7], [10, 1]);
    const y_train = tf.tensor2d([-6, -3, -1, 1, 3, 5, 7, 9, 11, 13], [10, 1]);
    // const X_train = tf.tensor2d(Array.from(xs), [xs.size, 1]);
    // const y_train = tf.tensor2d(Array.from(ys), [ys.size, 1]);
    await model.fit(X_train, y_train, { epochs: 100 });

    const y_pred = model.predict(tf.tensor2d([toPredict], [1, 1])).dataSync();

    setPrediction(Array.from(y_pred));
  };

  const handleChange = (e) => {
    setToPredict(parseInt(e.target.value));
  };

  const resetInputField = () => {
    setInputValue("");
  };
  return (
    <Center>
      <Stack>
        <Heading size="lg" fontSize="60px">
          Linear Predictor
        </Heading>
        <Input
          focusBorderColor="orange.400"
          variant={"outline"}
          value={toPredict}
          autoFocus
          onChange={(e) => {
            if (e.target.value === "") setToPredict(0);
            if (!isNaN(parseInt(e.target.value)))
              setToPredict(parseInt(e.target.value));
          }}
        />

        <Button
          onClick={() => {
            runModel(parseInt(toPredict));
            resetInputField();
          }}
        >
          Predict
        </Button>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          width={"100px"}
          height={"100px"}
        >
          <Heading
            size={"sm"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {prediction === "" ? "Enter a number" : `Prediction: ${prediction}`}
          </Heading>
        </Box>
      </Stack>
    </Center>
  );
};

export default LinearPrediction;
