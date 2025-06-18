using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
  public static readonly string connectionString = "server=localhost;database=another;user=root;password=admin";
  public DbSet<Khoa> Khoa { get; set; }
  public DbSet<BangCap> BangCap { get; set; }
  public DbSet<HeSoBangCap> HeSoBangCap { get; set; }
  public DbSet<GiangVien> GiangVien { get; set; }

  public DbSet<HocPhan> HocPhan { get; set; }
  public DbSet<HeSoHocPhan> HeSoHocPhan { get; set; }
  public DbSet<HocKi> HocKi { get; set; }
  public DbSet<LopHocPhan> LopHocPhan { get; set; }
}