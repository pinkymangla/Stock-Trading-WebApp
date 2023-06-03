import {BrowserRouter, Routes,Route} from 'react-router-dom'
import {StockDetailPage} from './pages/StockDetailPage'
import {StockOverviewPage} from './pages/StockOverviewPage'
import {WatchListContextProvider} from "./context/WatchListContext"
import "./App.css"
function App() {
  return (
    <main className='container'>
      <WatchListContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StockOverviewPage/>}/>
          <Route path='/detail/:symbol' element={<StockDetailPage/>}/>
        </Routes>
      </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
