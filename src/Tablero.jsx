import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";//https://github.com/highcharts/highcharts-react/blob/master/README.md
import { fetchTransactions } from "../helpers/helpers";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export const Tablero = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("year");
  const navigate = useNavigate();

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactions();
      setTransactions(data.results || []);
      setLoading(false);
    };
    getTransactions();
  }, []);

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const groupTransactionsByTime = (transactions, filter) => {
    const grouped = {};
    transactions.forEach((transaction) => {
      const date = new Date(transaction.value_date);
      let key;
      if (filter === "year") {
        key = date.getFullYear();
      } else if (filter === "month") {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      } else {
        key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
      if (!grouped[key]) {
        grouped[key] = { INFLOW: 0, OUTFLOW: 0 };
      }
      grouped[key][transaction.type] += transaction.amount;
    });
    return Object.entries(grouped)
      .map(([key, value]) => ({ key, ...value }))
      .sort((a, b) => new Date(a.key) - new Date(b.key)); 
  };

  const calculateMean = (transactions) => {
    const total = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    return total / transactions.length;
  };

  const calculateMode = (transactions) => {
    const frequency = {};
    let maxFreq = 0;
    let mode = null;

    transactions.forEach((transaction) => {
      frequency[transaction.amount] = (frequency[transaction.amount] || 0) + 1;
      if (frequency[transaction.amount] > maxFreq) {
        maxFreq = frequency[transaction.amount];
        mode = transaction.amount;
      }
    });

    return mode;
  };

  const mean = calculateMean(transactions);
  const mode = calculateMode(transactions);

  const groupedData = groupTransactionsByTime(transactions, timeFilter);

  const scatterOptions = {
    chart: {
      type: "scatter",
      zoomType: "xy",
    },
    title: {
      text: "Diagrama de dispersión de las transacciones",
    },
    xAxis: {
      title: {
        enabled: true,
        text: "Fecha",
      },
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Monto",
      },
      type: "logarithmic",
      minorTickInterval: 0.1,
      tickInterval: 1,
      labels: {
        formatter: function () {
          return this.value; 
        },
      },
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 3,
          states: {
            hover: {
              enabled: true,
              lineColor: "rgb(100,100,100)",
            },
          },
        },
        states: {
          hover: {
            marker: {
              enabled: false,
            },
          },
        },
        tooltip: {
          headerFormat: "<b>{series.name}</b><br>",
          pointFormat: "{point.x:%e. %b}: {point.y:.2f} USD",
        },
      },
    },
    series: [
      {
        name: "Transacciones",
        color: "rgba(223, 83, 83, .5)",
        data: transactions.map((transaction) => ({
          x: new Date(transaction.value_date).getTime(),
          y: transaction.amount,
          marker: {
            fillColor: transaction.type === "INFLOW" ? "green" : "red",
          },
        })),
      },
    ],
  };

  const histogramOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Histograma de Transacciones",
    },
    xAxis: {
      categories: groupedData.map((data) => data.key),
      title: {
        text: "Fecha",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Monto",
      },
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:,.2f} USD</b><br/>',
      shared: true,
    },
    series: [
      {
        name: "INFLOW",
        data: groupedData.map((data) => data.INFLOW),
      },
      {
        name: "OUTFLOW",
        data: groupedData.map((data) => data.OUTFLOW),
      },
    ],
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center">Tablero</h2>
        <button className="btn btn-primary" onClick={handleBackToHome}>
          Regresar a Home
        </button>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-center mb-4">
            <div className="p-3 bg-light rounded shadow-sm text-center">
              <h4 className="text">Valores Descriptivos</h4>
              <p className="mb-1">
                <strong>Media:</strong>{" "}
                <span className="text-success">{mean.toFixed(2)} USD</span>
              </p>
              <p className="mb-0">
                <strong>Moda:</strong>{" "}
                <span className="text-success">{mode.toFixed(2)} USD</span>
              </p>
            </div>
          </div>
          <HighchartsReact highcharts={Highcharts} options={scatterOptions} />
          <div className="mb-4">
            <label htmlFor="timeFilter" className="form-label">
              Filtrar por:
            </label>
            <select
              id="timeFilter"
              className="form-select"
              value={timeFilter}
              onChange={handleTimeFilterChange}
            >
              <option value="year">Año</option>
              <option value="month">Mes</option>
              <option value="day">Día</option>
            </select>
          </div>
          <HighchartsReact highcharts={Highcharts} options={histogramOptions} />
        </>
      )}
    </div>
  );
};
