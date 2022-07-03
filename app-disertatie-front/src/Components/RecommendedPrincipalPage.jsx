import React, { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import ReactApexChart from "react-apexcharts"
import { setOrders } from "../store/actions/orders";
import { setProducts } from "../store/actions/products";
import { setBrands } from "../store/actions/brands";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from '../Utils/context';
import Button from "@mui/material/Button";
import Recommended from './Recommended';
import { setRatings } from '../store/actions/ratings';
import {
  setCarts,
} from "../store/actions/shoppingCarts";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

const RecommendedPrincipalPage = () => {
  const dispatch = useDispatch()
  const auth = useAuth()

  const [budget, setBudget] = useState(0)
  const [yearlyBudget, setYearlyBudget] = useState([])
  const [series2, setSeries2] = useState(
    [{
      name: 'Buget',
      type: 'column',
      data: []
    }])

  const [options2, setOptions2] = useState(
    {
      chart: {
        height: 350,
        type: 'line',
        stacked: false
      },
      colors: [
        '#2E3B55',
        '#FEB019'
      ],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      title: {
        text: 'Bugetul cheltuit in anul curent',
        align: 'center',
        offsetX: 110
      },
      xaxis: {
        categories: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
            beginAtZero: true,
            min: 0,
            max: 3000
          },
          axisBorder: {
            show: true,
            color: '#2E3B55'
          },
          labels: {
            style: {
              colors: '#2E3B55',
            }
          },
          title: {
            text: "Buget",
            style: {
              color: '#2E3B55',
            }
          },
          tooltip: {
            enabled: true
          }
        }
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft',
          offsetY: 30,
          offsetX: 60
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40
      }
    })

  const selectProducts = (state) => state.products;
  const { products } = useSelector(selectProducts);

  const selectBrands = (state) => state.brands;
  const { brands } = useSelector(selectBrands);

  const selectOrders = (state) => state.orders;
  const { orders } = useSelector(selectOrders);

  const getOrdersValueByMonth = () => {
    if (auth) {
      let orderValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

      let filteredOrders = orders.filter(order => order.idUtilizator === auth._id)
      filteredOrders.map(order => {
        const currentMonth = new Date(order.data).getMonth()
        const totalValue = order.valoareProduse + order.taxaLivrare - order.discount
        orderValues[currentMonth] += totalValue
      })
      const actualMonth = new Date().getMonth()
      setYearlyBudget(orderValues)

      const previousValues = orderValues.slice(0, actualMonth)
      const sum = previousValues.reduce((a, b) => a + b, 0);
      const avg = (sum / previousValues.length).toFixed(2) || 0;

      let budget = parseFloat(avg)

      switch (new Date().getMonth()) {
        case 0:
          budget -= 0.5 * budget;
          break;
        case 1:
          budget += 0.5 * budget;
          break;
        case 2:
          budget += 0.3 * budget;
          break;
        case 3:
          budget += 0.2 * budget;
          break;
        case 4:
          budget += 0.15 * budget;
          break;
        case 5:
          budget += 0.05 * budget;
          break;
        case 6:
          budget -= 0.05 * budget;
          break
        case 7:
          budget -= 0.1 * budget;
          break
        case 8:
          budget -= 0.05 * budget;
          break
        case 9:
          budget -= 0.05 * budget;
          break
        case 10:
          budget -= 0.05 * budget;
          break
        case 11:
          budget += 0.5 * budget;
          break
        default: budget = avg
      }

      setSeries2([{
        name: 'Buget',
        type: 'column',
        data: orderValues
      }])
      setBudget(budget.toFixed(2))
    }
  }

  const prevOrders = usePrevious(orders)

  function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [orders]);

    return ref.current;
  }

  const [openRecommandationModal, setOpenRecommandationModal] = useState(false);

  const veziProduseRecomandate = () => {
    setOpenRecommandationModal(!openRecommandationModal)
  }

  const [bugetIntrodus, setBugetIntrodus] = useState("");
  const [useBugetIntrodus, setUseBugetIntrodus] = useState(false);

  const changeBugetIntrodus = (event) => {
    setBugetIntrodus(event.target.value);
  };

  const aplicaBugetIntrodus = () => {
    setUseBugetIntrodus(!useBugetIntrodus)
  };

  useEffect(() => {
    if (prevOrders === undefined) {
      dispatch(setRatings("https://backend-r4zkv.ondigitalocean.app/ratings"));
      dispatch(setProducts("https://backend-r4zkv.ondigitalocean.app/products"));
      dispatch(setBrands("https://backend-r4zkv.ondigitalocean.app/brands"));
      dispatch(setOrders("https://backend-r4zkv.ondigitalocean.app/orders"));
      dispatch(setCarts("https://backend-r4zkv.ondigitalocean.app/shoppingCart"));
    }
    if (JSON.stringify(prevOrders) !== JSON.stringify(orders)
    ) {
      getOrdersValueByMonth()
    }
  }, [orders]);

  return (
    <>
      <Typography sx={{ marginTop: '30px', fontSize: '20px' }}>Buget prezis pentru luna actuala: <strong>{budget} lei</strong></Typography>
      <Typography sx={{ marginTop: '15px', fontSize: '20px' }}>Buget prezis ramas: <strong>{(budget - parseFloat(yearlyBudget[new Date().getMonth()])) >= 0 ? (budget - parseFloat(yearlyBudget[new Date().getMonth()])).toFixed() : 0} {(budget - parseFloat(yearlyBudget[new Date().getMonth()])).toFixed(2) < 1 && (budget - parseFloat(yearlyBudget[new Date().getMonth()])).toFixed(2) > 0 ? "leu" : "lei"}</strong></Typography>
      <Card sx={{ minWidth: 280, marginTop: "10px" }}>
        <CardContent>
          <TextField
            label="Buget disponibil"
            type="text"
            variant="standard"
            value={bugetIntrodus}
            onChange={changeBugetIntrodus}
          />
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={aplicaBugetIntrodus}
          >
            {useBugetIntrodus ? 'Foloseste bugetul prezis' : 'Foloseste bugetul introdus'}
          </Button>
        </CardActions>
      </Card>

      {
        !openRecommandationModal ?
          < div style={{ backgroundColor: '#f2f9fa', marginTop: '40px' }}>
            <ReactApexChart options={options2} series={series2} type="line" height={350} weight={350} />
            <Button sx={{ marginTop: '20px', marginBottom: '50px' }} onClick={veziProduseRecomandate}>
              Produse recomandate pentru tine
            </Button>
          </div> :
          <div>
            <Button sx={{ marginTop: '20px', marginBottom: '-20px' }} onClick={veziProduseRecomandate}>
              Ascunde produse recomandate
            </Button>
            <Recommended buget={useBugetIntrodus ? bugetIntrodus : (budget - parseFloat(yearlyBudget[new Date().getMonth()])).toFixed()} />
          </div>
      }
    </>
  )
}

export default RecommendedPrincipalPage