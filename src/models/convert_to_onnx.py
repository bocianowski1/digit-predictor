import torch
from inference_model import Net

def main():
    model = Net()
    model.load_state_dict(torch.load('pytorch_model.pt'))
    model.eval()
    dummy_input = torch.zeros(280 * 280 * 4)
    torch.onnx.export(model, dummy_input, 'onnx_model.onnx', verbose=True)

if __name__ == '__main__':
    main()