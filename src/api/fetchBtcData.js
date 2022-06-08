export const fetchBtcData = async (from, to) => {
    let sql = "SELECT * FROM 'BTCUSD, D.csv'";
    if(!!from) {
      sql += ` WHERE to_timestamp(time) > to_timestamp('${from}')`;
    }
    if(!!to && !!from) {
      sql += ` AND to_timestamp(time) < to_timestamp('${to}')`;
    }
    if(!!to && !from) {
      sql += `WHERE to_timestamp(time) < to_timestamp('${to}')`;
    }

    const query = `?query=${encodeURIComponent(sql)}` ;
    const result = await fetch(`http://localhost:8080/0.0.0.0:9000/exec${query}`, {
      headers: {
        'origin': 'localhost:3000'
      }
    });

    const json = await result.json();

    return json.dataset.map(parse);
  }


  const parse = (d) => {
    return {
      date: new Date(d[0]),
      open: +d[1],
      high: +d[2],
      low: +d[3],
      close: +d[4]
    }
  }