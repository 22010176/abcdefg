import { Select, Table } from "antd"

function TinhTienDay() {
  const columns = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', render: (_, __, i) => i + 1 },
  ]

  return (
    <div>
      <h1 className="text-2xl mb-5 font-bold uppercase">Quản lý tiền dạy học</h1>
      <div className="flex justify-end mb-5 gap-2">
        <Select className="w-50" placeholder="Khoa" />
        <Select className="w-50" placeholder="Năm học" />
        <Select className="w-50" placeholder="Kì học" />
      </div>
      <div className="">

        <Table className="mb-2" size="small" pagination={{ pageSize: 5 }}
          columns={columns}
          dataSource={[1, 2, 3, 4, 45, 4, 5]} />
        <div>
          <h2 className="text-xl mb-2 font-bold uppercase">Danh sách lớp học phần giảng viên giảng dạy</h2>
          <Table size="small" pagination={{ pageSize: 3 }}
            columns={columns}
            dataSource={[1, 2, 3, 4, 5]} />
        </div>
      </div>
    </div>
  )
}

export default TinhTienDay