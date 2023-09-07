import pickle

import pandas as pd
from sklearn.linear_model import LinearRegression

df_ads = pd.read_csv("./ysxhwxrw.csv")

df_ads["转发数"].fillna(df_ads["点赞数"], inplace=True)

X = df_ads.drop(["浏览量"], axis=1)  # 特征集、Drop 掉标签相关字段
y = df_ads.浏览量  # 标签集


regressor = LinearRegression()  # 拟合模型

regressor.fit(X, y)

pickle.dump(regressor, open("model.pkl", "wb"))  # 序列化模型（存盘）

model = pickle.load(open("model.pkl", "rb"))  # 反序列化模型（再导入模型）

print(model.predict([[300, 800]]))  # 进行一个预测
