import { Codeblock } from 'models/codeblock.interface'
import { Fragment, FunctionComponent, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { codeblockService } from 'services/codeblock.service'
import styled from 'styled-components'
import { FlexColumn, FlexRow, Heading1 } from '../components/Generics'
import { User } from '../models/user.interface'

interface Props {
    loggedinUser: User | undefined
}

export const Lobby: FunctionComponent<Props> = ({ loggedinUser }) => {
    const navigate = useNavigate()
    const [codeblock, setCodeblocks] = useState<Codeblock[] | undefined>()

    useEffect(() => {
        if (!loggedinUser || !loggedinUser.isMentor) navigate('/')
    }, [loggedinUser, navigate])

    useEffect(() => {
        (async () => {
            try {
                const codeBlocksDB = await codeblockService.query()
                setCodeblocks(codeBlocksDB)
            } catch (err) {
                console.log('Cannot get code blocks', err)
            }
        })()
    }, [setCodeblocks])

    const onSelectCodeblock = (codeblockId: string) => {
        console.log(codeblockId)
    }

    return (
        <Fragment>
            <LobbyContainer align='center' gap={50}>
                <Heading1 fontSize='3em' align='center'>
                    {loggedinUser && `Hello ${loggedinUser.username}, `}
                    Choose a Code Block.
                </Heading1>
                {codeblock && <CodeblockList>
                    {codeblock.map((codeblock, idx) => (
                        <ListItem key={codeblock._id} onClick={() => { onSelectCodeblock(codeblock._id) }} align='center'>
                            {idx + 1 + '. ' + codeblock.title}
                        </ListItem>
                    ))}
                </CodeblockList>}
            </LobbyContainer>
        </Fragment>
    )
}

const LobbyContainer = styled(FlexColumn)`
    padding-top: 50px;
`

const CodeblockList = styled(FlexColumn)`
`

const ListItem = styled(FlexRow)`
    padding: 15px 10px;
`