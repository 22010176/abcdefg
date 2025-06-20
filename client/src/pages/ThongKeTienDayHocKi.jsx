import { DatePicker, Select, Table } from "antd"
import { useEffect, useMemo, useState } from "react"

import dayjs from "dayjs"
import { getKhoa, getTienDayToanTruong } from "../utils/api"

function ThongKeTienDayHocKi() {
  const [data, setData] = useState([])
  const [namHoc, setNamHoc] = useState([])
  const [select, setSelect] = useState(dayjs())

  const allData = useMemo(function () {
    const temp = {}
    for (const i of data) {
      if (i.khoaId != select) continue
      if (!temp[i.id]) temp[i.id] = { ...i, tongTienDay: 0 }
      temp[i.id].tongTienDay = i.soTietThuc * (i.heSoHocPhan + i.heSoLop) * i.dinhMucTinChi * i.heSoBangCap
    }
    return Object.values(temp)
  }, [data, select])

  useEffect(function () {
    getTienDayToanTruong().then(setData)
    getKhoa().then(data => {
      setNamHoc(data)
    })
  }, [])

  const columns = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', render: (_, __, i) => i + 1 },
    { title: 'Họ tên', dataIndex: 'hoTen', key: 'hoTen' },
    { title: 'Khoa', dataIndex: 'tenKhoa', key: 'tenKhoa' },
    { title: 'Bằng cấp', dataIndex: 'tenBangCap', key: 'tenBangCap' },
    {
      title: 'Tiền dạy', render: ({ soTietThuc, heSoBangCap, heSoHocPhan, heSoLop, dinhMucTinChi }) => {
        const tienDay = soTietThuc * (heSoHocPhan + heSoLop) * dinhMucTinChi * heSoBangCap
        return tienDay.toLocaleString('vi', { style: 'currency', currency: 'VND' })
      }
    }
  ]

  return (
    <div>
      <h1 className="text-2xl mb-5 font-bold uppercase">Quản lý tiền dạy học</h1>
      <DatePicker
        picker="year"
        value={select}
        onChange={e => setSelect(e)} />
      <Select className="w-50" placeholder="Học kì" />

      <Table className="my-2" size="small" pagination={{ pageSize: 10 }}
        columns={columns}
        dataSource={allData} />
    </div>
  )
}

export default ThongKeTienDayHocKi