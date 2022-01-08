from flask import Flask,jsonify
#from flask.ext.cors import CORS, cross_origin
import pandas as pd
from sklearn import preprocessing
from sklearn.linear_model import LinearRegression
import csv
import pickle

path="C:/Users/Asus/Desktop/Eye-Spy/Eye-Spy/Python/model.sav"
model = pickle.load(open(path,'rb'))


app=Flask(__name__)

#current code for API routing
@app.route('/<string:input_str>',methods=['GET'])
def get_input(input_str):
    print("loop")
    input_str=input_str.replace('_',' ')
    ans=model.predict([input_str])
    print(ans)
    return jsonify({"ans":int(ans[0])})

@app.route('/',methods=['GET'])
def home_page():
    
    return "home"
    


if __name__== "__main__":
    app.run(debug=True)