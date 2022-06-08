# Questdb + React stock charts
Project for AGH ASK classes. The goal was to present Questdb as a time series data provider along with proper visualisations built with D3.

## Pros and cons Questdb

Plus
- Really fast with a lot of data including filtering by timestamp
- Cool import feature (you can import data using csv)
- Console and API
- Docker
- Built-in visualisations

Minus
- Hard to configure authentication and caches
- Not yet all SQL features in place

Time-series data for stock charts goes well with QuestDb. Its really easy to populate database and do some queries. Joins are blazingly fast and cooperative as well as filtering. On the frontend side I am using react stock charts library that is built on top of d3. Besides that I use cors-anywhere to provide API as a CORS proxy

## Queries samples

```sql
select spx.time, spx.close as SPX_close, btc.close as BTC_close
from 'SP_SPX, D.csv' as spx
left join 'BTCUSD, D.csv' as btc on spx.time = btc.time
group by 'BTCUSD, D.csv'.time
```

```sql
select * from 'BTCUSD, D.csv' where to_timestamp(time) > to_timestamp('2020-01-01')
```

## Prerequisites

- Docker
- Node with Yarn (npm install --global yarn)

## Get started

- Run `questdb.run.sh`
- Open browser and navigate to `localhost:9000` then in import section browse 2 csv files with BTC and SPX data and send them
![image](https://user-images.githubusercontent.com/34909339/172721639-e8ecbdf8-a1e2-48f4-b177-d7ed8d29c4bc.png)
- Tables are automatically created so go to Console and try queries out

Part 2
- Navigate to react root, install packages using command `yarn`
- Run `yarn cors-anywhere`
- Run `yarn start`

## Good to know
React uses tailwind css. There are 2 types of charts: Line and OHLC. Line is for BTC/SPX correlation, on the other hand OHLC is just for BTC. BTC chart also have 50 simple moving average

Enjoy
