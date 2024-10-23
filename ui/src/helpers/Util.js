export const convertDuration = (f_duration) => {
    const minutes = f_duration / 60;
    const seconds = f_duration % 60;
    return `${minutes.toString().split('.')[0].replace(/^0/, "").length < 1 ? '0' : minutes.toString().split('.')[0].replace(/^0/, "")}:${seconds.toString().split('.')[0].length > 1 ? seconds.toString().split('.')[0] : '0' + seconds.toString().split('.')[0]}`;
};

export const convertSongInfo = (song) => {
    return {
        artistName: song.artistName,
        albumName: song.albumName,
        songName: song.name,
        duration: song.duration,
        guid: song.audioFileGuid, 
        coverImageGuid: song.coverImageGuid
    }
};

export const getTodaysDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
};

export const parseEmails = (s_emails) => {
    let emails = s_emails.split("\n");
    emails = emails.map(e => e.trim());
    if (emails.length === 1 && emails[0] === "") {
        emails = [];
    }
    return JSON.stringify(emails);
}