import Link from 'next/link'
import CsvParse, {CSVReaderProps} from 'react-csv-reader'

import OcticonUpload from '../../icons/Upload'
import ArrowUpRight from '../../icons/ArrowUpRight'


interface IProps {
    dataHandler: CSVReaderProps['onFileLoaded']
}

export default function Uploader ({dataHandler}: IProps) {
    return (
        <div className="uploader">
            <section>
                <span>Open your </span>
                <div className="file-input">
                    <OcticonUpload />
                    <CsvParse
                        label="Apple Music Play Activity.csv"
                        onFileLoaded={dataHandler}
                        parserOptions={{header: true}}
                    />
                </div>
                <span> to generate your report.</span>
            </section>

            <section>
                <h3>Where is the file?</h3>
                <p>After requesting for a download from <a href="https://privacy.apple.com" target="_blank" rel="noopener">privacy.apple.com</a>. The file is at:</p>
                <pre>
                    <code>Apple Media Services information</code><br />
                    <code>└─Apple_Media_Services</code><br />
                    <code>  └─Apple Music Activity</code><br />
                    <code>    └─Apple Music Play Activity.csv</code>
                </pre>
                <p>You can also <a href="https://blog.somarl.com/post/export-apple-music-activities" target="_blank" rel="noopener">follow this blog post</a> for more detailed instructions.</p>
            </section>

            <section>
                <Link legacyBehavior href="/example">
                    <a className="font-size--h3">Take an insight of the example report <ArrowUpRight className="icon-arrow-up-right" /></a>
                </Link>
            </section>
        </div>
    )
}
