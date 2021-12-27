import {useState, useRef, useEffect, useCallback} from 'react'
import Flex from '@csszen/components.flex'

import Results from '../components/Results'
import Footer from '../components/Footer'

import {IAnalyseResults, IRecord} from '../libs/computation'


export default function Index () {
    const [resolving, setResolving] = useState(0)
    const [results, setResults] = useState<IAnalyseResults | undefined>(undefined)

    const workerRef = useRef<Worker>()

    const dataHandler = useCallback((records: IRecord[]) => {
        setResolving(records.length)
        workerRef.current?.postMessage(records)
    }, [])

    useEffect(() => {
        workerRef.current = new Worker(new URL('../libs/analyse.worker.ts', import.meta.url))
        workerRef.current.onmessage = ({data}) => {
            setResults(data)
            setResolving(0)
        }

        return () => {
            workerRef.current?.terminate()
        }
    }, [])

    return (
        <Flex verticle grow>
            <Flex className="main" grow justifyContent="center">
                <Flex className="main__content" grow>
                    <Results results={results} dataHandler={dataHandler as ANY} resolving={resolving} />
                </Flex>
            </Flex>
            <Footer />
        </Flex>
    )
}
