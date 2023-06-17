using Microsoft.EntityFrameworkCore;
namespace WebApplication1.Models
{ //baza w pamięci po restarcie sie resetuje
    public class PeopleContext : DbContext
    {
        public DbSet<People> People { get; set; }

        public PeopleContext(DbContextOptions<PeopleContext> options) : base(options)
        {

        }
    }
}
//instalacja - Install-Package Microsoft.EntityFrameworkCore.InMemory