using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TheEmptyApp.Migrations
{
    /// <inheritdoc />
    public partial class Genres : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "98b56a59-e593-4dc5-8fac-06c2ade2b3ba");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d9f9f66e-e035-4d9e-a52e-b6c11e1b2d6b");

            migrationBuilder.AddColumn<string>(
                name: "PrimaryGenre",
                table: "Albums",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SecondaryGenre",
                table: "Albums",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0f6fbb2d-8043-4cf8-9c1c-a5b8ce3a294e", null, "Admin", "ADMIN" },
                    { "7adc1de2-a194-4593-82ea-5840381e8488", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0f6fbb2d-8043-4cf8-9c1c-a5b8ce3a294e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7adc1de2-a194-4593-82ea-5840381e8488");

            migrationBuilder.DropColumn(
                name: "PrimaryGenre",
                table: "Albums");

            migrationBuilder.DropColumn(
                name: "SecondaryGenre",
                table: "Albums");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "98b56a59-e593-4dc5-8fac-06c2ade2b3ba", null, "User", "USER" },
                    { "d9f9f66e-e035-4d9e-a52e-b6c11e1b2d6b", null, "Admin", "ADMIN" }
                });
        }
    }
}
