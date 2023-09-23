using Microsoft.EntityFrameworkCore;

namespace FCxLabs.Api.Domains;

public class FCxLabsContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    public FCxLabsContext(DbContextOptions<FCxLabsContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("tb_user");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("user_id");
            entity.Property(e => e.Username).HasColumnName("username").IsRequired();
            entity.Property(e => e.Name).HasColumnName("name").IsRequired();
            entity.Property(e => e.Password).HasColumnName("password").IsRequired();
            entity.Property(e => e.Email).HasColumnName("email").IsRequired();
            entity.Property(e => e.Phone).HasColumnName("phone");
            entity.Property(e => e.CPF).HasColumnName("cpf").IsRequired();
            entity.Property(e => e.Birtday).HasColumnName("birtday");
            entity.Property(e => e.MotherName).HasColumnName("mother_name");
            entity.Property(e => e.Status).HasColumnName("status")
                .HasConversion(x => (int)x, x => (Status)x);
            entity.Property(e => e.CreatedAt).HasColumnName("created_at").IsRequired();
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
        });
    }
}