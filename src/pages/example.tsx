import {useState, useEffect} from 'react'
import Link from 'next/link'

import {IAnalyseResults} from '../libs/computation'

import Results from '../components/Results'
import Footer from '../components/Footer'
import Flex from 'src/components/Flex'


export default function Example () {
    // tslint:disable-next-line: no-magic-numbers
    const [resolving, setResolving] = useState(36857)
    const [results, setResults] = useState<IAnalyseResults | undefined>(undefined)

    useEffect(() => {
        const hash = '3cec0254-f02d-40f9-a41d-611b6ea4261e'
        const url = `https://s3.us-east-2.amazonaws.com/static.somarl.com/${hash}/example-results.json`
        fetch(url).then(r => r.json()).then(r => {
            setResults(r as ANY)
            setResolving(0)
        })
    }, [])

    return (
        <Flex verticle grow>
            <Flex className="main" grow justifyContent="center">
                <Flex className="main__content" grow>
                    <Results results={results} resolving={resolving} />
                </Flex>
            </Flex>
            <Footer>
                <Flex>This page is for illustraion. Go to&nbsp;<Link href="/">generate your report</Link>.</Flex>
            </Footer>
        </Flex>
    )
}
