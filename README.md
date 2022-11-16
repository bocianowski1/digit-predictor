# Predicting handwritten digits with ONNX.js, PyTorch and React
Using a convolutional neural network trained on the MNSIT dataset to predict handwritten digits in React. The PyTorch model is trained locally and then converted to an ONNX model, allowing usage in the browser. Since the input from the MNIST dataset are $28\times28$ pixel images, the canvas has a shape of $280\times280$ making it easier 

### Network Arcitecture Inspired By:
<img width="637" alt="Screenshot 2022-11-16 at 09 56 06" src="https://user-images.githubusercontent.com/84389241/202135676-4a48652e-c2bd-4663-bd56-b78e2d5b5a5b.png">
<b>To learn feature patterns</b> two convolutional layers with a relu activation between them are being used.<br></br>
After the second convolutional layer, max pooling is being performed. Max pooling extracts the highest value from the feature map.<br></br>
<img width="342" alt="Screenshot 2022-11-16 at 10 10 06" src="https://user-images.githubusercontent.com/84389241/202137990-6611b9a9-8e52-4a53-ab8f-d77dd99caa24.png"><br/>
This is followed by the first dropout layer, dropping $25%$ of the neurons. This is done to prevent overfitting and to speed up the learning process.<br></br>
As a part of the <b>classification</b> the input is flattened before entering a fully connected layer, another relu activation, a $50%$ dropout layer and the last fully connected layer.<br></br>
Finally the softmax activation function is applied, giving predictions for each label, i.e. digit.
