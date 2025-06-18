using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage;
using MySqlConnector;
using server.Models;
using server.Utils;

namespace server.Controllers.LopHocPhanManagement;

[ApiController]
[Route("[controller]")]
public class LopHocPhanController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;
  static List<object> GetHocKi(AppDbContext context)
  {
    using var connection = DatabaseUtils.GetConnection();
    string query = """
  
  """;
    using var command = new MySqlCommand(query, connection);
    using var reader = command.ExecuteReader();

    List<object> result = [];


    return [.. context.HocKi];
  }
  [HttpGet]
  public ActionResult Get()
  {
    return Ok(GetHocKi(context));
  }

  [HttpPost]
  public async Task<ActionResult> Post(LopHocPhanInput input)
  {
    LopHocPhan lopHocPhan = new()
    {
      TenLopHocPhan = input.TenLopHocPhan,
      SoSinhVienDangKi = input.SoSinhVienDangKi,
      HocPhanId = input.HocPhanId,
      HocKiId = input.HocKiId,
      GiangVienId = input.GiangVienId
    };
    context.LopHocPhan.Add(lopHocPhan);
    await context.SaveChangesAsync();

    return Ok(GetHocKi(context));
  }
  [HttpPut("{id}")]
  public async Task<ActionResult> Put(int id, LopHocPhanInput input)
  {
    LopHocPhan? lopHocPhan = context.LopHocPhan.FirstOrDefault(i => i.Id == id);
    if (lopHocPhan == null) return NotFound();

    lopHocPhan.TenLopHocPhan = input.TenLopHocPhan;
    lopHocPhan.SoSinhVienDangKi = input.SoSinhVienDangKi;
    lopHocPhan.HocPhanId = input.HocPhanId;
    lopHocPhan.HocKiId = input.HocKiId;
    lopHocPhan.GiangVienId = input.GiangVienId;

    await context.SaveChangesAsync();
    return Ok(GetHocKi(context));
  }
  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleHttpDelete(int id)
  {
    LopHocPhan? lopHocPhan = context.LopHocPhan.FirstOrDefault(i => i.Id == id);
    if (lopHocPhan == null) return NotFound();

    context.LopHocPhan.Remove(lopHocPhan);
    await context.SaveChangesAsync();
    return Ok(GetHocKi(context));
  }
}

public record LopHocPhanInput
{
  public string TenLopHocPhan { get; set; } = null!;
  public int SoSinhVienDangKi { get; set; }

  public int? HocPhanId { get; set; }
  public int? HocKiId { get; set; }
  public int? GiangVienId { get; set; }
}