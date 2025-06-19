using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class DinhMucTietChuan
{
  [Key]
  public int Id { get; set; }
  public ulong GiaTri { get; set; }
  public int NamApDung { get; set; }
  public DateTime thoiGianCapNhat = DateTime.UtcNow;
}

public class HeSoLopHocPhan
{
  [Key]
  public int Id { get; set; }
  public double GiaTri { get; set; }
  public int SoSinhVienToiDa { get; set; }
  public int NamApDung { get; set; }
  public DateTime thoiGianCapNhat = DateTime.UtcNow;
}