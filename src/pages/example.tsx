import Link from 'next/link'
import Flex from '@csszen/components.flex'

import Results from '../components/Results'
import Footer from '../components/Footer'

import results from 'public/example-results.json'


export default function Example () {
    return (
        <Flex verticle grow>
            <Flex className="main" grow justifyContent="center">
                <Flex className="main__content" grow>
                    <Results results={results} />
                </Flex>
            </Flex>
            <Footer>
                <Flex>This page is for illustraion. Go to&nbsp;<Link href="/">generate your report</Link>.</Flex>
            </Footer>
        </Flex>
    )
}
