using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TheEmptyApp.Migrations
{
    /// <inheritdoc />
    public partial class Listens : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0f6fbb2d-8043-4cf8-9c1c-a5b8ce3a294e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7adc1de2-a194-4593-82ea-5840381e8488");

            migrationBuilder.AddColumn<long>(
                name: "Listens",
                table: "Songs",
                type: "bigint",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3b70d35d-51f7-4e2e-9c4b-e95e59f6d074", null, "Admin", "ADMIN" },
                    { "c639b4c5-912e-4e89-8727-afd42b786645", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3b70d35d-51f7-4e2e-9c4b-e95e59f6d074");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c639b4c5-912e-4e89-8727-afd42b786645");

            migrationBuilder.DropColumn(
                name: "Listens",
                table: "Songs");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0f6fbb2d-8043-4cf8-9c1c-a5b8ce3a294e", null, "Admin", "ADMIN" },
                    { "7adc1de2-a194-4593-82ea-5840381e8488", null, "User", "USER" }
                });
        }
    }
}
