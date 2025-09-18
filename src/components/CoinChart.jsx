import {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import {  
            Chart as ChartJS,
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Tooltip,
            Legend,
            TimeScale,
        } from 'chart.js'
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch(
        `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`
      );

      const data = await res.json();

      const prices = data.prices.map((price) => ({
        x: price[0],
        y: price[1],
      }));

      setChartData({
        datasets: [
          {
            label: 'Price (USD)',
            data: prices,
            fill: true,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      });

      setLoading(false);
    };

    fetchPrices();
  }, [coinId]);

  if (loading) return <p>Loading Chart...</p>;

  return (
    <div style={{ marginTop: '30px' }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7,
              },
            },
            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CoinChart;


/*
import.meta.env is a special object in modern JavaScript environments, 
particularly prominent in build tools like Vite, that allows access to 
environment variables. It serves a similar purpose to process.env in Node.js, but 
is designed for browser-side contexts where process is not available.

Here's what import.meta.env does:
    Exposes Environment Variables:
    It provides a way to access environment variables defined in .env files or 
    set directly in the system environment.

Context-Specific Metadata:
import.meta itself is a meta-property that exposes context-specific metadata about 
a JavaScript module, including its URL. 
env is a property of import.meta that specifically deals with environment variables.
*/