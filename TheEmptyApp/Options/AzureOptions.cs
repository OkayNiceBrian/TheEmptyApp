namespace TheEmptyApp.Options;

public class AzureOptions {
    /*
     * "BlobUrl": "https://emptyappstorageaccount.blob.core.windows.net/emptyappcontainer1",
     * "ResourceGroup": "BrianResourceGroup",
     * "Account": "emptyappstorageaccount",
     * "Container": "emptyappcontainer1"
     * "ConnectionString": "DefaultEndpointsProtocol=https;AccountName=emptyappstorageaccount;AccountKey=H0CFVKZuIGxlnFFO54fMh6p9787qknEZqVapqNtBawPfrYZeSes0baXar4lb+udroNepPkRJ+nLa+AStzrYzzA==;EndpointSuffix=core.windows.net"
     */
    public string? BlobUrl { get; set; }
    public string? ResourceGroup { get; set; }
    public string? Account { get; set; }
    public string? Container { get; set; }
    public string? ConnectionString { get; set; }
}