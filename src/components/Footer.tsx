import {ReactNode} from 'react'
import Link from 'next/link'
import Flex from '@csszen/components.flex'
import OcticonGithub from '@csszen/icons.github'

import Vercel from '../components/icons/Vercel'
import Apple from '../components/icons/Apple'
import Hr from '../components/Hr'


interface IProps {
    children?: ReactNode
}

export default function Footer ({children}: IProps) {
    return (
        <Flex className="footer" justifyContent="center">
            <Flex className="footer__content" verticle grow>
                {children}
                <Flex>No data ever leaves your device and all computation is done in the browser.</Flex>
                <Flex>Apple and Apple Music are trademarks of Apple Inc., registered in the U.S. and other countries.</Flex>

                <Flex>
                    <Flex alignItems="center">
                        <Link href="https://www.apple.com/legal/privacy/">
                            <a className="icon-group" target="_blank"><Apple /><span>Privacy Policy</span></a>
                        </Link>
                    </Flex>
                    <Flex><span>&nbsp;</span><span>|</span><span>&nbsp;</span></Flex>
                    <Flex alignItems="center">
                        <Link href="https://github.com/somarlyonks/apple-music-analyser/">
                            <a className="icon-group" target="_blank"><OcticonGithub /><span>Source Code</span></a>
                        </Link>
                    </Flex>
                </Flex>

                <Hr />

                <Flex>
                    <Flex>Copyright © 2021 Yang.</Flex>
                    <Flex><span>Inspired by <Link href="https://patmurray.co">Pat Murray</Link>.</span></Flex>
                    <Flex grow />
                    <Flex alignItems="center">
                        <span>Hosted with</span>
                        <span style={{color: '#e25555'}}>&hearts;</span>
                        <span>by</span>
                        <Link href="https://vercel.com/"><a className="vercel-icon" role="button" target="_blank"><Vercel /></a></Link>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
