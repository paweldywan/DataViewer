using DataViewer.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataViewer.DAL
{
    public class DataViewerContext(DbContextOptions options) : DbContext(options)
    {
        public virtual DbSet<Product> Products { get; set; }

        public virtual DbSet<Image> Images { get; set; }
    }
}
