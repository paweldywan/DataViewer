using DataViewer.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DataViewer.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController(DataViewerContext dataViewerContext) : ControllerBase
    {
        public async Task<IActionResult> Get()
        {
            var result = await dataViewerContext.Products
                .Include(p => p.Images)
                .ToListAsync();

            return Ok(result);
        }
    }
}
