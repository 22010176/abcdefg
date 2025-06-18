using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class BangCap
{
  [Key]
  public int Id { get; set; }
  public string? MaBangCap { get; set; }
  public string? TenBangCap { get; set; }
  public string? TenVietTat { get; set; }
}

public class HeSoBangCap
{
  [Key]
  public int Id { get; set; }
  public double GiaTri { get; set; }
  public DateTime ThoiGianCapNhat { get; set; } = DateTime.UtcNow;

  public int BangCapId { get; set; }
  public BangCap BangCap { get; set; } = null!;
}

public class Khoa
{
  [Key]
  public int Id { get; set; }
  public string? MaKhoa { get; set; }
  public string? TenKhoa { get; set; }
  public string? TenVietTat { get; set; }
  public string? MoTaNhiemVu { get; set; }
}

public class GiangVien
{
  [Key]
  public int Id { get; set; }
  public string MaGiangVien { get; set; } = null!;
  public DateTime NgaySinh { get; set; }
  public string HoTen { get; set; } = null!;
  public string DienThoai { get; set; } = null!;
  public string Email { get; set; } = null!;

  public int KhoaId { get; set; }
  public Khoa Khoa { get; set; } = null!;

  public int BangCapId { get; set; }
  public BangCap BangCap { get; set; } = null!;
}