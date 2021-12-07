import CsvParse, {CSVReaderProps} from 'react-csv-reader'


interface IProps {
    resolving: boolean
    dataHandler: CSVReaderProps['onFileLoaded']
}

export default function Banner ({resolving, dataHandler}: IProps) {
    return (
        <div>
            <div>
                <h1>Apple Music Analyser</h1>
                <p >Open your <em>Apple Music Play Activity.csv</em> file below to generate your report.</p>
                {
                    resolving && 'resolving...'
                }
                <CsvParse
                    onFileLoaded={dataHandler}
                    parserOptions={{header: true}}
                />
            </div>

            <div>
                <h3>Where is the file?</h3>
                <p>After downloading it from the privacy portal (<a href="https://privacy.apple.com">privacy.apple.com</a>). The file is at: <code>App Store, iTunes Store, iBooks Store and Apple Music/App_Store_iTunes_Store_iBooks_Store_Apple_Music/Apple Music Activity/Apple Music Play Activity.csv</code></p>
                <p><a href="https://www.macrumors.com/2018/11/29/web-app-apple-music-history/">Follow this tutorial from MacRumors for more detailed instructions.</a></p>
            </div>
        </div>
    )
}
