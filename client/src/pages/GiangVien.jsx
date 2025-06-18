import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, DatePicker, Input, Modal, Select, Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { getBangCap, getGiangVien, getKhoa } from "../utils/api";
import { formatDate } from "../utils/dataFormat";

const url = "http://localhost:5096/GiangVien"
async function createGiangVien({ maGiangVien, hoTen, dienThoai, email, khoaId, bangCapId, ngaySinh }) {
  const result = await axios.post(url, { maGiangVien, hoTen, dienThoai, email, khoaId, bangCapId, ngaySinh })
  return result.data
}

async function updateGiangVien({ id, maGiangVien, hoTen, dienThoai, email, khoaId, bangCapId, ngaySinh }) {
  const result = await axios.put(`${url}/${id}`, { maGiangVien, hoTen, dienThoai, email, khoaId, bangCapId, ngaySinh })
  return result.data
}

async function deleteGiangVien(id) {
  const result = await axios.delete(`${url}/${id}`)
  return result.data
}

const defaultValue = { maGiangVien: "", hoTen: "", dienThoai: "", email: "", khoaId: 0, bangCapId: 0, ngaySinh: dayjs() }

function GiangVien() {
  const [pageState, setPageState] = useState({
    createForm: false,
    updateForm: false,
    giangVienData: [],
    bangCapData: [],
    khoaData: [],
  })
  const [createForm, setCreateForm] = useState({ ...defaultValue })
  const [updateForm, setUpdateForm] = useState({ ...defaultValue })

  useEffect(function () {
    getGiangVien().then(data => setPageState(e => ({ ...e, giangVienData: data })))

    getKhoa().then(data => {
      setPageState(e => ({ ...e, khoaData: data }))
      setCreateForm(e => ({ ...e, khoaId: data[0]?.id }))
    })

    getBangCap().then(data => {
      setPageState(e => ({ ...e, bangCapData: data }))
      setCreateForm(e => ({ ...e, bangCapId: data[0]?.id }))
    })
  }, [])

  const columns = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', render: (_, __, i) => i + 1 },
    { title: 'Mã giảng viên', dataIndex: 'id', key: 'id', render: _ => `GV_${_}` },
    { title: 'Họ tên', dataIndex: 'hoTen', key: 'hoTen', },
    { title: 'Ngày sinh', dataIndex: 'ngaySinh', key: 'ngaySinh', render: value => formatDate(value) },
    { title: 'Số điện thoại', dataIndex: 'dienThoai', key: 'dienThoai', },
    { title: 'Email', dataIndex: 'email', key: 'email', },
    { title: 'Khoa', dataIndex: 'tenKhoa', key: 'tenKhoa', },
    { title: 'Bằng cấp', dataIndex: 'tenBangCap', key: 'tenBangCap', },
    {
      title: '', key: "action", render: (_, entry) => {
        return (
          <div className="flex gap-5">
            <Button color="blue" variant="solid" icon={<FontAwesomeIcon icon={faPen} />}
              onClick={() => {
                setPageState(e => ({ ...e, updateForm: true }))
                setUpdateForm({
                  id: entry.id,
                  maGiangVien: entry.maGiangVien,
                  hoTen: entry.hoTen,
                  dienThoai: entry.dienThoai,
                  email: entry.email,
                  khoaId: entry.khoaId,
                  bangCapId: entry.bangCapId,
                  ngaySinh: dayjs(entry.ngaySinh)
                })
              }} />
            <Button color="red" variant="solid" icon={<FontAwesomeIcon icon={faTrash} />}
              onClick={async () => {
                const result = await deleteGiangVien(entry.id)
                setPageState(e => ({ ...e, giangVienData: [...result] }))
              }} />
          </div>
        )
      }
    },
  ];

  return (
    <div className="m-5 flex flex-col">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold uppercase">Quản lý giảng viên</h1>

        <Button variant="solid" color="green" icon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => setPageState(e => ({ ...e, createForm: true }))}>
          Thêm giảng viên
        </Button>
      </div>

      <Table columns={columns} dataSource={pageState.giangVienData} />

      <Modal title="Thêm giảng viên"
        open={pageState.createForm}
        onCancel={() => setPageState(e => ({ ...e, createForm: false }))}
        footer={[
          <Button variant="solid" color="blue"
            onClick={async () => {
              createForm.ngaySinh = createForm.ngaySinh.toDate()
              console.log(createForm)
              const result = await createGiangVien(createForm)
              setPageState(e => ({ ...e, createForm: false, giangVienData: [...result] }))
              setCreateForm({ ...defaultValue })
            }} >
            Gửi
          </Button>
        ]} >
        <form>
          <div className="mb-5 flex flex-col gap-1">
            <label>Họ tên giảng viên</label>
            <Input
              value={createForm.hoTen}
              onChange={e => setCreateForm(data => ({ ...data, hoTen: e.target.value }))} />
          </div>
          <div className="mb-5 flex flex-col gap-1">
            <label>Ngày sinh</label>
            <DatePicker
              value={createForm.ngaySinh}
              onChange={e => setCreateForm(data => ({ ...data, ngaySinh: e }))} />
          </div>
          <div className="mb-5 flex flex-col gap-1">
            <label>Số điện thoại</label>
            <Input
              value={createForm.dienThoai}
              onChange={e => setCreateForm(data => ({ ...data, dienThoai: e.target.value }))} />
          </div>
          <div className="mb-5 flex flex-col gap-1">
            <label>Email</label>
            <Input
              value={createForm.email}
              onChange={e => setCreateForm(data => ({ ...data, email: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="mb-5 flex flex-col gap-1">
              <label>Khoa</label>
              <Select
                options={pageState.khoaData.map(i => ({ value: i.id, label: i.tenKhoa }))}
                value={createForm.khoaId}
                onChange={e => setCreateForm(data => ({ ...data, khoaId: e }))} />
            </div>
            <div className="mb-5 flex flex-col gap-1">
              <label>Bằng cấp</label>
              <Select
                options={pageState.bangCapData.map(i => ({ value: i.id, label: i.tenBangCap }))}
                value={createForm.khoaId}
                onChange={e => setCreateForm(data => ({ ...data, bangCapId: e }))} />
            </div>
          </div>
        </form>
      </Modal>
      <Modal title="Sửa giảng viên"
        open={pageState.updateForm}
        onCancel={() => setPageState(e => ({ ...e, updateForm: false }))}
        footer={[
          <Button variant="solid" color="blue"
            onClick={async () => {
              updateForm.ngaySinh = updateForm.ngaySinh.toDate()
              console.log(updateForm)
              const result = await updateGiangVien(updateForm)
              setPageState(e => ({ ...e, updateForm: false, giangVienData: [...result] }))
              setUpdateForm({ id: 0, ...defaultValue })
            }} >
            Gửi
          </Button>
        ]} >
        <form>
          <div className="mb-5 flex flex-col gap-1">
            <label>Họ tên giảng viên</label>
            <Input
              value={updateForm.hoTen}
              onChange={e => setUpdateForm(data => ({ ...data, hoTen: e.target.value }))} />
          </div>
          <div className="mb-5 flex flex-col gap-1">
            <label>Ngày sinh</label>
            <DatePicker
              value={updateForm.ngaySinh}
              onChange={e => setUpdateForm(data => ({ ...data, ngaySinh: e }))} />
          </div>
          <div className="mb-5 flex flex-col gap-1">
            <label>Số điện thoại</label>
            <Input
              value={updateForm.dienThoai}
              onChange={e => setUpdateForm(data => ({ ...data, dienThoai: e.target.value }))} />
          </div>
          <div className="mb-5 flex flex-col gap-1">
            <label>Email</label>
            <Input
              value={updateForm.email}
              onChange={e => setUpdateForm(data => ({ ...data, email: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="mb-5 flex flex-col gap-1">
              <label>Khoa</label>
              <Select
                options={pageState.khoaData.map(i => ({ value: i.id, label: i.tenKhoa }))}
                value={updateForm.khoaId}
                onChange={e => setUpdateForm(data => ({ ...data, khoaId: e }))} />
            </div>
            <div className="mb-5 flex flex-col gap-1">
              <label>Bằng cấp</label>
              <Select
                options={pageState.bangCapData.map(i => ({ value: i.id, label: i.tenBangCap }))}
                value={updateForm.khoaId}
                onChange={e => setUpdateForm(data => ({ ...data, bangCapId: e }))} />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default GiangVien