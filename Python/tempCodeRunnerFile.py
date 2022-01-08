from flask import Flask,jsonify
#from flask.ext.cors import CORS, cross_origin
import pandas as pd
from sklearn import preprocessing
from sklearn.linear_model import LinearRegression
import csv
import pickle

path="C:/Users/Asus/Desktop/Eye-Spy/Python/model.sav"
model = pickle.load(open(path,'rb'))


app=Flask(__name__)

#current code for API routing
@app.route('/<string:input_str>',methods=['GET'])
def get_input(input_str):
    ans=model.predict([input_str])
    return jsonify({"label" : ans})


if __name__== "__main__":
    app.run(debug=True)