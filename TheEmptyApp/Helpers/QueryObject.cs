namespace TheEmptyApp.Helpers;

public class QueryObject {
    public string QueryString { get; set; } = "";
    public string SearchType { get; set; } = "all";
    public int PageNumber { get; set; } = 1;
    public int ItemsPerPage { get; set; } = 10;

    public static string[] ValidSearchTypes { get; } = ["all", "artist", "album", "song"];
}