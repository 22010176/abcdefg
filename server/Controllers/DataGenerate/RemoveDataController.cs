using Microsoft.AspNetCore.Mvc;

namespace server.Controllers.DataGenerate;

[ApiController]
[Route("[controller]")]
public class RemoveDataController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  [HttpDelete("delete-bang-cap")]
  public ActionResult DeleteBangCap()
  {
    context.BangCap.RemoveRange(context.BangCap);
    context.SaveChanges();
    return Ok();
  }

  [HttpDelete("delete-khoa")]
  public ActionResult DeleteKhoa()
  {
    context.Khoa.RemoveRange(context.Khoa);
    context.SaveChanges();
    return Ok();
  }

  [HttpDelete("delete-giang-vien")]
  public ActionResult DeleteGiangVien()
  {
    context.GiangVien.RemoveRange(context.GiangVien);
    context.SaveChanges();
    return Ok();
  }

  [HttpDelete("delete-hoc-ki")]
  public ActionResult DeleteHocKi()
  {
    context.HocKi.RemoveRange(context.HocKi);
    context.SaveChanges();
    return Ok();
  }

  [HttpDelete("delete-hoc-phan")]
  public ActionResult DeleteHocPhan()
  {
    context.HocPhan.RemoveRange(context.HocPhan);
    context.SaveChanges();
    return Ok();
  }
}