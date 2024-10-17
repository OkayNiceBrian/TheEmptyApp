using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TheEmptyApp.Migrations
{
    /// <inheritdoc />
    public partial class SongLikes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3b70d35d-51f7-4e2e-9c4b-e95e59f6d074");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c639b4c5-912e-4e89-8727-afd42b786645");

            migrationBuilder.CreateTable(
                name: "SongUser",
                columns: table => new
                {
                    LikedByUsersId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LikedSongsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SongUser", x => new { x.LikedByUsersId, x.LikedSongsId });
                    table.ForeignKey(
                        name: "FK_SongUser_AspNetUsers_LikedByUsersId",
                        column: x => x.LikedByUsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SongUser_Songs_LikedSongsId",
                        column: x => x.LikedSongsId,
                        principalTable: "Songs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a7854cf2-a456-4dbd-9666-cd0a524fc7d6", null, "User", "USER" },
                    { "b9f6c35a-4d52-40e9-940c-68d9ba5f68f1", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_SongUser_LikedSongsId",
                table: "SongUser",
                column: "LikedSongsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SongUser");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a7854cf2-a456-4dbd-9666-cd0a524fc7d6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b9f6c35a-4d52-40e9-940c-68d9ba5f68f1");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3b70d35d-51f7-4e2e-9c4b-e95e59f6d074", null, "Admin", "ADMIN" },
                    { "c639b4c5-912e-4e89-8727-afd42b786645", null, "User", "USER" }
                });
        }
    }
}
