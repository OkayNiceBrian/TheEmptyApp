using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TheEmptyApp.Migrations
{
    /// <inheritdoc />
    public partial class SongDuration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a7854cf2-a456-4dbd-9666-cd0a524fc7d6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b9f6c35a-4d52-40e9-940c-68d9ba5f68f1");

            migrationBuilder.AddColumn<float>(
                name: "Duration",
                table: "Songs",
                type: "real",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "63060fd3-83b1-4e34-acf5-59695e33629c", null, "User", "USER" },
                    { "c3ecf5ec-7184-40b5-b790-cf38cef70ed0", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "63060fd3-83b1-4e34-acf5-59695e33629c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3ecf5ec-7184-40b5-b790-cf38cef70ed0");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Songs");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a7854cf2-a456-4dbd-9666-cd0a524fc7d6", null, "User", "USER" },
                    { "b9f6c35a-4d52-40e9-940c-68d9ba5f68f1", null, "Admin", "ADMIN" }
                });
        }
    }
}
