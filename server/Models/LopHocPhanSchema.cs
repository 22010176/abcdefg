using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class HocPhan
{
  [Key]
  public int Id { get; set; }
  public string MaHocPhan { get; set; } = null!;
  public string TenHocPhan { get; set; } = null!;
  public int SoTinChi { get; set; }
}

public class HeSoHocPhan
{
  [Key]
  public int Id { get; set; }
  public double GiaTri { get; set; }
  public DateTime ThoiGianCapNhat { get; set; } = DateTime.Now;

  public int HocPhanId { get; set; }
  public HocPhan HocPhan { get; set; } = null!;
}

public class HocKi
{
  [Key]
  public int Id { get; set; }
  public string TenHocKi { get; set; } = null!;
  public DateTime ThoiGianBatDau { get; set; }
  public DateTime ThoiGianKetThuc { get; set; }
}

public class LopHocPhan
{
  [Key]
  public int Id { get; set; }
  public string TenLopHocPhan { get; set; } = null!;
  public int SoSinhVienDangKi { get; set; }

  public int HocPhanId { get; set; }
  public HocPhan HocPhan { get; set; } = null!;

  public int HocKiId { get; set; }
  public HocKi HocKi { get; set; } = null!;

  public int GiangVienId { get; set; }
  public GiangVien GiangVien { get; set; } = null!;
}