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
}