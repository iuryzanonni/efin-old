using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class TimeWork_Add_User : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Userid",
                table: "TimeWork",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TimeWork_Userid",
                table: "TimeWork",
                column: "Userid");

            migrationBuilder.AddForeignKey(
                name: "FK_TimeWork_User_Userid",
                table: "TimeWork",
                column: "Userid",
                principalTable: "User",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeWork_User_Userid",
                table: "TimeWork");

            migrationBuilder.DropIndex(
                name: "IX_TimeWork_Userid",
                table: "TimeWork");

            migrationBuilder.DropColumn(
                name: "Userid",
                table: "TimeWork");
        }
    }
}
