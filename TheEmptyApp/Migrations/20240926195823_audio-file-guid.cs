using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheEmptyApp.Migrations
{
    /// <inheritdoc />
    public partial class audiofileguid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AudioFileGuid",
                table: "Songs",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AudioFileGuid",
                table: "Songs");
        }
    }
}
