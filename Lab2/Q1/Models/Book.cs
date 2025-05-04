using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Question1.Models
{
    public class Book
    {
        [Key]
        public int bookId { get; set; }

        public string? name { get; set; }
        public string? description { get; set; }
        public decimal? price { get; set; }
        public string? note { get; set; } 
    }
}