import datetime as dt
import pandas_datareader as web
import cgi
import json

def getPrice(ticker):
    today = dt.datetime.now()
    day = today.day
    if today.hour < 10:
        day-= 1
    inicio = dt.datetime(today.year, today.month, day)
    fim = dt.datetime(today.year, today.month, day)
    df = web.data.DataReader(ticker, 'yahoo', inicio, fim)
    #print(df)
    # print(float(df['Close']))
    result = {
        "Date": str(fim),
        "High": str(round(float(df["High"]), 2)),
        "Low":  str(round(float(df["Low"]), 2)),
        "Open":  str(round(float(df["Open"]), 2)),
        "Close":  str(round(float(df["Close"]), 2)),
        "Volume": str(int(df["Volume"]))
    }
    x = json.dumps(result)
    print(json.dumps(result))

def main(form):
    print ("Content-type: text/json")
    print("")
    getPrice(form['ticker'].value + ".sa")


if __name__ == '__main__':
    form = cgi.FieldStorage()
    main(form)
