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
  private static readonly string[] Ho = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Đặng", "Vũ", "Bùi", "Đỗ", "Hồ"];
  private static readonly string[] TenDem = ["Văn", "Thị", "Hữu", "Quang", "Minh", "Xuân", "Đức", "Thế", "Trung"];
  private static readonly string[] Ten = ["An", "Bình", "Cường", "Dung", "Em", "Hồng", "Hải", "Lan", "Minh", "Nga"];
  private static readonly Random random = new();

  public static List<GiangVien> Generate(int count, int maxKhoaId, int maxBangCapId)
  {
    var list = new List<GiangVien>();

    for (int i = 1; i <= count; i++)
    {
      var ho = Ho[random.Next(Ho.Length)];
      var tenDem = TenDem[random.Next(TenDem.Length)];
      var ten = Ten[random.Next(Ten.Length)];
      var hoTen = $"{ho} {tenDem} {ten}";

      var maGV = $"GV{i:D3}";
      var email = $"{ten.ToLower()}.{ho.ToLower()}{i}@university.edu.vn";
      var phone = $"09{random.Next(10000000, 99999999)}";

      var ngaySinh = new DateTime(
          random.Next(1970, 1995),
          random.Next(1, 13),
          random.Next(1, 28)
      );

      list.Add(new GiangVien
      {
        Id = i,
        MaGiangVien = maGV,
        HoTen = hoTen,
        Email = email,
        DienThoai = phone,
        NgaySinh = ngaySinh,
        KhoaId = random.Next(1, maxKhoaId + 1),
        BangCapId = random.Next(1, maxBangCapId + 1)
      });
    }

    return list;
  }
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