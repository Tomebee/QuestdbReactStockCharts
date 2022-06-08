import React, { useEffect, useState } from "react";
import { OhlcChart } from "./components/OhlcChart";
import { LineChart } from "./components/LineChart";
import { fetchBtcData } from "./api/fetchBtcData";
import { fetchCorrelationData } from "./api/fetchCorrelationData";
import { Button } from "./components/Button";
import { Datepicker } from "./components/Datepicker";

function App() {
  const [btcData, setBtcData] = useState([]);
  const [correlationData, setCorrelationData] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const onFromChange = (e) => {
    const { value } = e.target;
    setFrom(value);
  };

  const onToChange = (e) => {
    const { value } = e.target;
    setTo(value);
  };

  useEffect(() => {
    fetchBtcData(from, to).then((d) => setBtcData(d));
    fetchCorrelationData().then((d) => setCorrelationData(d));
  }, []);

  const rubOut = () => {
    fetchBtcData(undefined,undefined).then(d => setBtcData(d));
    setFrom(undefined);
    setTo(undefined);
  }
  console.log(from, to)

  return (
    <div className="App">
      <main className="container mx-auto bg-gray-50 mt-12 rounded-xl">
        <div className="w-full py-4">
          <h2 className="text-3xl py-8 text-left ml-10">BTC/USD</h2>
          <section className="ml-10 flex">
            <Datepicker onChange={onFromChange} value={from}>
              From
            </Datepicker>
            <Datepicker onChange={onToChange} value={to}>
              To
            </Datepicker>
            <Button onClick={_ => fetchBtcData(from, to).then(d => setBtcData(d))}>
              Filter
            </Button>
            <Button secondary onClick={rubOut}>
              Rub out
            </Button>
          </section>

          {btcData.length && <OhlcChart initialData={btcData} />}
          <h2 className="text-3xl py-8 text-left ml-10">BTC/USD in correlation with SPX</h2>
          {correlationData.length && (
            <LineChart initialData={correlationData} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
