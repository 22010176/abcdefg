using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using server.Utils;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class ThongKeController : ControllerBase
{
  [HttpGet("lay-tien-day-toan-truong")]
  public ActionResult LayTienDayToanTruong()
  {
    var conn = DatabaseUtils.GetConnection();
    string query = """
SELECT 
	gv.Id,
	gv.HoTen,
    gv.BangCapId,
    gv.KhoaId,
    k.TenKhoa,
    bc.TenBangCap,
    lhp.TenLopHocPhan,
    hp.SoTinChi * 15 soTietThuc,
    (
		SELECT hsbc.GiaTri
        FROM hesobangcap hsbc 
        WHERE hsbc.BangCapId = bc.Id
			AND hsbc.ThoiGianCapNhat < hk.ThoiGianBatDau
        ORDER BY hsbc.ThoiGianCapNhat DESC
        LIMIT 1
    ) heSoBangCap,
    (
		SELECT hshp.GiaTri
        FROM hesohocphan hshp
        WHERE hshp.HocPhanId = hp.Id
        ORDER BY hshp.ThoiGianCapNhat DESC
        LIMIT 1
    ) heSoHocPhan,
	(
		SELECT hsl.GiaTri
        FROM hesolophocphan hsl
        WHERE hsl.NamApDung = YEAR(hk.ThoiGianBatDau)
			AND lhp.SoSinhVienDangKi < hsl.SoSinhVienToiDa
		ORDER BY lhp.SoSinhVienDangKi DESC
        LIMIT 1
    ) heSoLop,
    (
		SELECT dmtc.GiaTri
        FROM dinhmuctietchuan dmtc
        WHERE dmtc.NamApDung = YEAR(hk.ThoiGianBatDau)
        ORDER BY dmtc.ThoiGianCapNhat DESC
        LIMIT 1
    ) dinhMucTinChi,
    hp.TenHocPhan,
    hk.TenHocKi
FROM giangvien gv
INNER JOIN bangcap bc ON gv.BangCapId = bc.Id
INNER JOIN khoa k ON gv.KhoaId = k.Id
LEFT JOIN lophocphan lhp ON lhp.GiangVienId = gv.Id
INNER JOIN hocki hk ON lhp.HocKiId = hk.Id
INNER JOIN hocphan hp ON lhp.HocPhanId = hp.Id
ORDER BY gv.Id;
""";
    using MySqlCommand mySqlCommand = new(query, conn);
    using var reader = mySqlCommand.ExecuteReader();

    List<object> result = [];
    while (reader.Read())
    {
      result.Add(new
      {
        Id = reader.IsDBNull(0) ? 0 : reader.GetInt32(0),
        HoTen = reader.IsDBNull(1) ? "" : reader.GetString(1),
        BangCapId = reader.IsDBNull(2) ? 0 : reader.GetInt32(2),
        KhoaId = reader.IsDBNull(3) ? 0 : reader.GetInt32(3),
        TenKhoa = reader.IsDBNull(4) ? "" : reader.GetString(4),
        TenBangCap = reader.IsDBNull(5) ? "" : reader.GetString(5),
        TenLopHocPhan = reader.IsDBNull(6) ? "" : reader.GetString(6),
        soTietThuc = reader.IsDBNull(7) ? 0 : reader.GetInt32(7),
        heSoBangCap = reader.IsDBNull(8) ? 1.0 : reader.GetDouble(8),
        heSoHocPhan = reader.IsDBNull(9) ? 1.0 : reader.GetDouble(9),
        heSoLop = reader.IsDBNull(10) ? 0 : reader.GetDouble(10),
        dinhMucTinChi = reader.IsDBNull(11) ? 1 : reader.GetInt32(11),
        TenHocPhan = reader.IsDBNull(12) ? "" : reader.GetString(12),
        TenHocKi = reader.IsDBNull(13) ? "" : reader.GetString(13),
      });
    }
    return Ok(result);
  }
}
