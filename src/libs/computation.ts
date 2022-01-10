import conjunct from './conjunct'
import groupBy from './groupby'
import sortBy from './sortby'
import formatDate from './formatDate'


export interface IRecord {
    'Apple ID Number': string  // '16961810402'
    'Apple Music Subscription': string // 'true',
    'Artist Name': string // 'The Police',
    'Build Version': string // 'Music/1.1.6 macOS/11.6 build/20G165 model/MacBookPro17,1',
    'Client IP Address': string // '124.79.133.144',
    'Device Identifier': string // 'A0781783EC55',
    'End Position In Milliseconds': string // '253966',
    'End Reason Type': string // 'NATURAL_END_OF_TRACK',
    'Event End Timestamp': string // '2021-09-22T18:11:19.269Z',
    'Event Reason Hint Type': string // 'NOT_SPECIFIED',
    'Event Received Timestamp': string // '2021-09-23T02:38:13.269Z',
    'Event Start Timestamp': string // '2021-09-22T18:07:05.303Z',
    'Event Type': string // 'PLAY_END',
    'Feature Name': string // 'library',
    'Item Type': string // 'ITUNES_STORE_CONTENT',
    'Media Duration In Milliseconds': string // '254026',
    'Media Type': string // 'AUDIO',
    'Metrics Bucket Id': string // '8948',
    'Metrics Client Id': string // '3z3VGMtQzRBz4bhz9A0z16BX98u6f',
    'Milliseconds Since Play': string // '30414000',
    'Offline': string // 'false',
    'Play Duration Milliseconds': string // '253966',
    'Provided Audio Bit Depth': string // '24',
    'Provided Audio Channel': string // 'stereo',
    'Provided Audio Sample Rate': string // '44100',
    'Provided Bit Rate': string // '0',
    'Provided Codec': string // 'alac',
    'Provided Playback Format': string // 'STEREO',
    'Session Is Shared': string // '',
    'Shared Activity Devices-Current': string // '',
    'Shared Activity Devices-Max': string // '',
    'Song Name': string // 'Every Breath You Take',
    'Source Type': string // 'ORIGINATING_DEVICE',
    'Start Position In Milliseconds': string // '0',
    'Store Front Name': string // 'United States',
    'User’s Audio Quality': string // 'LOSSLESS',
    'User’s Playback Format': string // 'SPATIAL',
    'UTC Offset In Seconds': string // '28800'
}

export interface IResult {
    plays: number
    time: number
}

export interface IRecordEvent {
    id: string,
    datetime: Date,
    song: string,
    artist: string,
    duration: number,
    ended: boolean,
}

export interface IOverviewPlayResult extends IResult {
    year: number
    dayCount: number
    songCount: number
    song: ISongPlayResult
    artistCount: number
    artist: IArtistPlayResult
}

export interface ISongPlayResult extends IResult {
    key: string
    name: string
    artist: string
}

export interface IArtistPlayResult extends IResult {
    name: string
    songs: ISongPlayResult[]
}

export interface ISongPlayDayResult extends IResult {
    date: string
    songCount: number
    song: ISongPlayResult
    artist: IArtistPlayResult
}

export interface ISongPlayMonthResult extends IResult {
    month: string
    monthOrder: number
}

export interface ISongPlayHourResult extends IResult {
    hour: string
}

export interface IAnalyseResults {
    overviewPlayResult: IOverviewPlayResult
    songPlayResults: ISongPlayResult[]
    artistPlayResults: IArtistPlayResult[]
    songPlayDayResults: ISongPlayDayResult[]
    songPlayMonthResults: ISongPlayMonthResult[]
    songPlayHourResults: ISongPlayHourResult[]
}

const sortByTime = sortBy('time', true)

const sortByDate = <T extends {date: string}> (xs: T[]) => {
    return xs.sort((l, r) => +new Date(l.date) - +new Date(r.date))
}

const sortByMonth = <T extends {month: string}> (xs: T[]) => {
    return xs.sort((l, r) => +new Date(l.month) - +new Date(r.month))
}

const sortByHour = <T extends {hour: string}> (xs: T[]) => {
    return xs.sort((l, r) => parseInt(l.hour, 10) - parseInt(r.hour, 10))
}

export function getRecentYear () {
    const currentYear = new Date().getFullYear()
    if (new Date().getMonth() < 5) return currentYear - 1
    return currentYear
}

export function millisecondsToHours (milliseconds: number) {
    return milliseconds / 1000 / 60 / 60
}

function sumDuration (recordEvents: IRecordEvent[]) {
    return recordEvents.reduce((r, recordEvent) => r + recordEvent.duration, 0)
}

function sumPlayCount (recordEvents: IRecordEvent[]) {
    return recordEvents.filter(recordEvent => recordEvent.ended).length
}

function mergeRecordEvents<TResult> (
    recordEvents: IRecordEvent[],
    tagger: F1<IRecordEvent, string>,
    mapper: F1<[string, IRecordEvent[]], TResult>
) {
    return Object.entries(groupBy(recordEvents, tagger)).map(mapper)
}

function mergeSongRecordEvents (recordEvents: IRecordEvent[]): ISongPlayResult[] {
    return sortByTime(mergeRecordEvents(recordEvents, e => e.id, ([key, songRecordEvents]) => ({
        key,
        time: sumDuration(songRecordEvents),
        plays: sumPlayCount(songRecordEvents),
        name: songRecordEvents[0].song,
        artist: songRecordEvents[0].artist,
    })))
}

function mergeArtistRecordEvents (recordEvents: IRecordEvent[]): IArtistPlayResult[] {
    return sortByTime(Object.entries(groupBy(recordEvents, e => e.artist)).map(([name, artistRecordEvents]) => ({
        name,
        time: sumDuration(artistRecordEvents),
        plays: sumPlayCount(artistRecordEvents),
        songs: mergeSongRecordEvents(artistRecordEvents).slice(0, 10),
    })))
}

function isValidTimestamp (timestampString: string) {
    return !isNaN(new Date(timestampString).getTime())
}

function resetRecordTimestampOffset (record: IRecord, timestampKey: keyof IRecord) {
    return new Date(
        +new Date(record[timestampKey]) +
        // NOTE: Apple Music log offset is oppsite to JS Date
        parseInt(record['UTC Offset In Seconds'], 10) * 1000 +
        new Date().getTimezoneOffset() * 60 * 1000
    )
}

export class RecordEventFormat {
    public static date (recordEvent: IRecordEvent) {
        return formatDate(recordEvent.datetime)
    }

    public static month (recordEvent: IRecordEvent) {
        return new Date(recordEvent.datetime).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
        })
    }

    public static hour (recordEvent: IRecordEvent) {
        const date = new Date(recordEvent.datetime)
        return String(date.getDay() * 24 + date.getHours())
    }
}

class RecordFilter {
    public static isPlay (record: IRecord): boolean {
        return Boolean(
            record['Event Type'] && record['Event Type'].startsWith('PLAY')
        )
    }

    public static isLyric (record: IRecord): boolean {
        return Boolean(
            record['Event Type'] && record['Event Type'].startsWith('LYRIC')
        )
    }

    public static isValid (record: IRecord): boolean {
        return Boolean(
            record['Song Name'] &&
            record['Artist Name'] &&
            record['Media Type'] === 'AUDIO' &&
            record['Item Type'] !== 'ORIGINAL_CONTENT_SHOWS' &&
            record['Play Duration Milliseconds'] && Number(record['Media Duration In Milliseconds']) > 0 &&
            record['Media Duration In Milliseconds'] &&
            record['Event End Timestamp'] && isValidTimestamp(record['Event End Timestamp']) &&
            record['UTC Offset In Seconds']
        )
    }

    public static inRecentYear (record: IRecord): boolean {
        const recentYear = getRecentYear()
        const recordYear = resetRecordTimestampOffset(record, 'Event Start Timestamp').getUTCFullYear()
        return recentYear === recordYear
    }
}

class RecordMapper {
    public static hashPlay (record: IRecord): string {
        return `${record['Song Name']} by ${record['Artist Name']}`
    }

    public static bleachRecord (record: IRecord): IRecordEvent {
        return {
            id: RecordMapper.hashPlay(record),
            datetime: resetRecordTimestampOffset(record, 'Event Start Timestamp'),
            song: record['Song Name'],
            artist: record['Artist Name'],
            duration: Number(record['Play Duration Milliseconds']),
            ended: record['End Reason Type'] === 'NATURAL_END_OF_TRACK',
        }
    }
}

export class ResultsMapper {
    public static times<T extends IResult> (results: T[]): number[] {
        return results.map(result => result.time)
    }

    public static normalizeResultsTimes<T extends IResult> (results: T[]): T[] {
        if (results.length <= 1) return results

        const times = ResultsMapper.times(results)
        const max = Math.max(...times)
        const min = Math.min(...times)
        const range = max - min
        return results.map(result => Object.assign({}, result, {
            time: (result.time - min) / range,
        }))
    }

    public static biasResultsTimes<T extends IResult> (results: T[], bias: number = 0.5, amplify: number = 1): T[] {
        return ResultsMapper.normalizeResultsTimes(results).map(result => Object.assign({}, result, {
            time: (bias + (result.time * (1 - bias))) * amplify,
        }))
    }
}

export class Analyser {
    public constructor (
        private records: IRecord[]
    ) {
    }

    public async read (): Promise<IAnalyseResults> {
        // it setTimeout here to unblock rendering before promise resolved
        return new Promise(resolve => setTimeout(() => resolve({
            overviewPlayResult: this.overviewPlayResult,
            songPlayResults: this.songPlayResults.slice(0, 10),
            artistPlayResults: this.artistPlayResults.slice(0, 10),
            songPlayMonthResults: this.songPlayMonthResults,
            songPlayDayResults: this.songPlayDayResults,
            songPlayHourResults: this.songPlayHourResults,
        })))
    }

    public get playEvents (): IRecordEvent[] {
        return this.reduce(
            conjunct(RecordFilter.isValid, RecordFilter.isPlay, RecordFilter.inRecentYear),
            RecordMapper.bleachRecord
        )
    }

    public get lyricEvents (): IRecordEvent[] {
        return this.reduce(
            conjunct(RecordFilter.isValid, RecordFilter.isLyric, RecordFilter.inRecentYear),
            RecordMapper.bleachRecord
        )
    }

    public get overviewPlayResult (): IOverviewPlayResult {
        const recordEvents = this.playEvents
        const songPlayResults = this.songPlayResults
        const artistPlayResults = this.artistPlayResults
        const songPlayDayResults = this.songPlayDayResults

        return {
            time: sumDuration(recordEvents),
            plays: sumPlayCount(recordEvents),
            year: getRecentYear(),
            dayCount: songPlayDayResults.length,
            songCount: songPlayResults.length,
            song: songPlayResults[0],
            artistCount: artistPlayResults.length,
            artist: artistPlayResults[0],
        }
    }

    public get songPlayResults (): ISongPlayResult[] {
        return mergeSongRecordEvents(this.playEvents)
    }

    public get artistPlayResults (): IArtistPlayResult[] {
        return mergeArtistRecordEvents(this.playEvents)
    }

    public get songPlayDayResults (): ISongPlayDayResult[] {
        return sortByDate(mergeRecordEvents(this.playEvents, RecordEventFormat.date, ([date, recordEvents]) => {
            const songs = mergeSongRecordEvents(recordEvents)
            const artists = mergeArtistRecordEvents(recordEvents)
            return {
                date,
                time: sumDuration(recordEvents),
                plays: sumPlayCount(recordEvents),
                songCount: songs.length,
                song: songs[0],
                artist: Object.assign({}, artists[0], {songs: []}),
            }
        }))
    }

    public get songPlayMonthResults (): ISongPlayMonthResult[] {
        return sortByMonth(mergeRecordEvents(this.playEvents, RecordEventFormat.month, ([month, recordEvents]) => ({
            month,
            monthOrder: new Date(recordEvents[0].datetime).getMonth(),
            time: sumDuration(recordEvents),
            plays: sumPlayCount(recordEvents),
        })))
    }

    public get songPlayHourResults (): ISongPlayHourResult[] {
        return sortByHour(mergeRecordEvents(this.playEvents, RecordEventFormat.hour, ([hour, recordEvents]) => ({
            hour,
            time: sumDuration(recordEvents),
            plays: sumPlayCount(recordEvents),
        })))
    }

    private reduce<T> (
        predicate: (record: IRecord) => boolean,
        mapper: (record: IRecord) => T
    ) {
        return this.records.filter(predicate).map(mapper)
    }
}
