import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Money from "./components/icons/money";
import Reload from "./components/icons/reload";
import { useState } from "react";

function App() {
  const [currency, setCurrency] = useState("EGP");
  const [customEyar, setCustomEyar] = useState<number | null>(8);

  const { data, isFetching, isLoading, refetch } = useQuery(
    ["gold-price"],
    () =>
      fetch("https://api.metals.live/v1/spot")
        .then((res) => res.json())
        .then((data) => data[0].gold as string)
  );

  const { data: exchangerates } = useQuery(["currency-rates"], () =>
    fetch(`https://api.exchangerate.host/latest?base=usd`).then((res) =>
      res.json()
    )
  );

  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col justify-between">
      <div className="max-w-[390px] mx-auto px-4 py-16 text-white">
        <div className="flex justify-between items-center mt-8">
          <select
            className="bg-transparent border border-white rounded-lg px-2"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {exchangerates?.rates &&
              Object.keys(exchangerates.rates).map((currencyCode) => (
                <option key={`currency-${currencyCode}`} value={currencyCode}>
                  {currencyCode}
                </option>
              ))}
          </select>
          <button
            className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:opacity-50 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-80"
            onClick={() => refetch()}
            disabled={isLoading || isFetching}
          >
            <Reload className={isFetching ? "animate-spin" : undefined} />
          </button>
        </div>
        <div className="text-center mt-8">
          <h1 className="text-3xl font-semibold">{"نصاب زكاة المال"}</h1>
          <h1 className="text-5xl mt-4">
            {data &&
              (
                Number(data) *
                2.7328134583333785 *
                exchangerates?.rates[currency]!
              ).toFixed(2)}
          </h1>
        </div>
        <div className="mt-16">
          <h2 className="text-center text-2xl">
            {"نصاب زكاة المال بعيار الذهب"}
          </h2>
          <table dir="rtl" className="w-full text-center mt-8 border-collapse">
            <thead>
              <th className="border border-white py-2 px-4">{"العيار"}</th>
              <th className="border border-white py-2 px-4">
                {"عدد الجرامات المكافأة"}
              </th>
            </thead>
            <tbody>
              {[24, 22, 18, 14, 12, 10].map((value) => (
                <tr key={`gold-value-${value}`}>
                  <td className="border border-white py-2 px-4">{value}</td>
                  <td className="border border-white py-2 px-4">
                    {((24 / value) * 85).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border border-white py-2 px-4">
                  <input
                    className="w-12 border border-white rounded-lg bg-transparent appearance-none text-center"
                    type="text"
                    onChange={(e) => {
                      if (e.target.value === "") setCustomEyar(null);
                      const value = Number(e.target.value);
                      if (!isNaN(value) && value <= 24 && value > 0) {
                        setCustomEyar(value);
                      }
                    }}
                    value={customEyar ?? ""}
                  />
                </td>
                <td className="border border-white py-2 px-4">
                  {((24 / (customEyar ?? 1)) * 85).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-sm text-neutral-500" dir="rtl">
            {
              "هذه الأرقام هي أرقام تقريبية ويرجى مراجعة المتخصصين في الأمر قبل اخراج الزكاة"
            }
          </p>
        </div>
      </div>
      <footer className="bg-black text-white text-center py-4">
        <div className="container text-start px-4">
          <p className="text-neutral-500" dir="rtl">
            &copy; {new Date().getFullYear()} {"جمية الحقوق محفوظة ل"}{" "}
            <a
              className="hover:text-blue-500 transition-colors"
              href="https://github.com/AbdoArafh"
              target="_blank"
              rel="noreferrer"
            >
              {"AbdoArafh"}
            </a>{" "}
            {"ونسألكم خالص الدعاء"}
          </p>
          <p className="text-neutral-500" dir="rtl">
            الكود على{" "}
            <a
              className="hover:text-blue-500 transition-colors"
              href="https://github.com/AbdoArafh/zakah-nesab"
              target="_blank"
              rel="noreferrer"
            >
              {"github"}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
