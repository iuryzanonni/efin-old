﻿// <auto-generated />
using System;
using API.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Migrations
{
    [DbContext(typeof(ApplicationDBContext))]
    partial class ApplicationDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.10");

            modelBuilder.Entity("API.Models.Log.TokenLog", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("createToken")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("token")
                        .HasColumnType("longtext");

                    b.HasKey("id");

                    b.ToTable("TokenLog");
                });

            modelBuilder.Entity("API.Models.TimeWork.TimeWork", b =>
                {
                    b.Property<DateTime>("DateDay")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("BackLunch")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("EndDay")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("StartDay")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("StopLunch")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("Userid")
                        .HasColumnType("int");

                    b.HasKey("DateDay");

                    b.HasIndex("Userid");

                    b.ToTable("TimeWork");
                });

            modelBuilder.Entity("API.Models.User", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("email")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("name")
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<string>("password")
                        .HasColumnType("longtext");

                    b.Property<string>("role")
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)");

                    b.Property<string>("username")
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)");

                    b.HasKey("id");

                    b.HasIndex("username")
                        .IsUnique();

                    b.ToTable("User");
                });

            modelBuilder.Entity("API.Models.TimeWork.TimeWork", b =>
                {
                    b.HasOne("API.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("Userid");

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
