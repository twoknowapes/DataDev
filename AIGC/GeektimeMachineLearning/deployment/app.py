import pickle

import numpy as np
from flask import Flask, render_template, request

app = Flask(__name__)
model = pickle.load(open("model.pkl", "rb"))


@app.route("/")
def home():  # 默认启动页面
    return render_template("index.html")  # 启动 index.html


@app.route("/predict", methods=["POST"])
def predict():  # 启动预测页面
    features = [int(x) for x in request.form.values()]  # 输入特征
    label = [np.array(features)]  # 标签
    prediction = model.predict(label)  # 预测结果

    output = round(prediction[0], 2)  # 输出预测结果

    return render_template("index.html",
                           prediction_text="浏览量 {}".format(int(output)))


if __name__ == "__main__":
    app.run(debug=True)
