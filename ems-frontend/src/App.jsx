import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import { FooterComponent } from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'


function App() {


  return (
    <>
    <BrowserRouter>
    <HeaderComponent/>
      <Routes>
        {/* //https://localhost:3000 */}
        <Route path='/' element={<ListEmployeeComponent/>}></Route>
        {/* /employees */}
        <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
        {/* /add-employee */}
        <Route path='/add-employee' element={<EmployeeComponent/>}></Route>
{/* edit-employee/1 */}
        <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>

</Routes>
      <FooterComponent/>
</BrowserRouter>
  
    </>
  )
}


export default App
