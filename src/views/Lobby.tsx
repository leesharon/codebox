import { StudentsModal } from 'components/StudentsModal'
import { Codeblock } from 'models/codeblock.interface'
import { Fragment, FunctionComponent, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { codeblockService } from 'services/codeblock.service'
import styled from 'styled-components'
import { previewItem } from 'styles/setup/mixins'
import { FlexColumn, FlexRow, Heading1 } from '../components/Generics'
import { User } from '../models/user.interface'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { sessionService } from 'services/session.service'
import { utilService } from 'services/util.service'

interface Props {
    loggedinUser: User | undefined
}

export const Lobby: FunctionComponent<Props> = ({ loggedinUser }) => {
    const navigate = useNavigate()
    const [codeblock, setCodeblocks] = useState<Codeblock[]>()
    const [selectedCodeblockId, setSelectedCodeblockId] = useState<null | string>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (!loggedinUser || !loggedinUser.isMentor) navigate('/')
    }, [loggedinUser, navigate])

    useEffect(() => {
        (async () => {
            try {
                const codeblocksDB = await codeblockService.query()
                setCodeblocks(codeblocksDB)
            } catch (err) {
                console.log('Cannot get code blocks', err)
            }
        })()
    }, [setCodeblocks])

    const onSelectCodeblock = (codeblockId: string) => {
        setSelectedCodeblockId(codeblockId)
        setIsModalOpen(true)
    }

    const onCloseModal = () => {
        setSelectedCodeblockId(null)
        setIsModalOpen(false)
    }

    const onSelectStudent = (student: User) => {
        if (!selectedCodeblockId) return
        const uuid = uuidv4();
        (async () => {
            try {
                await sessionService.add({
                    uuid,
                    user: student,
                    codeBlock_id: selectedCodeblockId
                })
                const baseUrl = utilService.getBaseUrl()
                const relativeUrl = '/codeblock/' + selectedCodeblockId + '/' + uuid
                navigator.clipboard.writeText(baseUrl + relativeUrl + '?student_login=' + student.username)
                toast.success('A link to the session has been copied to your clipboard.', {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                })
                navigate(relativeUrl)

            } catch (err) {
                console.log('Cannot add session', err)
                toast.error('Oops! something went wrong.', {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                })
            }
        })()
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
                        <CodeblockPreview key={codeblock._id} onClick={() => { onSelectCodeblock(codeblock._id) }} align='center'>
                            {idx + 1 + '. ' + codeblock.title}
                        </CodeblockPreview>
                    ))}
                </CodeblockList>}
                {<StudentsModal
                    onCloseModal={onCloseModal}
                    isModalOpen={isModalOpen}
                    onSelectStudent={onSelectStudent}
                />}
            </LobbyContainer>
        </Fragment>
    )
}

const LobbyContainer = styled(FlexColumn)`
    padding-top: 50px;
`

const CodeblockList = styled(FlexColumn)`
    div:nth-child(even) {
        background-color: ${({ theme: { blackLight } }) => blackLight};
    }
`

const CodeblockPreview = styled(FlexRow)`
    ${previewItem}
`