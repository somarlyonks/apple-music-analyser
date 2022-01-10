import {useState, useEffect} from 'react'
import Link from 'next/link'
import Flex from '@csszen/components.flex'

import Results from '../components/Results'
import Footer from '../components/Footer'

import {IAnalyseResults} from '../libs/computation'


export default function Example () {
    // tslint:disable-next-line: no-magic-numbers
    const [resolving, setResolving] = useState(36857)
    const [results, setResults] = useState<IAnalyseResults | undefined>(undefined)

    useEffect(() => {
        const hash = '3275e7bf-6e02-4292-a4c9-27b46176bba6'
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
