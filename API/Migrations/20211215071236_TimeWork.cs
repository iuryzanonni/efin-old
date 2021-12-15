using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class TimeWork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TimeWork",
                columns: table => new
                {
                    DateDay = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    StartDay = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    StopLunch = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    BackLunch = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDay = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeWork", x => x.DateDay);
                })
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimeWork");
        }
    }
}
