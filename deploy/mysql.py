import pymysql
import csv

host = 'localhost'
user = 'user'
password = 'password'
db = 'ssanta'
charset = 'utf8'


con = pymysql.connect(host=host, user=user, password=password, db=db, charset=charset)
cur = con.cursor()

with open('quote.csv', encoding="utf-8", newline='') as csvfile:
    spamreader = csv.reader(csvfile) # delimiter=' ', quotechar='|')
    for row in spamreader:
        sql = "insert into quote (quote, source) values ('%s', '%s')" %(row[0], row[1])
        cur.execute(sql)
    con.commit()

con.close()