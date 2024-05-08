from flask import Flask,request, jsonify
import subprocess
import shutil
import cv2
import pytesseract
import os
import base64
import time 
import easyocr

def base64_to_image(base64_string, output_path):
    # Decode the base64 string to binary data
    binary_data = base64.b64decode(base64_string)

    # Write the binary data to a file
    with open(output_path, "wb") as image_file:
        image_file.write(binary_data)

app = Flask(__name__)
@app.route('/')
def hello_world():
    return "Hello"

@app.route('/node_call', methods=['POST'])

def convertText():
    # text="BLah"
    
    # if os.path.isdir('runs/detect'):
    #     shutil.rmtree('runs/detect')
    # data = request.json
    # data=data.get('data')
    # image_path = "image999.jpg"
    # base64_to_image(data, image_path)
    # command = [
    #     'yolo',
    #     'task=detect',
    #     'mode=predict',
    #     'model=best.pt',
    #     'conf=0.25',
    #     f"source='{image_path}'",
    #     'hide_labels=True',
    #     'boxes=False',
    #     'save_crop'
    # ]
    # # start = time.time()
    # result = subprocess.run(command, capture_output=True, text=True)
    # # end = time.time()

    # # print("Execution time of the program is- ", end-start)
    # image_path ='runs/detect/predict/crops/Predicted/'+os.path.splitext(os.path.basename(image_path))[0]+'.jpg'
    # img = cv2.imread(image_path)

    # img_lp = cv2.resize(img, (333, 75))
    # img_gray_lp = cv2.cvtColor(img_lp, cv2.COLOR_BGR2GRAY)
    # _, img_binary_lp = cv2.threshold(img_gray_lp, 200, 255, cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    # img_binary_lp = cv2.erode(img_binary_lp, (3,3))
    # img_binary_lp = cv2.dilate(img_binary_lp, (3,3))

    #   # Make borders white
    # img_binary_lp[0:3,:] = 255
    # img_binary_lp[:,0:3] = 255
    # img_binary_lp[72:75,:] = 255
    # img_binary_lp[:,330:333] = 255

  
    # # text = pytesseract.image_to_string(img_binary_lp,lang='eng')
    # # print(text)

    # ocr=easyocr.Reader(['en'])
    # arrival=ocr.readtext(img_binary_lp)
    # print(arrival)
    # text=arrival[0][1]
    # text=text.translate({ord(i): None for i in '-+*/%^&$#@! ?/\|,.'})
    # print(text)
    text="mhcs1941"
    data={'Number':text}

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=8000)