import { Table } from "antd"
import { useEffect, useState } from "react"

import { GetThongKeBangCap, GetThongKeKhoa } from "../utils/api"

function ThongKeGiangVien() {
  const [bangCap, setBangCap] = useState([])
  const [khoa, setKhoa] = useState([])

  useEffect(() => {
    GetThongKeKhoa().then(setKhoa)
    GetThongKeBangCap().then(setBangCap)
  }, [])
  const columns = [
    { title: 'Mã khoa', dataIndex: 'maKhoa', key: 'maKhoa', },
    { title: 'Tên khoa', dataIndex: 'tenKhoa', key: 'tenKhoa', },
    { title: 'Số lượng giảng viên', dataIndex: 'soLuongGiangVien', key: 'soLuongGiangVien', },
  ]

  const col2 = [
    { title: 'Mã bằng cấp', dataIndex: 'maBangCap', key: 'maBangCap', },
    { title: 'Tên bằng cấp', dataIndex: 'tenBangCap', key: 'tenBangCap', },
    { title: 'Số lượng giảng viên', dataIndex: 'soLuongGiangVien', key: 'soLuongGiangVien', },
  ]
  return (
    <div>
      <h1 className="text-2xl mb-5 font-bold uppercase">Thống kê giảng viên</h1>
      <div className="flex flex-col gap-5">
        <div>
          <p className="font-bold mb-2">Thống kê giảng viên theo khoa </p>
          <Table columns={columns} dataSource={khoa} />
        </div>
        <div>
          <p className="font-bold mb-2">Thống kê giảng viên theo bằng cấp</p>
          <Table columns={col2} dataSource={bangCap} />
        </div>
      </div>
    </div>
  )
}

export default ThongKeGiangVien
// This file is intentionally left blank as a placeholder for future implementation.