import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect ,useState } from 'react'
import finhub from '../apis/finhub'
import { StockChart } from '../components/StockChart'
import { StockData } from '../components/StockData'

const formatData=(data)=>{
  return data.t.map((el,index)=>{
    return {
      x:el*1000,
      y:Math.floor(data.c[index])
    }
  })
}

export const StockDetailPage = () => {
  const {symbol}=useParams()
  const [chartData, setChartData] = useState()
  useEffect(()=>{
    const fetchData= async ()=>{
      const date= new Date()
      const currentTime=Math.floor(date.getTime()/1000)
      let oneDay 
      if(date.getDay()===6){  //saturday
        oneDay  = currentTime - 2*24*60*60   
      }
      else if(date.getDay()===0){  //sunday
        oneDay = currentTime - 3*24*60*60   
      }
      else{
        oneDay = currentTime - 24*60*60 
      }
      const oneWeek = currentTime-7*24*60*60
      const oneYear = currentTime-365*24*60*60
      try{
        const responses=await Promise.all([finhub.get("/stock/candle",{
          params:{
            symbol,
            from:oneDay,
            to:currentTime,
            resolution:30   //every 30  minutes
          }
        }),
        finhub.get("/stock/candle",{
          params:{
            symbol,
            from:oneWeek,
            to:currentTime,
            resolution:60   //every 30  minutes
          }
        }),
        finhub.get("/stock/candle",{
          params:{
            symbol,
            from:oneYear,
            to:currentTime,
            resolution:"D"   //every 30  minutes
          }
        })
        
      ])
      console.log(responses)
      setChartData({
        day:formatData(responses[0].data),
        week:formatData(responses[1].data),
        year:formatData(responses[2].data)
      })
      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  },[symbol])
  return (
    <div>
      {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={symbol}/>
          <StockData symbol={symbol}/>
        </div>
      )}
    </div>
  )
}


