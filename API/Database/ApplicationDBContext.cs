using API.Models;
using API.Models.Log;
using Microsoft.EntityFrameworkCore;

namespace API.Database
{
	public class ApplicationDBContext: DbContext
	{
		public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) { }

		public DbSet<User> User { get; set; }
		public DbSet<TokenLog> TokenLog { get; set; }

		protected override void OnModelCreating(ModelBuilder model)
		{
			model.Entity<User>()
				.HasIndex(u => u.username)
				.IsUnique();
		}
	}
}
