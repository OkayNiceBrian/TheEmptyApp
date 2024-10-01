using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TheEmptyApp.Migrations
{
    /// <inheritdoc />
    public partial class UserArtists : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2cbb67fa-34c9-47f0-84d9-b35748d3ecb5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5c298ea6-fa74-4279-bba5-4746c9435ff6");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Artists",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "211637d9-5cf2-4bfd-b81a-c0cdbaa67318", null, "User", "USER" },
                    { "93c3d833-1b5d-4b40-8e62-542701461960", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "211637d9-5cf2-4bfd-b81a-c0cdbaa67318");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "93c3d833-1b5d-4b40-8e62-542701461960");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Artists");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2cbb67fa-34c9-47f0-84d9-b35748d3ecb5", null, "User", "USER" },
                    { "5c298ea6-fa74-4279-bba5-4746c9435ff6", null, "Admin", "ADMIN" }
                });
        }
    }
}
