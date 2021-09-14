import datetime as dt
import pandas_datareader as web
import cgi
import time

def getPrice(ticker):
    inicio = dt.datetime(2021,9,13)
    fim = dt.datetime(2021,9,13)
    df = web.data.DataReader(ticker, 'yahoo', inicio, fim)
    #print(df)
    print(len(df['Close']))
    print(df['Close'])

def main(form):
    print ("Content-type: text/html")
    print("")
    getPrice(form['ticker'].value + ".sa")


if __name__ == '__main__':
    ini = time.time()
    try:
        form = cgi.FieldStorage()
        main(form)
    except:
        print("Deu ruim!")
    fim = time.time()
    print("\nExecutou em: {}".format(fim-ini))