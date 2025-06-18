import axios from "axios"

export async function getBangCap() {
  const result = await axios.get('http://localhost:5096/BangCap')
  return result.data
}

export async function getKhoa() {
  const result = await axios.get('http://localhost:5096/Khoa')
  return result.data
}

export async function getGiangVien() {
  const result = await axios.get('http://localhost:5096/GiangVien')
  return result.data
}

export async function getHocPhan() {
  const result = await axios.get("http://localhost:5096/HocPhan")
  return result.data
}
export async function getHocKi() {
  const result = await axios.get("http://localhost:5096/HocKi")
  return result.data
}