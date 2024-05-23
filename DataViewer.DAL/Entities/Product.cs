using DataViewer.DAL.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataViewer.DAL
{
    public class Product
    {
        public int Id { get; set; }

        public required string Title { get; set; }

        public required string Description { get; set; }

        public int Price { get; set; }

        public float DiscountPercentage { get; set; }

        public float Rating { get; set; }

        public int Stock { get; set; }

        public required string Brand { get; set; }

        public required string Category { get; set; }

        public required string Thumbnail { get; set; }

        [NotMapped]
        [JsonPropertyName(nameof(Images))]
        public string[]? ImagesArray { get; set; }

        [JsonPropertyName("imagesCollection")]
        public virtual ICollection<Image>? Images { get; set; }
    }
}

