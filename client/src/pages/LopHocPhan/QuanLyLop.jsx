import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, InputNumber, Modal, Select, Table, Tag } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { getHocKi, getHocPhan, getLopHocPhan } from "../../utils/api";
import { DataContext } from "./context";

const url = "http://localhost:5096/LopHocPhan"
async function createLop({ tenLopHocPhan, hocPhanId, hocKiId, giangVienId, soLuong }) {
  const result = await axios.post(`${url}/multiple`, { tenLopHocPhan, hocPhanId, hocKiId, giangVienId, soLuong })
  return result.data
}

async function updateLop({ id, tenLopHocPhan, hocPhanId, hocKiId, giangVienId }) {
  const result = await axios.put(`${url}/${id}`, { tenLopHocPhan, hocPhanId, hocKiId, giangVienId })
  return result.data
}

async function deleteLop(id) {
  const result = await axios.delete(`${url}/${id}`)
  return result.data
}

const createDefaultValue = { tenLopHocPhan: "", hocPhanId: 0, hocKiId: 0, giangVienId: null, soLuong: 0 }
const updateDefaultValue = { tenLopHocPhan: "", hocPhanId: 0, hocKiId: 0, giangVienId: null }
function QuanLyLop() {
  const [{
    lopHocPhanData, hocPhanData, hocKiData
  }, dispatch] = useContext(DataContext)
  const [pageState, setPageState] = useState({
    createForm: false,
    updateForm: false,
    hocKiData: [],
    hocPhanData: []
  })
  const [createForm, setCreateForm] = useState({ ...createDefaultValue })
  const [updateForm, setUpdateForm] = useState({ id: -1, ...updateDefaultValue })

  async function updateLopHocPhanData(data) {
    const result = data ?? await getLopHocPhan()
    dispatch({ type: 'updateLopHocPhanData', payload: result })
  }

  useEffect(function () {
    updateLopHocPhanData()
    getHocKi().then(data => dispatch({ type: 'updateHocKiData', payload: data }))
    getHocPhan().then(data => dispatch({ type: 'updateHocPhanData', payload: data }))
  }, [])

  const columns = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', render: (_, __, i) => i + 1 },
    { title: 'Tên lớp học phần', dataIndex: 'tenLopHocPhan', key: 'tenLopHocPhan', },
    { title: 'Số sinh viên đã đăng kí', dataIndex: 'soSinhVienDangKi', key: 'soSinhVienDangKi', },
    { title: 'Học phần', dataIndex: 'tenHocPhan', key: 'tenHocPhan', },
    { title: 'Học kì', dataIndex: 'tenHocKi', key: 'tenHocKi', },
    {
      title: 'Giảng viên', dataIndex: 'hoTen', key: 'hoTen',
      render: _ => {
        return _ || <Tag color="red">Chưa phân công</Tag>
      }
    },
    {
      title: '', key: "action", render: (_, entry) => {
        return (
          <div className="flex gap-5">
            <Button color="blue" variant="solid" icon={<FontAwesomeIcon icon={faPen} />}
              onClick={() => {
                setPageState(e => ({ ...e, updateForm: true }))
                setUpdateForm({
                  id: entry.id,
                  tenLopHocPhan: entry.tenLopHocPhan,
                  giangVienId: entry.giangVienId,
                  hocKiId: entry.hocKiId,
                  hocPhanId: entry.hocPhanId,
                })
              }} />
            <Button color="red" variant="solid" icon={<FontAwesomeIcon icon={faTrash} />}
              onClick={async () => updateLopHocPhanData(await deleteLop(entry.id))} />
          </div>
        )
      }
    },
  ];
  return (
    <div className="m-5 flex flex-col">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold uppercase">Quản lý lớp học phần</h1>

        <Button variant="solid" color="green" icon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => setPageState(e => ({ ...e, createForm: true }))}>
          Thêm lớp
        </Button>
      </div>

      <Table size="small" columns={columns} dataSource={lopHocPhanData} pagination={{ pageSize: 8 }} />

      <Modal title="Thêm lớp học phần"
        open={pageState.createForm}
        onCancel={() => setPageState(e => ({ ...e, createForm: false }))}
        footer={[
          <Button variant="solid" color="blue" onClick={async () => {
            console.log(createForm)
            const result = await createLop(createForm)
            setPageState(e => ({ ...e, createForm: false, data: [...result] }))
            setCreateForm({ ...createDefaultValue })
          }} >
            Gửi
          </Button>
        ]} >
        <form>
          <div className="mb-5 flex flex-col gap-1">
            <div className="grid grid-cols-2 gap-5">
              <div className="mb-5 flex flex-col gap-1">
                <label>Học kì</label>
                <Select
                  options={hocKiData.map(i => ({ value: i.id, label: i.tenHocKi }))}
                  value={createForm.hocKiId}
                  onChange={e => setCreateForm(data => ({ ...data, hocKiId: e }))} />
              </div>
              <div className="mb-5 flex flex-col gap-1">
                <label>Học phần</label>
                <Select
                  options={hocPhanData.map(i => ({ value: i.id, label: i.tenHocPhan }))}
                  value={createForm.hocPhanId}
                  onChange={e => setCreateForm(data => ({ ...data, hocPhanId: e }))} />
              </div>
            </div>
            <label>Tên lớp học phần</label>
            <Input
              value={createForm.tenLopHocPhan}
              onChange={e => setCreateForm(data => ({ ...data, tenLopHocPhan: e.target.value }))} />
          </div>
          <div className="mb-5 flex flex-col gap-1">
            <label>Số lượng lớp học phần muốn tạo</label>
            <InputNumber min={1} max={20} style={{ width: "100%" }}
              value={createForm.soLuong}
              onChange={e => setCreateForm(data => ({ ...data, soLuong: e }))} />
          </div>
        </form>
      </Modal>
      <Modal title="Sửa lớp học phần"
        open={pageState.updateForm}
        onCancel={() => setPageState(e => ({ ...e, updateForm: false }))}
        footer={[
          <Button variant="solid" color="blue" onClick={async () => {
            const result = await updateLop(updateForm)
            setPageState(e => ({ ...e, updateForm: false, data: [...result] }))
            setUpdateForm({ ...updateDefaultValue })
          }} >
            Gửi
          </Button>
        ]} >
        <form>
          <div className="mb-5 flex flex-col gap-1">
            <div className="grid grid-cols-2 gap-5">
              <div className="mb-5 flex flex-col gap-1">
                <label>Học kì</label>
                <Select
                  options={hocKiData.map(i => ({ value: i.id, label: i.tenHocKi }))}
                  value={updateForm.hocKiId}
                  onChange={e => setUpdateForm(data => ({ ...data, hocKiId: e }))} />
              </div>
              <div className="mb-5 flex flex-col gap-1">
                <label>Học phần</label>
                <Select
                  options={hocPhanData.map(i => ({ value: i.id, label: i.tenHocPhan }))}
                  value={updateForm.hocPhanId}
                  onChange={e => setUpdateForm(data => ({ ...data, hocPhanId: e }))} />
              </div>
            </div>
            <label>Tên lớp học phần</label>
            <Input
              value={updateForm.tenLopHocPhan}
              onChange={e => setUpdateForm(data => ({ ...data, tenLopHocPhan: e.target.value }))} />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default QuanLyLop