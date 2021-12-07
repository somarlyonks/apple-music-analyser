import {useState, useRef, useEffect, useCallback} from 'react'
import Flex from '@csszen/components.flex'

import Banner from '../components/Banner'
import Results from '../components/Results'
import Footer from '../components/Footer'

import {IAnalyseResults, IRecord} from '../libs/computation'


export default function Index () {
    const [resolving, setResolving] = useState(false)
    const [results, setResults] = useState<IAnalyseResults | null>(null)

    const workerRef = useRef<Worker>()

    const dataHandler = useCallback((records: IRecord[]) => {
        setResolving(true)
        workerRef.current?.postMessage(records)
    }, [])

    useEffect(() => {
        workerRef.current = new Worker(new URL('../libs/analyse.worker.ts', import.meta.url))
        workerRef.current.onmessage = ({data}) => {
            setResults(data)
            setResolving(false)
        }

        return () => {
            workerRef.current?.terminate()
        }
    }, [])

    return (
        <Flex verticle grow>
            <Flex className="main" grow justifyContent="center">
                <Flex className="main__content">
                    {results
                        ? <Results {...results} />
                        : <Banner resolving={resolving} dataHandler={dataHandler as ANY} />
                    }
                </Flex>
            </Flex>
            <Footer />
        </Flex>
    )
}
