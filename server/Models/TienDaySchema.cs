using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class DinhMucTietChuan
{
  public static List<DinhMucTietChuan> Generate(int fromYear, int toYear)
  {
    var list = new List<DinhMucTietChuan>();
    var random = new Random();
    int id = 1;

    for (int year = fromYear; year <= toYear; year++)
    {
      list.Add(new DinhMucTietChuan
      {
        Id = id++,
        GiaTri = (ulong)random.Next(200, 500), // ví dụ 200–500 tiết/năm
        NamApDung = year,
        ThoiGianCapNhat = DateTime.UtcNow.AddDays(-random.Next(0, 365))
      });
    }

    return list;
  }
  [Key]
  public int Id { get; set; }
  public ulong GiaTri { get; set; }
  public int NamApDung { get; set; }
  public DateTime ThoiGianCapNhat { get; set; } = DateTime.UtcNow;
}

public class HeSoLopHocPhan
{
  public static List<HeSoLopHocPhan> Generate(int fromYear, int toYear)
  {
    var list = new List<HeSoLopHocPhan>();
    var random = new Random();
    int id = 1;

    for (int year = fromYear; year <= toYear; year++)
    {
      for (int i = 0; i < 3; i++) // mỗi năm 3 mốc khác nhau
      {
        list.Add(new HeSoLopHocPhan
        {
          Id = id++,
          GiaTri = Math.Round(random.NextDouble() * 0.5 + 1.0, 2), // hệ số từ 1.0–1.5
          SoSinhVienToiDa = random.Next(30, 100),
          NamApDung = year,
          ThoiGianCapNhat = DateTime.UtcNow.AddDays(-random.Next(0, 365))
        });
      }
    }

    return list;
  }
  [Key]
  public int Id { get; set; }
  public double GiaTri { get; set; }
  public int SoSinhVienToiDa { get; set; }
  public int NamApDung { get; set; }
  public DateTime ThoiGianCapNhat { get; set; } = DateTime.UtcNow;
}