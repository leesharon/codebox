import { Fragment, FunctionComponent, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FlexColumn, Heading1 } from '../components/Generics'
import { User } from '../models/user.interface'

interface Props {
    loggedinUser: User | undefined
}

export const Lobby: FunctionComponent<Props> = ({ loggedinUser }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedinUser || !loggedinUser.isMentor) navigate('/')
    }, [loggedinUser, navigate])

    return (
        <Fragment>
            <LobbyContainer align='center' gap={50}>
                <Heading1 fontSize='3em' align='center'>
                    {loggedinUser && `Hello ${loggedinUser.username}, `}
                    Choose a Code Block.
                </Heading1>
            </LobbyContainer>
        </Fragment>
    )
}

const LobbyContainer = styled(FlexColumn)`
    padding-top: 50px;
`