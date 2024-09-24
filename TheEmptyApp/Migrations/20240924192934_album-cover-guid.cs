using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheEmptyApp.Migrations
{
    /// <inheritdoc />
    public partial class albumcoverguid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CoverImageGuid",
                table: "Albums",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoverImageGuid",
                table: "Albums");
        }
    }
}
