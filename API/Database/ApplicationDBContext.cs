using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Database
{
	public class ApplicationDBContext: DbContext
	{
		public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) { }

		public DbSet<User> User { get; set; }

		protected override void OnModelCreating(ModelBuilder model)
		{
			model.Entity<User>()
				.HasIndex(u => u.username)
				.IsUnique();
		}
	}
}
