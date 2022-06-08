export const fetchCorrelationData = async () => {
  const sql = `select spx.time, spx.close as SPX_close, btc.close as BTC_close
      from 'SP_SPX, D.csv' as spx
      left join 'BTCUSD, D.csv' as btc on spx.time = btc.time
      group by 'BTCUSD, D.csv'.time
      `;
  const query = `?query=${encodeURIComponent(sql)}`;
  const result = await fetch(
    `http://localhost:8080/0.0.0.0:9000/exec${query}`,
    {
      headers: {
        origin: "localhost:3000",
      },
    }
  );

  const json = await result.json();

  return json.dataset.map(parse);
};

const parse = (x) => ({
  date: new Date(x[0]),
  spx_close: +x[1],
  btc_close: +x[2],
});
