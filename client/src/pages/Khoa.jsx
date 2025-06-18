import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Input, Modal, Table } from "antd"
import axios from "axios";
import { useEffect, useState } from "react";
import { getKhoa } from "../utils/api";

const url = "http://localhost:5096/Khoa"
// async function getKhoa() {
//   const result = await axios.get(url)
//   return result.data
// }

async function createKhoa({ tenKhoa, tenVietTat, moTaNhiemVu }) {
  const result = await axios.post(url, { tenKhoa, tenVietTat, moTaNhiemVu })
  return result.data
}

async function updateKhoa({ id, tenKhoa, tenVietTat, moTaNhiemVu }) {
  const result = await axios.put(`${url}/${id}`, { tenKhoa, tenVietTat, moTaNhiemVu })
  return result.data
}

async function deleteKhoa(id) {
  const result = await axios.delete(`${url}/${id}`)
  return result.data
}
const defaultValue = { tenKhoa: "", tenVietTat: "", moTaNhiemVu: "" }

function Khoa() {

  const [pageState, setPageState] = useState({ createForm: false, updateForm: false, data: [] })
  const [createForm, setCreateForm] = useState({ ...defaultValue })
  const [updateForm, setUpdateForm] = useState({ id: -1, ...defaultValue })

  async function updateKhoaData(data) {
    const result = data ?? await getKhoa()
    setPageState(e => ({ ...e, data: result }))
  }

  useEffect(function () { updateKhoaData() }, [])

  const columns = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', render: (_, __, i) => i + 1 },
    { title: 'Tên khoa', dataIndex: 'tenKhoa', key: 'tenKhoa', },
    { title: 'Tên viết tắt', dataIndex: 'tenVietTat', key: 'tenVietTat', },
    { title: 'Mô tả nhiệm vụ', dataIndex: 'moTaNhiemVu', key: 'moTaNhiemVu', },
    {
      title: '', key: "action", render: (_, entry) => {
        return (
          <div className="flex gap-5">
            <Button color="blue" variant="solid" icon={<FontAwesomeIcon icon={faPen} />}
              onClick={() => {
                setPageState(e => ({ ...e, updateForm: true }))
                setUpdateForm({
                  id: entry.id,
                  tenKhoa: entry.tenKhoa,
                  tenVietTat: entry.tenVietTat,
                  moTaNhiemVu: entry.moTaNhiemVu
                })
              }} />
            <Button color="red" variant="solid" icon={<FontAwesomeIcon icon={faTrash} />}
              onClick={async () => updateKhoaData(await deleteKhoa(entry.id))} />
          </div>
        )
      }
    },
  ];
  return (
    <div className="m-5 flex flex-col">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold uppercase">Quản lý khoa</h1>

        <Button variant="solid" color="green" icon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => setPageState(e => ({ ...e, createForm: true }))}>
          Thêm khoa
        </Button>
      </div>

      <Table columns={columns} dataSource={pageState.data} />

      <Modal title="Thêm bằng cấp"
        open={pageState.createForm}
        onCancel={() => setPageState(e => ({ ...e, createForm: false }))}
        footer={[
          <Button variant="solid" color="blue" onClick={async () => {
            console.log(createForm)
            const result = await createKhoa(createForm)
            console.log(result)
            setPageState(e => ({ ...e, createForm: false, data: [...result] }))
            setCreateForm({ ...defaultValue })
          }} >
            Gửi
          </Button>
        ]} >
        <form>
          <div className="mb-5 flex flex-col gap-1">
            <label>Tên khoa</label>
            <Input
              value={createForm.tenKhoa}
              onChange={e => setCreateForm(data => ({ ...data, tenKhoa: e.target.value }))} />
          </div>
          <div className="mb-5 flex flex-col gap-1">
            <label>Tên viết tắt</label>
            <Input
              value={createForm.tenVietTat}
              onChange={e => setCreateForm(data => ({ ...data, tenVietTat: e.target.value }))} />
          </div>
          <div className="mb-5 flex flex-col gap-1">
            <label>Mô tả khoa</label>
            <Input.TextArea
              autoSize={{ minRows: 3, maxRows: 5 }}
              value={createForm.moTaNhiemVu}
              onChange={e => setCreateForm(data => ({ ...data, moTaNhiemVu: e.target.value }))} />
          </div>
        </form>
      </Modal>
      <Modal title="Sửa bằng cấp"
        open={pageState.updateForm}
        onCancel={() => setPageState(e => ({ ...e, updateForm: false }))}
        footer={[
          <Button variant="solid" color="blue" onClick={async () => {
            // console.log(createForm)
            const result = await updateKhoa(updateForm)
            // console.log(result)
            setPageState(e => ({ ...e, updateForm: false, data: [...result] }))
            setCreateForm({ ...defaultValue })
          }} >
            Gửi
          </Button>
        ]} >
        <form>
          <div className="mb-5 flex flex-col gap-1">
            <label>Tên khoa</label>
            <Input
              value={updateForm.tenKhoa}
              onChange={e => setUpdateForm(data => ({ ...data, tenKhoa: e.target.value }))} />
          </div>
          <div className="mb-5 flex flex-col gap-1">
            <label>Tên viết tắt</label>
            <Input
              value={updateForm.tenVietTat}
              onChange={e => setUpdateForm(data => ({ ...data, tenVietTat: e.target.value }))} />
          </div>
          <div className="mb-5 flex flex-col gap-1">
            <label>Mô tả khoa</label>
            <Input.TextArea
              autoSize={{ minRows: 3, maxRows: 5 }}
              value={updateForm.moTaNhiemVu}
              onChange={e => setUpdateForm(data => ({ ...data, moTaNhiemVu: e.target.value }))} />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Khoa