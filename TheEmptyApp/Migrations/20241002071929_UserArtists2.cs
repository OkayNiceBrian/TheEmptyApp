using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TheEmptyApp.Migrations
{
    /// <inheritdoc />
    public partial class UserArtists2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "211637d9-5cf2-4bfd-b81a-c0cdbaa67318");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "93c3d833-1b5d-4b40-8e62-542701461960");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "98b56a59-e593-4dc5-8fac-06c2ade2b3ba", null, "User", "USER" },
                    { "d9f9f66e-e035-4d9e-a52e-b6c11e1b2d6b", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "98b56a59-e593-4dc5-8fac-06c2ade2b3ba");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d9f9f66e-e035-4d9e-a52e-b6c11e1b2d6b");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "211637d9-5cf2-4bfd-b81a-c0cdbaa67318", null, "User", "USER" },
                    { "93c3d833-1b5d-4b40-8e62-542701461960", null, "Admin", "ADMIN" }
                });
        }
    }
}
