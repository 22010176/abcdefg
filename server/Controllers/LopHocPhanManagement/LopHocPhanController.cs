using Microsoft.AspNetCore.Mvc;

namespace server.Controllers.LopHocPhanManagement;

[ApiController]
[Route("[controller]")]
public class LopHocPhanController : ControllerBase
{
  [HttpGet]
  public ActionResult Get()
  {
    return Ok();
  }
  [HttpPost]
  public ActionResult Post()
  {
    return Ok();
  }
  [HttpPut]
  public ActionResult Put()
  {
    return Ok();
  }
  [HttpDelete]
  public ActionResult DeleHttpDelete()
  {
    return Ok();
  }
}