import { BrowserRouter, Route, Routes } from "react-router"
import '@ant-design/v5-patch-for-react-19';

import Layout from "./components/Layout"
import BangCap from "./pages/BangCap"
import GiangVien from "./pages/GiangVien"
import Khoa from "./pages/Khoa";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={""} />
          <Route path="/khoa" element={<Khoa />} />
          <Route path="/giang-vien" element={<GiangVien />} />
          <Route path="/bang-cap" element={<BangCap />} />
          <Route path="/thong-ke-giang-vien" element={""} />

          <Route path="/hoc-ki" element={""} />
          <Route path="/hoc-phan" element={""} />
          <Route path="/lop-hoc-phan" element={""} />
          <Route path="/thoi-khoa-bieu" element={""} />
          <Route path="/thong-ke-so-lop" element={""} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
