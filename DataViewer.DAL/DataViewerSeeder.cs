using DataViewer.DAL.Entities;
using DataViewer.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Json;
using System.Text.Json;

namespace DataViewer.DAL
{
    public class DataViewerSeeder(DataViewerContext dataViewerContext, IHttpClientFactory httpClientFactory)
    {
        private readonly HttpClient httpClient = httpClientFactory.CreateClient();

        private async Task SeedProducts()
        {
            var exists = await dataViewerContext.Products.AnyAsync();

            if (exists)
                return;

            var url = "https://dummyjson.com/products";

            var result = await httpClient.GetFromJsonAsync<ProductsModel>(url, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (result?.Products == null)
                return;

            result.Products.ForEach(p =>
            {
                p.Id = 0;
                p.Images = p.ImagesArray?
                    .Select(i => new Image
                    {
                        Url = i
                    })
                    .ToList();
            });

            dataViewerContext.Products.AddRange(result.Products);

            await dataViewerContext.SaveChangesAsync();
        }

        public async Task Migrate()
        {
            var canMigrate = (await dataViewerContext.Database.GetPendingMigrationsAsync()).Any();

            if (canMigrate)
            {
                await dataViewerContext.Database.MigrateAsync();
            }

            await SeedProducts();
        }
    }
}
