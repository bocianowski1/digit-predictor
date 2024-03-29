import { Tensor, InferenceSession } from "onnxjs";
import { useRef, useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import Header from "./Header";
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
  const [allowScroll, setAllowScroll] = useState(false);

  const CANVAS_SIZE = 280;
  const BLACK_COLOR = "#212121";

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

    ctx.lineWidth = 20;
    ctx.lineJoin = "round";
    ctx.fillStyle = BLACK_COLOR;
    ctx.strokeStyle = BLACK_COLOR;

    const clearCanvas = () => {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      setMostLikely(null);
      setPredictionList(zeros);
      if (window.innerWidth < 1020) setAllowScroll(false);
    };

    const drawLine = (e, x0, y0, x1, y1) => {
      e.preventDefault();
      e.stopPropagation();
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

      setAllowScroll(true);
      setTimeout(function () {
        document.getElementById("section-2").scrollIntoView();
      }, 1000);
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
        drawLine(e, xRef.current, yRef.current, x, y);
      }
      xRef.current = x;
      yRef.current = y;
    };

    const bodyMouseUp = () => {
      mouseClickedRef.current = false;
    };

    const touchMove = (e) => {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
    };

    loadingModelPromise.then(() => {
      clearButton.addEventListener("mousedown", clearCanvas);
      predictButton.addEventListener("mousedown", predict);

      canvas.addEventListener("mousedown", canvasMouseDown);
      canvas.addEventListener("mousemove", canvasMouseMove);
      canvas.addEventListener("mouseup", bodyMouseUp);

      canvas.addEventListener("touchstart", canvasMouseDown);
      canvas.addEventListener("touchend", bodyMouseUp);
      canvas.addEventListener("touchmove", touchMove);
    });
  }, []);

  return (
    <main className="bg-gradient-to-r from-slate-700 via-gray-800 to-slate-900">
      <Header />
      <div className="lg:flex lg:justify-evenly lg:px-16 lg:h-screen">
        <section id="section-1" className="h-screen pt-32 md:pt-56 ">
          <div
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-slate-700
                    border-2 border-slate-900
                    rounded-lg shadow-2xl flex justify-center flex-col 
                    max-w-fit mx-auto px-8 pb-4 mb-28 lg:mb-0"
            onMouseLeave={() => {
              mouseClickedRef.current = false;
            }}
          >
            <h4 className="font-bold text-gray-100 text-xl text-center pt-2 pb-4">
              Draw a Digit Below!
            </h4>
            <canvas
              id="canvas"
              ref={canvasRef}
              height={CANVAS_SIZE}
              width={CANVAS_SIZE}
              className=" bg-gradient-to-br from-gray-100 to-gray-400 rounded-xl shadow-lg"
            />

            <div className="flex justify-between py-4">
              <button
                id="clear-button"
                ref={clearButtonRef}
                className="rounded-lg bg-gray-200 text-pink-500 
                          font-bold px-4 py-2 min-w-[8rem] my-2 mr-2"
              >
                Clear
              </button>
              <button
                id="predict-button"
                ref={predictButtonRef}
                className="rounded-lg bg-pink-500 text-gray-200 
                          font-bold px-4 py-2 min-w-[8rem] my-2 ml-2
                          transition-all ease-in-out duration-200
                          hover:bg-gray-200 hover:text-pink-500"
              >
                Predict
              </button>
            </div>
            {predictionList.indexOf(mostLikely) !== -1 && (
              <>
                <h4
                  className={`text-center font-extrabold text-transparent text-2xl bg-clip-text 
                        bg-gradient-to-r from-purple-400 to-pink-600 my-2`}
                >
                  Did you draw a {predictionList.indexOf(mostLikely)}?
                </h4>
                <div className="text-gray-300 transition-all ease-in-out hover:text-gray-200 group">
                  <button
                    onClick={() => {
                      document.getElementById("section-2").scrollIntoView();
                    }}
                    className="flex mx-auto text-sm lg:hidden group-hover:scale-[1.05] duration-200"
                  >
                    See probabilities
                    <FaArrowDown className="ml-1 translate-y-0.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
        {(allowScroll || window.innerWidth > 1020) && (
          <section
            id="section-2"
            className={`h-screen pt-32 md:pt-48 lg:pt-48`}
          >
            <Score predictions={predictionList} mostLikely={mostLikely} />
          </section>
        )}
      </div>
    </main>
  );
};

export default Canvas;
