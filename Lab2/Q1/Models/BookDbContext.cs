namespace Question1.Models;
using Microsoft.EntityFrameworkCore;

public class BookDbContext : DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
    }
    public DbSet<Book> Book { get; set; } 
}